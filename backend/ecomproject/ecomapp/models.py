from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False, default=0)
    stockcount = models.IntegerField(null=False, blank=False, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    stars = models.IntegerField(null=False, blank=False, default=0)
    numReviews = models.IntegerField(null=False, blank=False, default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.stockcount<0:
            raise ValueError("Stock count cannot be negative")
        super(Product, self).save(*args, **kwargs)
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=100)
    totalPrice = models.DecimalField(max_digits=8, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)+" for "+str(self.user.username)
    


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.CharField(max_length=100)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
