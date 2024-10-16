from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name="products"),
    path('products/<str:pk>/', ProductDetailView.as_view(), name="product-detail"),
    path('users/login/', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('users/profile/<int:pk>', UserDetailView.as_view(), name="user-profile"),
    path('users/', UserListCreateView.as_view(), name="users"),
    path('users/activate/<uid64>/<token>/', ActivateAccountView.as_view(), name="activate"),
    path('waiting/', waiting, name="waiting"),
    path('placeorder/', place_order, name="placeorder"),
]


