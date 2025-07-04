from rest_framework.views import APIView
from .models import Wishlist
from .serializers import WishlistSerializer
from rest_framework.response import Response
from rest_framework import status


class WishlistView(APIView):
  def get(self, request):
    wishlist_items = Wishlist.objects.filter(user=request.user).select_related('product_item')
    serializer = WishlistSerializer(wishlist_items, many=True, context={'request':request})
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  # def post(self, request):




