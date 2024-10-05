from django.shortcuts import render
from .serializer import  BookSerializer
from .models import Book
from rest_framework import status 
from rest_framework.response import Response
from rest_framework.decorators import api_view



# Create your views here.
@api_view(['GET'])
def get_books(request):
   data = Book.objects.all()
   serializer = BookSerializer(data,many=True)

   return Response(serializer.data)


@api_view(['POST'])
def create_books(request):
    data = request.data 
    serializer = BookSerializer(data= data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE'])
def books_details(request,pk):
   
    try:
      book = Book.objects.get(id = pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'},status=status.HTTP_404_NOT_FOUND)
   
    if request.method  == "DELETE":
       book.delete()

       return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == "PUT":
       
        data = request.data

        serializer = BookSerializer(book,data=data)
        if serializer.is_valid():
          serializer.save()

          return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
    


    



