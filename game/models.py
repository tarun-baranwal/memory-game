from django.db import models
from django.contrib.auth.models import User

class Score(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    moves = models.IntegerField()
    time_taken = models.IntegerField()

    def __str__(self):
        return self.user.username
