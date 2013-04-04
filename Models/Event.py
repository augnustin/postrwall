from User import User
from datetime import date
from google.appengine.ext import db
import Utils
import json
import logging


class Event(db.Model):
    
    name = db.StringProperty(indexed=True)
    date = db.DateProperty(indexed=True)
    description = db.StringProperty(indexed=False)
    posterUrl = db.StringProperty(indexed=False)
    webpage = db.StringProperty(indexed=False)
    address = db.PostalAddressProperty(indexed=False)
    price = db.FloatProperty(indexed=False)
    artists = db.StringListProperty()
    genres = db.StringListProperty()
    creator = db.ReferenceProperty(User)
    created = db.DateTimeProperty(auto_now_add = True)
    modified = db.DateTimeProperty(auto_now = True)
    playlist = db.StringListProperty()
    
    def toDict(self):
        return {
                'event':dict([(p, Utils.serialize(getattr(self, p))) for p in self.properties()])
                }
    
    def toHTML(self):
        return Utils.template2string('event.html', {
                                                    'event': self,
                                                    'mini':True
                                                    })
    
    def getDate(self):
        return date.strftime(self.date,'%d/%m/%Y')
    
    @classmethod
    def by_id(cls, eid):
        return Event.get_by_id(eid)

    @classmethod
    def by_name(cls, name):
        event = Event.all().filter('name =', name).get()
        return event
    
    @classmethod
    def by_user(cls, user, order='name'):
        events = Event.all().filter('creator =', user).order(order)
        return events

    @classmethod
    def EventsToJSON(cls):
        events = []
        event_query = cls.all().fetch(500)
        for event in event_query:
            events.append(event.toDict())
        
        events_dict = {
                      'events':events
                      }
        return json.dumps(events_dict)    
    

