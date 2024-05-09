from django.contrib import admin
from .models import Token, ExtendedUser

# Register your models here.
admin.site.register(Token)
admin.site.register(ExtendedUser)
