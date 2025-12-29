<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: https://seahorse-app-sc4ki.ondigitalocean.app');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authentication, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'vendor/autoload.php';
require_once __DIR__ . '/rest/config.php';

error_log("REQUEST: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI']);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once __DIR__ . '/rest/services/DestinationService.php';
Flight::register('destinationService', 'DestinationService');

require_once __DIR__ . '/rest/services/UserService.php';
Flight::register('userService', 'UserService');

require_once __DIR__ . '/rest/services/PackageService.php';
Flight::register('packageService', 'PackageService');

require_once __DIR__ . '/rest/services/BookingService.php';
Flight::register('bookingService', 'BookingService');

require_once __DIR__ . '/rest/services/ReviewService.php';
Flight::register('reviewService', 'ReviewService');

require_once __DIR__ . '/rest/services/AuthService.php';
Flight::register('auth_service', 'AuthService');

Flight::route('/', function(){
    echo 'API is working!';
});

Flight::route('GET /debug/routes', function(){
    Flight::json(Flight::router()->getRoutes());
});

// Load auth routes BEFORE middleware
require_once __DIR__ . '/rest/routes/AuthRoutes.php';

// Authentication middleware for protected routes
Flight::before('start', function() {
    $url = Flight::request()->url;
    
    // Skip authentication for public routes
    $publicRoutes = ['/', '', '/debug/routes'];
    
    // Check if it's an auth route
    if (strpos($url, '/auth/') !== false) {
        return true;
    }
    
    // Check if it's a public route
    foreach ($publicRoutes as $route) {
        if ($url === $route) {
            return true;
        }
    }
    
    // For all other routes, require authentication
    try {
        $token = Flight::request()->getHeader("Authentication");
        if(!$token) {
            Flight::halt(401, json_encode(['error' => 'Missing authentication header']));
        }

        $decoded_token = JWT::decode($token, new Key(Database::JWT_SECRET(), 'HS256'));

        Flight::set('user', $decoded_token->user);
        Flight::set('jwt_token', $token);
        return true;
    } catch (\Exception $e) {
        Flight::halt(401, json_encode(['error' => $e->getMessage()]));
    }
});

require_once __DIR__ . '/rest/routes/DestinationRoutes.php';
require_once __DIR__ . '/rest/routes/UserRoutes.php';
require_once __DIR__ . '/rest/routes/PackageRoutes.php';
require_once __DIR__ . '/rest/routes/BookingRoutes.php';
require_once __DIR__ . '/rest/routes/ReviewRoutes.php';

Flight::start();
?>