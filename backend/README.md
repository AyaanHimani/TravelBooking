# To Start The Backend

In the backend of project directory, you can run:

### `npm start`

## MySQL Tables

CREATE TABLE register (
    id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    username VARCHAR(200),
    email VARCHAR(200),
    password VARCHAR(200)
);

CREATE TABLE booked_flights (
	ticket_id INT UNSIGNED NOT NULL PRIMARY KEY,
    register_id INT REFERENCES register(id),
    arrival VARCHAR(200),
    arrival_city VARCHAR(200),
    arrival_time TIMESTAMP,
    departure VARCHAR(200),
    departure_city VARCHAR(200),
    departure_time TIMESTAMP,
    airline VARCHAR(200),
    price DECIMAL(10, 2),
    num_travelers INT,
    total_price DECIMAL(10, 2),
    carryon_baggage_weight INT DEFAULT 7,
    checkin_baggage_weight INT DEFAULT 25
);

CREATE TABLE travellers (
	ticket_id INT UNSIGNED NOT NULL,
    register_id INT REFERENCES register(id),
    name VARCHAR(255),
    age INT,
    gender ENUM('Male', 'Female', 'Other')
);

CREATE TABLE third_party_bookings (
	track_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
	ticket_id INT UNSIGNED NOT NULL, 
    register_id INT REFERENCES register(id),
    booking_date DATE,
    departure_city VARCHAR(255),
    arrival_city VARCHAR(255),
    departure_datetime DATETIME,
    arrival_datetime DATETIME,
    num_travelers INT,
    booking_company VARCHAR(255),
    booking_type ENUM('Flight', 'Train', 'Hotel', 'Bus', 'Holiday Package', 'Intercity', 'Other'),
    total_price DECIMAL(10, 2),
    additional_info TEXT
);

CREATE TABLE otp_store (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

 ### I would recommend using MySQL Workbench 
