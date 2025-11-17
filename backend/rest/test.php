<?php
require_once 'dao/UserDao.php';
require_once 'dao/DestinationDao.php';
require_once 'dao/PackageDao.php';
require_once 'dao/BookingDao.php';
require_once 'dao/ReviewDao.php';

$reviewDao = new ReviewDao();
$bookingDao = new BookingDao();
$userDao = new UserDao();
$desnationDao = new DestinationDao();
$packageDao = new PackageDao();
$bookingDao = new BookingDao();

$test_user = [
   'username' => 'kemal_dur',
   'email' => 'kemal.durovic@stu.ibu.edu.ba',
   'password' => password_hash('XVL+$Z', PASSWORD_DEFAULT),
   'full_name' => 'Kemal Durovic',
   'phone' => '+387603570985',
   'role' => 'user',
   'created_at'=> null,
   'updated_at'=> null
];  
$test_dest = [
   'name' => 'Swiss Alps',
   'location' => 'The Alps of  Switzerland',
   'country' => ' Switzerland',
   'description' => 'Majestic mountains, pristine lakes, and charming villages await you.',
   'image_url' => 'null',
   'badge' => 'Popular',
   'price_from' => 1.299,
   'featured' => null,
   'created_at'=> null,
   'updated_at'=> null
];
$test_pack = [
    'destination_id' => 1,
    'name' => 'Royal Experience',
    'category' => 'Luxury',
    'duration_days' => 14,
    'duration_nights' => 13,
    'what_includes' => ' 5-star accommodations Private transfers, Fine dining, Personal concierge',
    'price' => 8.999,
    'tags' => 'Exclusive',
    'created_at' => '',
    'updated_at' => ''
];
$test_book = [
    'user_id' => 1,
    'package_id' => 1,
    'booking_date' => '',
    'number_of_people' => 5,
    'total_price' => 1.299,
    'status' => 'confirmed',
    'special_requests' => 'I want to have breakfest every morning.',
    'created_at' => '',
    'updated_at' => ''
];
$test_review = [
    'user_id' => 1,
    'destination_id' => 1,
    'package_id' => 2,
    'rating' => 5,
    'title' => 'Great Package and Destination',
    'comment' => 'I really liked the Maldives soo much, the package which the TravelTrust provided was amazing',
    'is_verified' => 1,
    'created_at' => '',
    'updated_at' => ''
];
$reviewDao->insert($test_review);
echo '<h2>Reviews<h2>';
$reviewDao = $reviewDao->getAll();
print_r($reviewDao);
$bookingDao->insert($test_book);
echo '<h2>Bookings<h2>';
$bookingDao = $bookingDao->getAll();
print_r($bookingDao);
$packageDao->insert($test_pack);
echo '<h2>Packages<h2>';
$packageDao = $packageDao->getAll();
print_r($packageDao);
$destinationDao->insert($test_dest);
echo '<h2>Destinations<h2>';
$destinationDao = $destinationDao->getAll();
print_r($destinationDao);
$userDao->insert($test_user);
echo '<h2>Users<h2>';
$userDao = $userDao->getAll();
print_r($userDao); 
?>
