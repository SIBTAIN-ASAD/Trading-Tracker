'''
Handle the Data Conversion, Validation and Objection Creation / Update
'''
from rest_framework import serializers
from .models import User, UserProfile, Portfolio, Asset, Investment, VirtualTrade, BlogPost, FAQ, Transaction
from .models import UserAsset

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for UserProfile model.
    """
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = UserProfile
        fields = ['user', 'bio'] #profile_picture


#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
# BY SAM
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model, 
    upload image on cloudinary, the image is stored in the cloudinary server and the url is stored in the database
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'country', 'phone_number', 'profile_picture', 'password', 'birth_date']

        username = serializers.CharField(max_length=150, required=True)
        email = serializers.EmailField(max_length=254, required=True)
        first_name = serializers.CharField(max_length=30, required=True)
        last_name = serializers.CharField(max_length=150, required=True)
        country = serializers.CharField(max_length=100, required=True)
        phone_number = serializers.CharField(max_length=30, required=True)
        password = serializers.CharField(max_length=128, required=True)
        birth_date = serializers.DateField(required=False)
        profile_picture = serializers.CharField(max_length=500, required=False)
        

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            country=validated_data['country'],
            phone_number=validated_data['phone_number'],
            profile_picture=validated_data['profile_picture'],
            password=validated_data['password'],
            birth_date=validated_data['birth_date']
        )
        return user
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.country = validated_data.get('country', instance.country)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()
        return instance
    


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ['id', 'name', 'price', 'change', 'volume', 'asset_type']

class UserAssetSerializer(serializers.ModelSerializer):
    asset = AssetSerializer()
    
    class Meta:
        model = UserAsset
        fields = ['id', 'asset', 'quantity', 'total_value']
 
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'asset_name', 'quantity', 'amount', 'timestamp', 'transaction_type']
        read_only_fields = ['id', 'user', 'timestamp']

#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------





    
class PortfolioSerializer(serializers.ModelSerializer):
    """
    Serializer for Portfolio model.
    """
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Portfolio
        fields = ['id', 'user', 'name', 'description', 'created_at']

        
class  InvestmentSerializer(serializers.ModelSerializer):
    """
    Serializer for Investments
    """
    asset = serializers.ReadOnlyField(source='asset.ticker_symbol')
    portfolio = serializers.ReadOnlyField(source='portfolio.id')
    
    class Meta:
        model = Investment
        fields = ['asset', 'portfolio', 'quantity', 'initial_purchase_price', 'current_price', 'purchase_date']


class VirtualTradeSerializer(serializers.ModelSerializer):
    """
    Serializer for VirtualTrade model.
    """
    user = serializers.ReadOnlyField(source='user.username')
    investment = serializers.ReadOnlyField(source='investment.asset.ticker_symbol')

    class Meta:
        model = VirtualTrade
        fields = ['user', 'investment', 'trade_type', 'trade_quantity', 'trade_price', 'trade_date']

class BlogPostSerializer(serializers.ModelSerializer):
    """
    Serializer for BlogPost model.
    """
    class Meta:
        model = BlogPost
        fields = ['author', 'title', 'content', 'created_at']

class FAQSerializer(serializers.ModelSerializer):
    """
    Serializer for FAQ model.
    """
    class Meta:
        model = FAQ
        fields = ['question', 'answer']
