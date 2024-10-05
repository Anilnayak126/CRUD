from django.db import models

# Create your models here.

class Book(models.Model):

    book_title = models.CharField(max_length=50)
    created_year = models.IntegerField()

    def __str__(self):
        return self.book_title


