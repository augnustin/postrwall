from Models.Event import Event
import Utils
import webapp2



class MainRouter(webapp2.RequestHandler):
    def get(self):
        Utils.template2handler(self,'index.html',{
                                           'title': 'Welcome to PostrWall',
                                           'wall': True 
                                           })

class ChannelRouter(webapp2.RequestHandler):
    def get(self): 
        self.response.headers['Content-Type'] = 'text/html'
        self.response.out.write('<script src="http://cdn-files.deezer.com/js/min/dz.js"></script>')
        
   
class ReadEvents(webapp2.RequestHandler):
    def get(self):
            self.response.headers["Content-Type"] = "application/json"
            self.response.out.write(Event.EventsToJSON())
