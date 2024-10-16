from django.db import models


class CustomCharfield():
    def __new__(cls, *args, **kwargs):
        return models.CharField(max_length=100)
