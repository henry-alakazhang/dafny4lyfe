from datetime import datetime
from django import template

register = template.Library()

@register.simple_tag
def get_current_time(format_string):
   return datetime.datetime.now().strftime(format_string)

@register.simple_tag
def time_from_start():
   return (datetime.today() - datetime(1850,1,1)).days