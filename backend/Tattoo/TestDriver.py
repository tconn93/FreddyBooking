from models import db, Artist, Availability, Booking


db.create_all()

artist = Artist(email='T@GMAIL.com',name='Tyler')
artist.set_password('Bandit')

db.session.add(artist)
db.session.commit()

