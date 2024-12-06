INSERT INTO user_table (email, password, oauth_provider, balance, payment_method) VALUES
('johndoe@example.com','123', 'google', 50.00, 'credit_card'),
('janedoe@example.com','123', 'facebook', 30.00, 'paypal'),
('alice@example.com','123', 'twitter', 25.00, 'credit_card'),
('bob@example.com','123', 'google', 100.00, 'bank_transfer');

INSERT INTO City (name, boundaries) VALUES
('New York', ST_GeomFromText('POLYGON((-74.25909 40.477399, -73.700171 40.477399, -73.700171 40.917577, -74.25909 40.917577, -74.25909 40.477399))')),
('San Francisco', ST_GeomFromText('POLYGON((-123.173825 37.63983, -122.356658 37.63983, -122.356658 37.92982, -123.173825 37.92982, -123.173825 37.63983))'));

INSERT INTO Scooter (city_id, latitude, longitude, battery_level, is_available, needs_service, is_charging, last_maintenance, status)
VALUES
(1, 40.7128, -74.0060, 85.50, TRUE, FALSE, FALSE, '2023-11-15 10:30:00', 'active'),
(1, 40.7308, -73.9850, 45.25, TRUE, FALSE, TRUE, '2023-11-18 12:00:00', 'charging'),
(2, 37.7749, -122.4194, 60.00, TRUE, FALSE, FALSE, '2023-11-10 14:30:00', 'active');


INSERT INTO ChargingStation (city_id, name, location, capacity) VALUES
(1, 'Downtown Charging Hub', ST_PointFromText('POINT(-74.005 40.7128)'), 10),
(2, 'Bay Area Charging Center', ST_PointFromText('POINT(-122.4194 37.7749)'), 15);


INSERT INTO ParkingZone (city_id, name, boundaries, zone_type, parking_fee) VALUES
(1, 'Central Park Zone', ST_GeomFromText('POLYGON((-73.9654 40.7851, -73.9498 40.7851, -73.9498 40.7897, -73.9654 40.7897, -73.9654 40.7851))'), 'Public', 2.50),
(2, 'Golden Gate Zone', ST_GeomFromText('POLYGON((-122.4787 37.8085, -122.4724 37.8085, -122.4724 37.8121, -122.4787 37.8121, -122.4787 37.8085))'), 'Public', 3.00);


INSERT INTO Trip (user_id, scooter_id, start_time, end_time, start_location, end_location, distance, cost, base_fee, time_fee, parking_fee, payment_status) VALUES
(1, 1, '2023-11-28 08:00:00', '2023-11-28 08:30:00', ST_PointFromText('POINT(-74.006 40.7128)'), ST_PointFromText('POINT(-74.000 40.715)'), 5.00, 15.00, 10.00, 3.00, 2.00, 'Paid'),
(2, 2, '2023-11-28 09:00:00', NULL, ST_PointFromText('POINT(-73.985 40.7308)'), NULL, 0.00, 0.00, 0.00, 0.00, 0.00, 'Pending');


INSERT INTO ScooterLog (scooter_id, timestamp, location, speed, battery_level, event_type) VALUES
(1, '2023-11-28 08:05:00', ST_PointFromText('POINT(-74.002 40.711)'), 15.00, 80.00, 'Movement'),
(2, '2023-11-28 08:15:00', ST_PointFromText('POINT(-73.980 40.728)'), 0.00, 45.25, 'Charging');
