from django.core.files.storage import default_storage
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from datetime import datetime, timedelta
from django.db.models import Count, Sum
from django.http import HttpRequest
import json

from .models import Category, Foods, Table, Staff, Reservation, Order, Food_Order
from .serializers import CategorySerializer, FoodsSerializer, TableSerializer, StaffSerializer, ReservationSerializer, OrderSerializer, Food_OrderSerializer

# Create your views here.

@csrf_exempt
def CategoryApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            categories = Category.objects.all()
            categories_serializers = CategorySerializer(categories, many=True)
            return JsonResponse(categories_serializers.data, safe=False)
        else:
            category = Category.objects.get(id=id)
            category_serializer = CategorySerializer(category, many=False)
            return JsonResponse(category_serializer.data, safe=False)
    elif request.method == 'POST':
        category_data = JSONParser().parse(request)
        categories_serializers = CategorySerializer(data=category_data)
        if categories_serializers.is_valid():
            categories_serializers.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        category_data = JSONParser().parse(request)
        category = Category.objects.get(id = category_data['id'])
        categories_serializers = CategorySerializer(category, data=category_data)
        if categories_serializers.is_valid():
            categories_serializers.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        category = Category.objects.get(id = id)
        category.delete()
        return JsonResponse("Delete Successfully", safe=False)

@csrf_exempt
def FoodApi(request:HttpRequest, id=0):
    if request.method == 'GET':
        if id == 0:
            query="select * from todo_foods where 0=1"
            typeArr=request.GET.getlist("type")
            for i in range(len(typeArr)):
                query+=f" or category_id_id={typeArr[i]}"
            foods=Foods.objects.raw(query)
            foods_serializers = FoodsSerializer(foods, many=True)
            return JsonResponse(foods_serializers.data, safe=False)
        else:
            food = Foods.objects.get(id=id)
            food_serializer = FoodsSerializer(food, many=False)
            return JsonResponse(food_serializer.data, safe=False)
    elif request.method == 'POST':
        im = request.FILES['image']
        img = default_storage.save(im.name, im)
        Foods(
            name = request.POST['name'],
            info = request.POST['info'],
            qty_day = request.POST['qty_day'],
            image = str(img),
            category_id = Category(request.POST['category_id']),
            price = request.POST['price'],
            cost = request.POST['cost']
        ).save()
        # foods_serializers = FoodsSerializer(data=food_data)
        # if foods_serializers.is_valid():
        #     foods_serializers.save()
        return JsonResponse("Added Successfully", safe=False)
        # return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        food_data = JSONParser().parse(request)
        food = Foods.objects.get(id = int(food_data['id']))
        foods_serializers = FoodsSerializer(food, data=food_data).update(food, food_data)
        if foods_serializers:
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        food = Foods.objects.get(id = id)
        food.delete()
        return JsonResponse("Delete Successfully", safe=False)

@csrf_exempt
def TableApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            tables = Table.objects.all()
            tables_serializers = TableSerializer(tables, many=True)
            return JsonResponse(tables_serializers.data, safe=False)
        else:
            table = Table.objects.get(id=id)
            table_serializer = TableSerializer(table, many=False)
            return JsonResponse(table_serializer.data, safe=False)
    elif request.method == 'POST':
        table_data = JSONParser().parse(request)
        tables_serializers = TableSerializer(data=table_data)
        if tables_serializers.is_valid():
            tables_serializers.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        table_data = JSONParser().parse(request)
        table = Table.objects.get(id = table_data['id'])
        tables_serializers = TableSerializer(table, data=table_data)
        if tables_serializers.is_valid():
            tables_serializers.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        table = Table.objects.get(id = id)
        table.delete()
        return JsonResponse("Delete Successfully", safe=False)

@csrf_exempt
def StaffApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            staff_arr = request.GET['type']
            staff_arr = str(staff_arr).split(',')
            if staff_arr == ['']:
                staffs = Staff.objects.all()
            else:
                query = "SELECT * FROM `todo_staff` WHERE false"
                for i in range(len(staff_arr)):
                    query = query + " OR staff_type=" + str(staff_arr[i])
                staffs = Staff.objects.raw(query)
            staffs_serializers = StaffSerializer(staffs, many=True)
            return JsonResponse(staffs_serializers.data, safe=False)
        else:
            staff = Staff.objects.get(id=id)
            staff_serializer = StaffSerializer(staff, many=False)
            return JsonResponse(staff_serializer.data, safe=False)
    elif request.method == 'POST':
        staff_data = JSONParser().parse(request)
        staffs_serializers = StaffSerializer(data=staff_data)
        if staffs_serializers.is_valid():
            staffs_serializers.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        staff_data = JSONParser().parse(request)
        staff = Staff.objects.get(id = staff_data['id'])
        staffs_serializers = StaffSerializer(staff, data=staff_data)
        if staffs_serializers.is_valid():
            staffs_serializers.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        staff = Staff.objects.get(id = id)
        staff.delete()
        return JsonResponse("Delete Successfully", safe=False)

