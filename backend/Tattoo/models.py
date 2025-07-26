from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import time
import bcrypt


db = SQLAlchemy()

class Artist(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150),unique=True,nullable=False)
    name = db.Column(db.String(20),nullable=False)
    password = db.Column(db.String(255),nullable=False)
    isOwner = db.Column(db.Boolean,nullable=False)

    def set_password(self,password):
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    def check_password(self,password):
        return bcrypt.checkpw(password.encode('utf-8'),self.password.encode('utf-8'))
    def __repr__(self):
        return f'<Artist {self.name} {self.email}> '
    def to_dict(self):
        return {"id":self.id,"email":self.email,"name":self.name,"isOwner":self.isOwner}


class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    beginning_of_week = db.Column(db.Date, nullable=False)
    monday = db.Column(db.String(1), nullable=True)
    tuesday = db.Column(db.String(1), nullable=True)
    wednesday = db.Column(db.String(1), nullable=True)
    thursday = db.Column(db.String(1), nullable=True)
    friday = db.Column(db.String(1), nullable=True)
    saturday = db.Column(db.String(1), nullable=True)
    sunday = db.Column(db.String(1), nullable=True)
    mondayPM = db.Column(db.String(1), nullable=True)
    tuesdayPM = db.Column(db.String(1), nullable=True)
    wednesdayPM = db.Column(db.String(1), nullable=True)
    thursdayPM = db.Column(db.String(1), nullable=True)
    fridayPM = db.Column(db.String(1), nullable=True)
    saturdayPM = db.Column(db.String(1), nullable=True)
    sundayPM = db.Column(db.String(1), nullable=True)

    __table_args__ = (
        db.UniqueConstraint('artist_id', 'beginning_of_week', name='unique_artist_week'),
    )

    def getBeginDateAsInt(self):
        return self.beginning_of_week

    def __repr__(self):
        return f'<Availability for Artist {self.artist_id}>'

    def to_dict(self):
        return {'id':self.id,
                'artist_id':self.artist_id,
                'beginning_of_week':self.beginning_of_week,
                'sunday':self.sunday,
                'monday': self.monday,
                'tuesday': self.tuesday,
                'wednesday': self.wednesday,
                'thursday': self.thursday,
                'friday': self.friday,
                'saturday': self.saturday,
                'sundayPM': self.sundayPM,
                'mondayPM': self.mondayPM,
                'tuesdayPM': self.tuesdayPM,
                'wednesdayPM': self.wednesdayPM,
                'thursdayPM': self.thursdayPM,
                'fridayPM': self.fridayPM,
                'saturdayPM': self.saturdayPM
                }

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(20), nullable=False)  # e.g., "10:00 AM"
    description = db.Column(db.Text, nullable=True)  # Tattoo details

    def __repr__(self):
        return f'<Booking {self.name} - {self.date}>'
    def to_dict(self):
        return {'id':self.id,
                'name':self.name,
                'email':self.email,
                'artist':self.artist_id,
                'date':self.date,
                'time':self.time,
                'description':self.description}


class BookingRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(20), nullable=False)  # e.g., "10:00 AM"
    description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<Booking {self.name} - {self.date}>'
    def to_dict(self):
        return {'id':self.id,
                'name':self.name,
                'email':self.email,
                'artist':self.artist_id,
                'date':self.date,
                'time':self.time,
                'description':self.description}