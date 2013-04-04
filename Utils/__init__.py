from Models.User import User
from google.appengine.ext.webapp import template
import datetime
import os


def template2handler(handler,template_name,template_value):
    handler.response.headers['Content-Type'] = 'text/html'
    handler.response.out.write(template2string(template_name, template_value))
    
def template2string(template_name,template_value):
    path = os.path.join(os.path.dirname(__file__), '..', 'template', template_name)
    return template.render(path, template_value)

def serialize(p):
    if isinstance(p, datetime.date):
        return p.isoformat()
    else:
        if isinstance(p, User):
            return p.name
        else:
            return p 