@csrf_exempt
def ReservationApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            reservations = Reservation.objects.all()
            reservations_serializers = ReservationSerializer(reservations, many=True)
            return JsonResponse(reservations_serializers.data, safe=False)
        else:
            reservation = Reservation.objects.get(id=id)
            reservation_serializer = ReservationSerializer(reservation, many=False)
            return JsonResponse(reservation_serializer.data, safe=False)
    elif request.method == 'POST':
        reservation_data = JSONParser().parse(request)
        reservations_serializers = ReservationSerializer(data=reservation_data)
        if reservations_serializers.is_valid():
            reservations_serializers.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        reservation_data = JSONParser().parse(request)
        reservation = Reservation.objects.get(id = reservation_data['id'])
        reservations_serializers = ReservationSerializer(reservation, data=reservation_data)
        if reservations_serializers.is_valid():
            reservations_serializers.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        reservation = Reservation.objects.get(id = id)
        reservation.delete()
        return JsonResponse("Delete Successfully", safe=False)

@csrf_exempt
def OrderApi(request, id=0):
    if request.method=='GET':
        if id == 0:
            begin = datetime.strptime(request.GET['begin'], "%Y-%m-%d").date()
            end = datetime.strptime(request.GET['end'], "%Y-%m-%d").date()
            order = Order.objects.filter(time__date__range=(begin, end)).order_by('-id')
            order_serializer = OrderSerializer(order, many=True)
            return JsonResponse(order_serializer.data, safe=False)
        else:
            order = Order.objects.get(id=id)
            order_serializer = OrderSerializer(order, many=False)
            return JsonResponse(order_serializer.data, safe=False)
    elif request.method == 'POST':
        order_data = JSONParser().parse(request)
        orders_serializers = OrderSerializer(data=order_data)
        if orders_serializers.is_valid():
            orders_serializers.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        order_data = JSONParser().parse(request)
        order = Order.objects.get(id = order_data['id'])
        orders_serializers = OrderSerializer(order, data=order_data)
        if orders_serializers.is_valid():
            orders_serializers.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        order = Order.objects.get(id = id)
        order.delete()
        return JsonResponse("Delete Successfully", safe=False)

@csrf_exempt
def Food_OrderApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            fos = Food_Order.objects.all()
            fos_serializers = Food_OrderSerializer(fos, many=True)
            return JsonResponse(fos_serializers.data, safe=False)
        else:
            fo = Food_Order.objects.filter(order_id=id)
            fo_serializer = Food_OrderSerializer(fo, many=True)
            return JsonResponse(fo_serializer.data, safe=False)
    elif request.method == 'POST':
        fo_data = JSONParser().parse(request)
        fos_serializers = Food_OrderSerializer(data=fo_data)
        if fos_serializers.is_valid():
            fos_serializers.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        fo_data = JSONParser().parse(request)
        fo = Food_Order.objects.get(id = fo_data['id'])
        fos_serializers = Food_OrderSerializer(fo, data=fo_data)
        if fos_serializers.is_valid():
            fos_serializers.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        fo = Food_Order.objects.get(id = id)
        fo.delete()
        return JsonResponse("Delete Successfully", safe=False)

def summaryApi(request):
    if request.method == 'GET':
        sm = Order.objects.aggregate(sum_total=Sum('total'), num_order=Count('id'))
        return JsonResponse(sm, safe=False)

def graphApi(request):
    if request.method == 'GET':
        if 'year' not in request.GET:
            rq = Order.objects.filter(time__date__range=(datetime.today().date()-timedelta(7), datetime.today().date())).values('time__date').order_by('time__date').annotate(count=Count('id'))
            return JsonResponse(list(rq), safe=False)
        elif 'month' not in request.GET:
            rq = Order.objects.filter(time__year=request.GET['year']).values('time__month').order_by('time__month').annotate(count=Count('id'), sum=Sum('total'))
            return JsonResponse(list(rq), safe=False)
        else:
            rq = Order.objects.filter(time__year=request.GET['year'], time__month=request.GET['month']).values('time__date').order_by('time__date').annotate(count=Count('id'), sum=Sum('total'))
            return JsonResponse(list(rq), safe=False)
            
@csrf_exempt
def OrderApi2(request, id=0):
    if request.method=='GET':
        if id == 0:
            order = Order.objects.order_by('-id')[:1]
            order_serializer = OrderSerializer(order, many=True)
            return JsonResponse(order_serializer.data, safe=False)

@csrf_exempt      
def CheckAuth(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        if data['username'] == 'admin' and data['password'] == '123456':
            return JsonResponse("Success", safe=False)
        else: 
            return JsonResponse("Failed", safe=False)