"""
Class : Routeur
This is the main routeur to distribute 
requests to the associated service
"""

########
# Libs #
########
import webapp2
from Handler import AdminHandler

# Apps modules.
                    
app2 = webapp2.WSGIApplication([
                               ('/Admin/', AdminHandler.MyEvents),
                               ('/Admin/Login', AdminHandler.Login),
                               ('/Admin/Logout', AdminHandler.Logout),
                               ('/Admin/NewEvent', AdminHandler.ManageEvent),
                               ('/Admin/EditEvent', AdminHandler.ManageEvent),
                               ('/Admin/DeleteEvent', AdminHandler.DeleteEvent),
                               ('/Admin/SubmitEvent', AdminHandler.ManageEvent),
                               ('/Admin/init', AdminHandler.InitializeDatabase), 
                               ], debug=True)