<?php
require_once 'dao/UserDao.php';
require_once 'dao/DestinationDao.php';

$userDao = new UserDao();
$destintionDao = new DestinationDao();
/*$bookingDao = new BookingDao();*/


// Insert a new user (Customer)
/*
$userDao->insert([
   'username' => 'kemal_d',
   'email' => 'kemal.durovic@stu.ibu.edu.ba',
   'password' => password_hash('XVL+$Z', PASSWORD_DEFAULT),
   'full_name' => 'Kemal Durovic',
   'phone' => '+387603570985',
   'role' => 'user',
   'created_at'=> null,
   'updated_at'=> null
]);
try {
    $userDao->insert([
        'username' => 'kemal_durovic1',
        'email' => 'kemal@example.com',
    ]);
    echo "User kreiran!";
} catch (PDOException $e) {
    if ($e->getCode() == 23000) { // Duplicate entry
        echo "Username već postoji!";
    } else {
        throw $e; // Drugi error
    }
}*/


// Insert a new order
/*$bookingDao->insert([
    'booking_date' => null,
    number_of
])*/
$destinationDao->insert([
   'name' => 'Swiss Alps',
   'location' => 'The Alps of  Switzerland',
   'country' => ' Switzerland',
   'description' => 'Majestic mountains, pristine lakes, and charming villages await you.',
   'image_url' => 'null',
   'badge' => 'Popular',
   'price_from' => 1.299,
   'featured' => null,
   'created_at'=> NOW(),
   'updated_at'=> null
   
]);


// Fetch all users
$users = $userDao->getAll();
print_r($users);
$destintions = $destinationDaoDao->getAll();
print_r($destintions);


// Fetch all orders
/*
$orders = $orderDao->getAll();
print_r($orders);*/


?>
