"""
Class : Routeur
This is the main routeur to distribute 
requests to the associated service
"""

########
# Libs #
########

import webapp2

from Handler import Handler

# Apps modules.
                    
app = webapp2.WSGIApplication([
                               ('/', Handler.MainRouter), 
                               ('/channel.html', Handler.ChannelRouter), 
                               ('/data', Handler.ReadEvents)
                               ], debug=True)



