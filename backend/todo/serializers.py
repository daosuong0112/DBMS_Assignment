from rest_framework import serializers
from .models import Category, Foods, Table, Staff, Reservation, Order, Food_Order

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class FoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = ('id', 'name', 'info', 'qty_day', 'image', 'category_id', 'price', 'cost')

    def update(self, instance, validated_data): 
        instance.id = validated_data.get('id', instance.id)
        instance.name = validated_data.get('name', instance.name)
        instance.info = validated_data.get('info', instance.info)
        instance.qty_day = validated_data.get('qty_day', instance.qty_day)
        instance.image = validated_data.get('image', instance.image)
        instance.category_id = Category(validated_data.get('category_id', instance.category_id))
        instance.price = validated_data.get('price', instance.price)
        instance.cost = validated_data.get('cost', instance.cost)
        instance.save()
        return instance

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id', 'status')

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ('id', 'name', 'email', 'password', 'avatar', 'staff_type')

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('id','table_id', 'rtime', 'no_customer', 'interval', 'staff_name','name')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'c_name', 'c_tele', 'c_email', 'formality', 'c_address', 'total', 'time', 'status')

class Food_OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food_Order
        fields = ('order_id', 'food_id', 'quantity')