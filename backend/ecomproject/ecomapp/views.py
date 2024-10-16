from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .products import products
from .serializers import ProductSerializer,UserDetailSerializer,MyTokenObtainPairSerializer, UserListSerializer
from rest_framework.viewsets import generics
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import View
from rest_framework import status

from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import generate_token, TokenGenerator
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.db import transaction



# Create your views here.

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):


        super().perform_update(serializer)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer

class ActivateAccountView(View):
    def get(self, request, uid64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uid64))
            user = User.objects.get(pk=uid)
        except Exception as e:
            user = None
        if user is not None and generate_token.check_token(user, token):
                user.is_active = True
                user.save()
                return render(request, 'ActivateSuccess.html')
        return render(request, 'ActivateFailed.html')
        # return Response({'email': 'Activation link is invalid'}, status=status.HTTP_400_BAD_REQUEST)
    
def waiting(request):
    return render(request, 'waiting.html')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user
    data = request.data
    orderItems = data['OrderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        with transaction.atomic():
        # Create Order
            order = Order.objects.create(
                user=user,
                paymentMethod=data['PaymentMethod'],
                totalPrice=data['Total']
            )
            # Create Order Items
            for i in orderItems:
                product = Product.objects.get(_id=i['product'])
                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    quantity=i['quantity'],
                    price=i['price'],
                    image=product.image.url
                )
                # Update Stock
                product.stockcount -= item.quantity
                product.save()
        return Response('Order was placed successfully', status=status.HTTP_201_CREATED)