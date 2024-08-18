'''
The views.py file contains the view logic that controls the request and response flow for the web application. 
It acts as the bridge between the models and the serializers to the frontend.
'''

from datetime import datetime
from rest_framework import viewsets, permissions, pagination
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse
from django.contrib.auth import authenticate
import cloudinary.uploader as cu
import cloudinary

from .financial_data_fetcher import fetch_stock_data, store_stock_data
from .models import User, UserProfile, Portfolio, Asset, Investment, VirtualTrade, BlogPost, FAQ, UserFunds, UserAsset, Transaction

from .serializers import (UserSerializer, UserProfileSerializer, InvestmentSerializer,
                          PortfolioSerializer, VirtualTradeSerializer,
                          BlogPostSerializer, FAQSerializer, AssetSerializer, UserAssetSerializer,
                            TransactionSerializer
                          )



def index(request):
    current_time = datetime.now().strftime("%-I:%S %p")
    current_date = datetime.now().strftime("%A %m %-Y")

    data = {
        'time': current_time,
        'date': current_date,
    }

    return JsonResponse(data)

class StandardPagination(pagination.PageNumberPagination):
    '''
    Configure custom pagination classes to paginate response data.
    - StandardPagination is good for most endpoints.
    - LargeResultsSetPagination can be used for endpoints expecting large datasets.
    '''
    page_size = 100
    page_query_param = 'page_size'
    max_page_size = 1000

class LargeResultsSetPagination(pagination.PageNumberPagination):
    page_size = 1000
    page_query_param = 'page_size'
    max_page_size = 10000
    
'''
VIEWSETS
- Viewsets provide the standard CRUD operations for models.
'''

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    # Queryset filters and orders Users 
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Override default viewset methods for custom logic
    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        # Paginate list view
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = self.get_object() 
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

    # Customizing the create behavior
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data) 
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        serializer.save()

    # Customizing the update behavior
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()
        
class UserProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows UserProfiles to be viewed or edited.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardPagination

class PortfolioViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Portfolios to be viewed or edited.
    """
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

class AssetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Assets to be viewed or edited.
    This includes Stocks, Cryptocurrencies, and ETFs as they are all types of Assets.
    """
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['asset_type', 'ticker_symbol']
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['name', 'price', 'asset_type']
    pagination_class = StandardPagination
    
class InvestmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Investments to be viewed or edited.
    """
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['asset', 'portfolio']
    pagination_class = StandardPagination
    
class BlogPostViewSet(viewsets.ModelViewSet):  
    """
    API endpoint that allows blog posts to be viewed or edited.
    """
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['title', 'content']

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows FAQs to be viewed.
    """
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [permissions.AllowAny]
    
class VirtualTradeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows virtual trades to be viewed or edited
    """
    queryset = VirtualTrade.objects.all()
    serializer_class = VirtualTradeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'investment']
    pagination_class = LargeResultsSetPagination
    
    
'''
Integrate Financial Data
'''
def refresh_stock_data(request, symbol):
    stock_data = fetch_stock_data(symbol) 
    store_stock_data(stock_data)
    return JsonResponse({"status": "success", "message": "Stock data refreshed."})


# Set Cloudinary configuration using environment variables
cloudinary.config(
    cloud_name="dnex1afx9",
    api_key="987413985424145",
    api_secret="rU0W8nW27d18G9iYh6j9fKAxF2I",
)



def upload_image(image_data):
    try:
        response = cu.upload(image_data)
        return response['url']
    except Exception as e:
        print(e, "Error uploading image")
        return None

    
    
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
# SAM Views
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------

class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            image = request.data.get('profile_picture')
            if image:
                image_url = upload_image(image)
                # create new response with image_url
                my_response = {}
                for key in request.data:
                    if key == 'profile_picture':
                        my_response['profile_picture'] = image_url
                    else:
                        my_response[key] = request.data[key]

            serializer = UserSerializer(data=my_response)
            if serializer.is_valid():
                user = serializer.save()
                if user:
                    user.save()
                    # When a new user is created, add its 50 funds to the UserFunds table
                    funds = UserFunds(user=user, amount=50)
                    funds.save()

                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



# Login View with JWT tokens
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate User
        user = authenticate(username=username, password=password)

        if user is not None:
            # Generate JWT tokens upon successful login
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# View to get user data
class UserDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        print(serializer.data)
        return Response(serializer.data)
    
# Update user data
    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AssetListView(generics.ListAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

class UserAssetListView(generics.ListAPIView):
    serializer_class = UserAssetSerializer
    
    def get_queryset(self):
        user = self.request.user
        return UserAsset.objects.filter(user=user)
    
# View for Funds add, retrieve and update
class UserFundsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        funds = UserFunds.objects.get(user=user)
        return Response({'amount': funds.amount})

    def post(self, request):
        user = request.user
        amount = request.data.get('amount')
        funds = UserFunds.objects.get(user=user)
        funds.amount += amount
        funds.save()
        return Response({'amount': funds.amount})

    def put(self, request):
        user = request.user
        amount = request.data.get('amount')
        funds = UserFunds.objects.get(user=user)
        funds.amount = amount
        funds.save()
        return Response({'amount': funds.amount})
    
    def delete(self, request):
        user = request.user
        funds = UserFunds.objects.get(user=user)
        funds.delete()
        return Response({'message': 'Funds deleted successfully.'})


class TransactionCreateAPIView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            asset_name = request.data.get('asset_name')
            quantity = request.data.get('quantity')
            amount = request.data.get('amount')
            transaction_type = request.data.get('transaction_type')
            user = request.user

            amount = int(amount)
            quantity = int(quantity)

            
            if transaction_type == 'sell':

                user_asset = UserAsset.objects.filter(user=user, asset__name=asset_name, quantity__gte=quantity)
                if not user_asset.exists():
                    return Response({'error': 'Not asset available'}, status=status.HTTP_400_BAD_REQUEST)
                user_asset = user_asset.first()
                user_asset.quantity -= quantity
                user_asset.save()
                funds = UserFunds.objects.get(user=user)
                print(funds.amount, amount)
                funds.amount += amount
                funds.save()

            else:
                
                funds = UserFunds.objects.get(user=user)
                print(funds.amount, amount)
                if funds.amount < (amount):
                    return Response({'error': 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)
                funds.amount -= int(amount)
                funds.save()
                user_asset = UserAsset.objects.filter(user=user, asset__name=asset_name)
                if user_asset.exists():
                    user_asset = user_asset.first()
                    user_asset.quantity += quantity
                    user_asset.save()
                else:
                    asset = Asset.objects.get(name=asset_name)
                    user_asset = UserAsset(user=user, asset=asset, quantity=quantity, total_value=amount)
                    user_asset.save()


            return super().create(request, *args, **kwargs)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)    


class TransactionListAPIView(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
