from django.urls import path,include
from . import views

urlpatterns = [
    path('getbooks/',views.get_books),
    path('createbooks/',views.create_books,name='create_books'),
    path('books/<int:pk>/',views.books_details,name='bookdetails')
]