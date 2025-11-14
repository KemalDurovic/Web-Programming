<?php
require_once 'DestinationService.php';
require_once 'UserService.php';
require_once 'BookingService.php';
require_once 'PackageService.php';
require_once 'ReviewService.php';

try{
    $destination_service = new DestinationService();

    $data = [
        'name' => 'Swiss Alps',
        'location' => 'The Alps of Switzerland',
        'country' => 'Switzerland',
        'image_url' => 'https://example.com/image.jpg',
        'description' => 'Beautiful mountains',
        'badge' => 'Popular',
        'price_from' => 1299
    ];
    $destinations = $destination_service->create($data); 
    echo "Created destination:\n";
    print_r($destinations);

    echo"\n\nDestionations by category 'Popular':\n";
    $destinations = $destination_service->getByBadge('Popular'); 
    print_r($destinations);

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
} 
try {
    $user_service = new UserService();

    $data = [
        'username' => 'johny_doe',
        'email' => 'johny@example.com',
        'password' => 'securepass123',
        'full_name' => 'John Doe',
        'phone' => '+1234567890',
        'role' => 'user'
    ];

    $user = $user_service->createUser($data);
    echo "Created user: \n";
    print_r($user);

    echo "\n\nUsers by role 'user':\n";
    $users = $user_service->getByRole('user');
    print_r($users);

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
try {
    $booking_service = new BookingService();
    
    $data = [
        'user_id' => 1,
        'package_id' => 1,
        'booking_date' => '2025-12-25',
        'number_of_people' => 2,
        'total_price' => 2598.00,
        'status' => 'pending',
        'special_requests' => 'Need vegetarian meals'
    ];
    $booking = $booking_service->create($data);
    
    if ($booking && isset($booking['booking_id'])) {
        echo "Success! Booking ID: " . $booking['booking_id'] . "\n";
        print_r($booking);
        echo "\n";
    } else {
        echo "Failed to create booking.\n\n";
    }

    echo "2. Getting bookings by user ID (1)...\n";
    $bookings = $booking_service->getByUserId(1);
    print_r($bookings);
    echo "\n";
    
    echo "=== All tests completed successfully! ===\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
try {
    $package_service = new PackageService();
    
    echo "=== Testing Package Service ===\n\n";
    
    echo "1. Creating new package...\n";
    $data = [
        'destination_id' => 1,
        'name' => 'Alpine Explorer',
        'category' => 'adventure',
        'duration_days' => 7,
        'duration_nights' => 6,
        'price' => 1299.00,
        'what_includes' => 'Hotel, Guide, Meals',
        'tags' => 'mountains, hiking, nature'
    ];
    $package = $package_service->create($data);
    
    if ($package && isset($package['package_id'])) {
        echo "Success! Package ID: " . $package['package_id'] . "\n";
        print_r($package);
        echo "\n";
    } else {
        echo "Failed to create package.\n\n";
    }
    
    echo "2. Getting packages by category 'adventure'...\n";
    $packages = $package_service->getByCategory('adventure');
    print_r($packages);
    echo "\n";
    
    echo "=== All tests completed successfully! ===\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
try {
    $review_service = new ReviewService();
    
    echo "=== Testing Review Service ===\n\n";
    
    echo "1. Creating new review...\n";
    $data = [
        'user_id' => 1,
        'destination_id' => 1,
        'package_id' => 1,
        'rating' => 5,
        'title' => 'Amazing Experience',
        'comment' => 'Had a wonderful time exploring the mountains!',
        'is_verified' => 1
    ];
    $review = $review_service->create($data);
    
    if ($review && isset($review['review_id'])) {
        echo "Success! Review ID: " . $review['review_id'] . "\n";
        print_r($review);
        echo "\n";
    } else {
        echo "Failed to create review.\n\n";
    }
    
    echo "2. Getting reviews by user ID (1)...\n";
    $reviews = $review_service->getByUserId(1);
    print_r($reviews);
    echo "\n";
    
    echo "=== All tests completed successfully! ===\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

?>