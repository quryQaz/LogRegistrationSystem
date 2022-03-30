from django.db import models

class User(models.Model):
    name = models.CharField(max_length=15)
    group = models.CharField(max_length=30)
    team_name = models.CharField(max_length=300)

    def _str_(self):
        return self.name + ' ' + self.group
