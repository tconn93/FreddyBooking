import json
from crypt import methods

from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_login import LoginManager,  login_user, login_required, logout_user, current_user
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import IntegrityError
from wtforms.validators import email

from models import db, Artist, Availability, Booking, BookingRequest

from datetime import datetime, timedelta, date

app = Flask(__name__)
app.config['SECRET_KEY'] = 'CyborgTattoo'  # Change this to a random string
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Bandit@192.168.0.131:5432/tattoodustin'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
CORS(app)
# CORS(app,resources={r"/*":{"origins":["http://localhost:3000"],
#                            "methods": ["GET", "POST", "PUT", "DELETE"],
#                            "allow_headers": ["Content-Type", "Authorization"],
#                            "supports_credentials": True
#                            }})

login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return Artist.query.get(int(user_id))

# Create tables and seed (run once)
with app.app_context():
    db.create_all()


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if request.is_json:
        data = request.json
        artist = Artist.query.filter_by(email=data['email'].upper()).first()
        if artist and artist.check_password(data['pword']):
            login_user(artist)
            result = {"message":"Success","artist":artist.to_dict(),"response": 200}
            return result, 200
    return {"message":"Failed","response":400} , 400

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))



@app.route('/artist',methods=["POST"])
def artist():
    data = request.get_json()
    if not data or 'email' not in data or 'pword' not in data or 'name' not in data or 'isOwner' not in data:
        return jsonify({'error':'Missing required fields'}),400
    new_artist = Artist( )
    new_artist.name = data['name']
    new_artist.email = data['email'].upper()
    new_artist.isOwner = data['isOwner']=='Y'
    new_artist.set_password(data['pword'])
    db.session.add(new_artist)
    db.session.commit()

    return jsonify(new_artist.to_dict()), 201


@app.route('/artist',methods=['GET'])
def getAllArtist():
    artists = Artist.query.all()
    x = []
    for art in artists:
        x.append(art.to_dict())
    return jsonify(x), 200


@app.route('/artist/<int:artist_id>')
def getArtist(artist_id):
    artist = Artist.query.get_or_404(artist_id).to_dict()
    return artist, 200


@app.route('/availability/<int:artist_id>')
def availability(artist_id):
    artist = Artist.query.get_or_404(artist_id)
    weeks = Availability.query.filter_by(artist_id=artist.id).order_by(Availability.beginning_of_week).all()
    x =[]
    for week in weeks:
        x.append(week.to_dict())

    return {'artist':artist.to_dict(),'avails':x}

@app.route('/availability/<int:artist_id>/edit',methods=["POST"])
def save_availability(artist_id):
    try:
        data = request.get_json()

        # Validate required fields (adjust based on your needs)
        if not data or 'beginOfWeek' not in data:
            return jsonify({'error': 'Missing required fields'}), 400

        # Parse beginning_of_week as a date
        try:
            beginning_of_week = datetime.strptime(data['beginOfWeek'], '%m/%d/%Y').date()
        except ValueError:
            print(data['beginOfWeek'])
            return jsonify({'error': 'Invalid date format for beginning_of_week, use YYYY-MM-DD'}), 400

        # Query for existing record
        availability = Availability.query.filter_by(
            artist_id=artist_id,
            beginning_of_week=beginning_of_week
        ).first()

        if availability:
            # Update existing record
            availability.monday = data.get('monday')
            availability.tuesday = data.get('tuesday')
            availability.wednesday = data.get('wednesday')
            availability.thursday = data.get('thursday')
            availability.friday = data.get('friday')
            availability.saturday = data.get('saturday')
            availability.sunday = data.get('sunday')
            availability.mondayPM = data.get('mondayPM')
            availability.tuesdayPM = data.get('tuesdayPM')
            availability.wednesdayPM = data.get('wednesdayPM')
            availability.thursdayPM = data.get('thursdayPM')
            availability.fridayPM = data.get('fridayPM')
            availability.saturdayPM = data.get('saturdayPM')
            availability.sundayPM = data.get('sundayPM')
        else:
            # Create new record
            availability = Availability(
                artist_id=artist_id,
                beginning_of_week=beginning_of_week,
                monday=data.get('monday'),
                tuesday=data.get('tuesday'),
                wednesday=data.get('wednesday'),
                thursday=data.get('thursday'),
                friday=data.get('friday'),
                saturday=data.get('saturday'),
                sunday=data.get('sunday'),
                mondayPM=data.get('mondayPM'),
                tuesdayPM=data.get('tuesdayPM'),
                wednesdayPM=data.get('wednesdayPM'),
                thursdayPM=data.get('thursdayPM'),
                fridayPM=data.get('fridayPM'),
                saturdayPM=data.get('saturdayPM'),
                sundayPM=data.get('sundayPM')
            )
            db.session.add(availability)

        # Commit changes
        db.session.commit()

        # Return the saved availability (add a to_dict method to your model if needed for serialization)
        return jsonify(availability.to_dict()), 200 if availability.id else 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Duplicate entry for artist and week'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update /book to use artist IDs

