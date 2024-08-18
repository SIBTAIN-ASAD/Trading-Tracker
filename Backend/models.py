from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# from cloudinary.models import CloudinaryField

# import CLoudinary

#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
# BY SAM
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------


# User Model
class User(AbstractUser):
    # `username` and `email` fields are already part of AbstractUser
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    profile_picture = models.CharField(max_length=500, blank=True, null=True)


# Asset Model
class Asset(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    change = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    volume = models.CharField(max_length=50, blank=True, null=True)
    asset_type = models.CharField(max_length=20, blank=True, null=True)
    
class UserAsset(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    quantity = models.IntegerField(blank=True, null=True)
    total_value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)


class UserFunds(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    asset_name = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    transaction_type = models.CharField(max_length=10, choices=[('buy', 'Buy'), ('sell', 'Sell')], default='buy')
    timestamp = models.DateTimeField(auto_now_add=True)




#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------



class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True, null=True)
   # profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    
# Investment Portfolio Model
class Portfolio(models.Model):
    """
    Represents an investment portfolio associated with a user.
    """
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


# Investment Model
class Investment(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    portfolio = models.ForeignKey(Portfolio, related_name='investments', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    initial_purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)  # Real-time updated
    purchase_date = models.DateTimeField()

    @property
    def current_value(self):
        return self.quantity * self.current_price

    def __str__(self):
        return f"Investment in {self.asset.name} by {self.user.username}"

# Virtual Trade Model
class VirtualTrade(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    investment = models.ForeignKey(Investment, on_delete=models.CASCADE)
    trade_type = models.CharField(max_length=4, choices=[('BUY', 'Buy'), ('SELL', 'Sell')])
    trade_quantity = models.PositiveIntegerField()
    trade_price = models.DecimalField(max_digits=10, decimal_places=2)
    trade_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.trade_type} - {self.investment}"

    class Meta:
        ordering = ['-trade_date']

# Blog Post Model
class BlogPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.author.username}"

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Blog Posts"

# FAQ Model
class FAQ(models.Model):
    question = models.CharField(max_length=500)
    answer = models.TextField()

    def __str__(self):
        return self.question

    class Meta:
        verbose_name_plural = "FAQs"
