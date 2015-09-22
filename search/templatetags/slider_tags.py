from datetime import datetime, timedelta
from django import template
import sys

register = template.Library()

@register.simple_tag
def time_from_start():
   return (datetime.today() - datetime(1850,1,1)).days
   