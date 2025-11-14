<?php
require '../vendor/autoload.php';
require_once 'services/UserService.php';
require_once 'services/DestinationService.php';
require_once 'services/PackageService.php';
require_once 'services/BookingService.php';
require_once 'services/ReviewService.php';

Flight::route('GET /', function(){
    echo json_encode(['message' => 'TravelTrust API is running']);
});

// User Routes
Flight::route('GET /users', function(){
    $service = new UserService();
    $users = $service->getAll();
    echo json_encode($users);
});

Flight::route('GET /users/@id', function($id){
    $service = new UserService();
    $user = $service->getById($id);
    echo json_encode($user);
});

Flight::route('POST /users', function(){
    $service = new UserService();
    $data = Flight::request()->data->getData();
    $user = $service->createUser($data);
    echo json_encode($user);
});

Flight::route('PUT /users/@id', function($id){
    $service = new UserService();
    $data = Flight::request()->data->getData();
    $result = $service->update($id, $data);
    echo json_encode(['success' => $result]);
});

Flight::route('DELETE /users/@id', function($id){
    $service = new UserService();
    $result = $service->delete($id);
    echo json_encode(['success' => $result]);
});

// Destination Routes
Flight::route('GET /destinations', function(){
    $service = new DestinationService();
    $destinations = $service->getAll();
    echo json_encode($destinations);
});

Flight::route('GET /destinations/@id', function($id){
    $service = new DestinationService();
    $destination = $service->getById($id);
    echo json_encode($destination);
});

Flight::route('POST /destinations', function(){
    $service = new DestinationService();
    $data = Flight::request()->data->getData();
    $destination = $service->createDestination($data);
    echo json_encode($destination);
});

Flight::route('PUT /destinations/@id', function($id){
    $service = new DestinationService();
    $data = Flight::request()->data->getData();
    $result = $service->update($id, $data);
    echo json_encode(['success' => $result]);
});

Flight::route('DELETE /destinations/@id', function($id){
    $service = new DestinationService();
    $result = $service->delete($id);
    echo json_encode(['success' => $result]);
});

Flight::route('GET /destinations/badge/@badge', function($badge){
    $service = new DestinationService();
    $destinations = $service->getByBadge($badge);
    echo json_encode($destinations);
});

// Package Routes
Flight::route('GET /packages', function(){
    $service = new PackageService();
    $packages = $service->getAll();
    echo json_encode($packages);
});

Flight::route('GET /packages/@id', function($id){
    $service = new PackageService();
    $package = $service->getById($id);
    echo json_encode($package);
});

Flight::route('POST /packages', function(){
    $service = new PackageService();
    $data = Flight::request()->data->getData();
    $package = $service->create($data);
    echo json_encode($package);
});

Flight::route('PUT /packages/@id', function($id){
    $service = new PackageService();
    $data = Flight::request()->data->getData();
    $result = $service->update($id, $data);
    echo json_encode(['success' => $result]);
});

Flight::route('DELETE /packages/@id', function($id){
    $service = new PackageService();
    $result = $service->delete($id);
    echo json_encode(['success' => $result]);
});

Flight::route('GET /packages/category/@category', function($category){
    $service = new PackageService();
    $packages = $service->getByCategory($category);
    echo json_encode($packages);
});

// Booking Routes
Flight::route('GET /bookings', function(){
    $service = new BookingService();
    $bookings = $service->getAll();
    echo json_encode($bookings);
});

Flight::route('GET /bookings/@id', function($id){
    $service = new BookingService();
    $booking = $service->getById($id);
    echo json_encode($booking);
});

Flight::route('POST /bookings', function(){
    $service = new BookingService();
    $data = Flight::request()->data->getData();
    $booking = $service->create($data);
    echo json_encode($booking);
});

Flight::route('PUT /bookings/@id', function($id){
    $service = new BookingService();
    $data = Flight::request()->data->getData();
    $result = $service->update($id, $data);
    echo json_encode(['success' => $result]);
});

Flight::route('DELETE /bookings/@id', function($id){
    $service = new BookingService();
    $result = $service->delete($id);
    echo json_encode(['success' => $result]);
});

Flight::route('GET /bookings/user/@user_id', function($user_id){
    $service = new BookingService();
    $bookings = $service->getByUserId($user_id);
    echo json_encode($bookings);
});

// Review Routes
Flight::route('GET /reviews', function(){
    $service = new ReviewService();
    $reviews = $service->getAll();
    echo json_encode($reviews);
});

Flight::route('GET /reviews/@id', function($id){
    $service = new ReviewService();
    $review = $service->getById($id);
    echo json_encode($review);
});

Flight::route('POST /reviews', function(){
    $service = new ReviewService();
    $data = Flight::request()->data->getData();
    $review = $service->create($data);
    echo json_encode($review);
});

Flight::route('PUT /reviews/@id', function($id){
    $service = new ReviewService();
    $data = Flight::request()->data->getData();
    $result = $service->update($id, $data);
    echo json_encode(['success' => $result]);
});

Flight::route('DELETE /reviews/@id', function($id){
    $service = new ReviewService();
    $result = $service->delete($id);
    echo json_encode(['success' => $result]);
});

Flight::route('GET /reviews/user/@user_id', function($user_id){
    $service = new ReviewService();
    $reviews = $service->getByUserId($user_id);
    echo json_encode($reviews);
});

Flight::start();
?>