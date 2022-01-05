from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.models import Plant, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer

from rest_framework import status
from datetime import datetime
from django.conf import settings

import stripe
stripe.api_key = str(settings.STRIPE_SECRET_KEY)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1 Create order
        order = Order.objects.create(
            userId=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )

        # 2 Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country']
        )

        # 3 Create order item and set to orderItem relationship
        for i in orderItems:
            plant = Plant.objects.get(id=i['plantId'])
            item = OrderItem.objects.create(
                plant=plant,
                order=order,
                name=plant.name,
                qty=i['qty'],
                price=i['price'],
                image=plant.image.url
            )
            # 4 Update stock
            plant.countInStock -= item.qty
            plant.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(id=pk)

        if user.is_staff or order.userId == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPayment(request, pk):
    try:
        data = request.data
        # stripe expects payment in cents so we multiply by 100
        amount = int(data['totalPrice'] * 100)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='eur',
            automatic_payment_methods={
                'enabled': True,
            },
            metadata={'orderId': pk}
        )
        return Response({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_403_FORBIDDEN)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(id=pk)

    if order.isPaid == False:
        paymentIntent = stripe.PaymentIntent.retrieve(
            request.data['paymentIntentId'],
        )
        if pk != paymentIntent['metadata']['orderId']:
            # need to verify that the order we are marking as paid matches the stripe paid order
            return Response({'detail': 'Incorrect order details to update'}, status=status.HTTP_400_BAD_REQUEST)
        if paymentIntent['status'] == 'succeeded':
            order.isPaid = True
            order.paidAt = datetime.now()
            order.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    return Response({'detail': 'Order is already paid'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
