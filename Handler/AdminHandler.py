from Models.Event import Event
from Models.User import User
from Utils import Security
import Utils
import datetime
import logging
import webapp2



class AdminHandler(webapp2.RequestHandler):

    def read_secure_cookie(self, name):
        cookie_val = self.request.cookies.get(name)
        return cookie_val and Utils.Security.check_secure_val(cookie_val)

    def logout(self):
        self.response.headers.add_header('Set-Cookie', 'user_id=; Path=/')

    def initialize(self, *a, **kw):
        webapp2.RequestHandler.initialize(self, *a, **kw)
        uid = self.read_secure_cookie('user_id')
        self.user = uid and User.by_id(int(uid))
        if not self.user:
            self.redirect('/Admin/Login')
            
class Login(webapp2.RequestHandler):

    def set_secure_cookie(self, name, val):
        cookie_val = Utils.Security.make_secure_val(val)
        self.response.headers.add_header(
            'Set-Cookie',
            '%s=%s; Path=/' % (name, cookie_val))
        
    def login(self, user):
        self.set_secure_cookie('user_id', str(user.key().id()))

    def get(self):
            Utils.template2handler(self, 'admin-login.html', {
                               'title': 'Please Login',
                               'admin': True
            })
    
    def post(self):        
        
        if not User.by_name('postrwall'):
            u_test = User.register('postrwall', 'postrwall')
            u_test.put()
        
        username = self.request.get('username')
        password = self.request.get('password')

        u = User.login(username, password)
        if u:
            self.login(u)
            self.redirect('/Admin/')
        else:
            Utils.template2handler(self, 'admin-login.html', {
                               'title': 'Please Login',
                               'admin':True,
                               'error':'Incorrect Login/Password, please try again.',
                               'username':username
            })
            
class MyEvents(AdminHandler):
    def get(self):

        Utils.template2handler(self, 'admin-my-events.html', {
                               'title': 'My Events',
                               'admin': True,
                               'msg': self.request.get('msg'),
                               'conf': self.request.get('conf'),
                               'err': self.request.get('err'),
                               'events': Event.by_user(self.user, self.request.get('order')) if self.request.get('order') else Event.by_user(self.user)
            })

class ManageEvent(AdminHandler):
    def get(self):
        
        if(self.request.get('event')):
            event = Event.get(self.request.get('event'))
            title = "Update " + event.name
        else:
            event = None
            title = "Create Event"
        
        Utils.template2handler(self, 'admin-input.html', {
                                                   'title': title,
                                                   'admin':True,
                                                   'event':event
                                                   })        
    
    def post(self):
        i = 1
        artists = []
        while self.request.get('artist-' + str(i)) and i < 100:
            artists.append(self.request.get('artist-' + str(i)))
            i += 1
            
        logging.info(len(artists))
        logging.info(str(artists))
                
        date_array = self.request.get('date').split('/')
        date = datetime.date(int(date_array[2]), int(date_array[1]), int(date_array[0]))
        
        if(self.request.get('event')):
            event = Event.get(self.request.get('event'))
            
            event.posterUrl = self.request.get('posterUrl')
            event.name = self.request.get('name')
            event.date = date
            event.description = self.request.get('description')
            event.webpage = self.request.get('webpage')
            event.address = self.request.get('address')
            event.price = float(self.request.get('price'))
            event.artists = artists
            
            event.put()
            
            self.redirect('/Admin/?conf=Event%20' + self.request.get('name') + '%20modified%20successfully')

        else:            
            Event(posterUrl=self.request.get('posterUrl'), name=self.request.get('name'), date=date, description=self.request.get('description'), webpage=self.request.get('webpage'), address=self.request.get('address'), price=float(self.request.get('price')), artists=artists, genres=[], creator=self.user).put()
            self.redirect('/Admin/?conf=Event%20' + self.request.get('name') + '%20created%20successfully')
                
