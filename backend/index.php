<?php
require 'vendor/autoload.php';

require_once __DIR__ . '/rest/services/DestinationService.php';
Flight::register('destinationService', 'DestinationService');
require_once __DIR__ . '/rest/routes/DestinationRoutes.php';

require_once __DIR__ . '/rest/services/UserService.php';
Flight::register('userService', 'UserService');
require_once __DIR__ . '/rest/routes/UserRoutes.php';

require_once __DIR__ . '/rest/services/PackageService.php';
Flight::register('packageService', 'PackageService');
require_once __DIR__ . '/rest/routes/PackageRoutes.php';

require_once __DIR__ . '/rest/services/BookingService.php';
Flight::register('bookingService', 'BookingService');
require_once __DIR__ . '/rest/routes/BookingRoutes.php';

require_once __DIR__ . '/rest/services/ReviewService.php';
Flight::register('reviewService', 'ReviewService');
require_once __DIR__ . '/rest/routes/ReviewRoutes.php';

Flight::route('/', function(){
    echo 'API is working!';
});

Flight::route('GET /debug/routes', function(){
    Flight::json(Flight::router()->getRoutes());
});

Flight::start();
?>