# @app.route('/')
# def home():
#     return render_template('index.html')

@app.route('/book', methods=['GET', 'POST'])
def book():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        artist = request.form['artist']
        date_str = request.form['date']
        time = request.form['time']
        description = request.form.get('description', '')

        try:
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            flash('Invalid date format.', 'error')
            return redirect(url_for('book'))

        # Check if slot is available (simple check: no duplicate booking for artist/date/time)
        existing = Booking.query.filter_by(artist=artist, date=date, time=time).first()
        if existing:
            flash('Slot already booked. Choose another.', 'error')
            return redirect(url_for('book'))

        new_booking = Booking(name=name, email=email, artist=artist, date=date, time=time, description=description)
        db.session.add(new_booking)
        db.session.commit()
        flash('Booking successful! We\'ll contact you soon.', 'success')
        return redirect(url_for('home'))

    artists = Artist.query.all()
    availability = Availability.query.order_by(Availability.beginning_of_week).all()
    print("artists' ids")
    for art in artists:
        print(art.id)
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return render_template('book.html', artists=artists, availability=availability,days=days)

@app.route('/bookingRequest',methods=['POST'])
def saveBookingRequest():
    data = request.get_json();
    bookingRequest = BookingRequest()
    bookingRequest.email = data['email']
    bookingRequest.date = datetime.strptime(data['date'], '%m/%d/%Y').date()
    bookingRequest.time = data['time']
    bookingRequest.artist_id = data['artistId']
    bookingRequest.name = data['name']
    bookingRequest.description = data['description']
    bookingRequest.phone = data['phone']
    db.session.add(bookingRequest)
    db.session.commit()
    return bookingRequest.to_dict() , 200 if bookingRequest.id else 201

@app.route('/bookingRequest/<int:artist_id>',methods=['GET'])
def getBookingRequest(artist_id):
    bookingRequests = BookingRequest.query.filter_by(artist_id=artist_id)
    x = []
    for book in bookingRequests:
        x.append(book.to_dict())
    return x, 200


@app.route('/delete_booking/<int:id>', methods=['POST'])
def delete_booking(id):
    booking = Booking.query.get_or_404(id)
    db.session.delete(booking)
    db.session.commit()
    flash('Booking deleted.', 'success')
    return redirect(url_for('admin'))


def generate_slots(avail_type):
    slots = []
    if avail_type == 'D':  # All day: 9 AM - 5 PM hourly
        start_hour = 9
        end_hour = 17
    elif avail_type == 'A':  # Morning: 9 AM - 12 PM
        start_hour = 9
        end_hour = 12
    elif avail_type == 'P':  # Evening: 1 PM - 5 PM
        start_hour = 13
        end_hour = 17
    else:  # 'B' Busy
        return []

    for hour in range(start_hour, end_hour):
        slot_time = datetime(2000, 1, 1, hour, 0)  # Arbitrary date
        slots.append(slot_time.strftime('%I:%M %p'))

    return slots

def daterange(start_date, end_date):
    for n in range(int((end_date - start_date).days)):
        yield start_date + timedelta(n)

if __name__ == '__main__':
    app.run(debug=True)