class DeleteEvent(AdminHandler):
    def get(self):
        if(self.request.get('event')):
            event = Event.get(self.request.get('event'))
            name = event.name
            event.delete()
            self.redirect('/Admin/?conf=Event%20' + name + '%20deleted%20successfully')
        else:
            self.redirect('/Admin/?err=An%20error%20occurred.%20Please%20try%20again%20...')
            
class Logout(AdminHandler):
    def get(self):
        self.logout()
        self.redirect('/Admin/Login')
        
class InitializeDatabase(AdminHandler):
    def get(self): 

        self.response.headers['Content-Type'] = 'text/html'
        self.response.out.write('Database Initialisation ... <br />')
        Event(name="Reggae Sun Ska", date=datetime.date(2012, 8, 3), description="Awesome Reggae Festival in Bordeaux", posterUrl="http://p.gap.free.fr/web/images_agenda/2979_1_img.jpg", webpage="http://www.reggaesunska.com/2012/", address="Bordeaux, France", price=float(50), artists=['Jimmy Cliff', 'Ayo', 'Damian Marley', 'Groundation' ], genres=['Reggae', 'Dub'], creator=User.by_name('postrwall')).put()
        Event(name="Szigets 2012", date=datetime.date(2012, 8, 6), description="Biggest Europeean Festival", posterUrl="http://www.spectacles.carrefour.fr/image_actualites//sziget-2012-officielle.jpg", webpage="http://www.reggaesunska.com/2012/", address="Budapest, Hungary", price=float(50), artists=['Placebo', 'The Stone Roses', 'The Ting Tings', 'Axwell', 'Korn', 'The XX'], genres=['Rock', 'Indie', 'Electro', 'Folk'], creator=User.by_name('postrwall')).put()
        Event(name="Bpitch Control", date=datetime.date(2012, 7, 21), description="Another party in the Berghain", posterUrl="http://www.residentadvisor.net/images/events/flyer/2012/7/de-0721-354493-19974-front.jpg", webpage="http://www.reggaesunska.com/2012/", address="Berghain, Am Wriezener Bahnhof, 10243 Berlin", price=float(10), artists=['Kiki', 'DJ Red', 'Shinedoe', 'Marcel Fengler', 'Thomas Muller'], genres=['Electro', 'Minimal'], creator=User.by_name('postrwall')).put()
        Event(name="Berlin Festival", date=datetime.date(2012, 9, 7), description="Yearly festival in Tempelhof", posterUrl="http://www.indiemeute.de/wp-content/uploads/2012/05/Berlin-Festival-20121.jpg", webpage="http://www.reggaesunska.com/2012/", address="Tempelhof Airport", price=float(50), artists=['The Killers', 'Paul Kalkbrenner', 'Sigur Ros', 'Franz Ferdinand', 'Kraftklub'], genres=['Electro', 'Minimal', 'Rock', 'Indie'], creator=User.by_name('postrwall')).put()
        Event(name="Les vieilles Charrues", date=datetime.date(2012, 7, 19), description="French festival in Britany", posterUrl="http://burnmebaby.fr/wp-content/uploads/2012/07/Vieilles-Charrues-Affiche.jpg", webpage="http://www.reggaesunska.com/2012/", address="Le Mans, France", price=float(30), artists=['Bob Dylan', 'Sting', 'Portishead', 'The Cure', 'LMFAO'], genres=['Electro', 'Minimal', 'Rock', 'Indie'], creator=User.by_name('postrwall')).put()
        Event(name="Open Air Berlin at Rummelsburger Bucht", date=datetime.date(2012, 8, 05), description="Awesome Open Air with Extrawelt", posterUrl="../images/de-0805-348219-47340-front.jpg", webpage="http://www.reggaesunska.com/2012/", address="Rummelsburger Bucht, Berlin, Germany", price=float(15), artists=['Extrawelt', 'Monika Kruse', 'Ruede Hagelstein', 'Sis'], genres=['Electro', 'Minimal'], creator=User.by_name('postrwall')).put()
        self.response.out.write('Database Initialised') 
