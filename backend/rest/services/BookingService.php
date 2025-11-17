<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/BookingDao.php';

class BookingService extends BaseService {
    public function __construct() {
        parent::__construct(new BookingDao());
    }
    
    public function create($data) {
        if (empty($data['user_id'])) {
            throw new Exception('User ID is required.');
        }
        
        if (empty($data['package_id'])) {
            throw new Exception('Package ID is required.');
        }
        
        if (empty($data['booking_date'])) {
            throw new Exception('Booking date is required.');
        }
        
        if (empty($data['number_of_people'])) {
            throw new Exception('Number of people is required.');
        }
        
        if (empty($data['total_price'])) {
            throw new Exception('Total price is required.');
        }
        $date = DateTime::createFromFormat('Y-m-d', $data['booking_date']);
        if (!$date || $date->format('Y-m-d') !== $data['booking_date']) {
            throw new Exception('Invalid booking date format. Use YYYY-MM-DD.');
        }
        $today = new DateTime();
        $today->setTime(0, 0, 0);
        $bookingDate = new DateTime($data['booking_date']);
        
        if ($bookingDate < $today) {
            throw new Exception('Booking date cannot be in the past.');
        }
        if (!is_numeric($data['number_of_people']) || $data['number_of_people'] <= 0) {
            throw new Exception('Number of people must be a positive number.');
        }
        if (!is_numeric($data['total_price']) || $data['total_price'] <= 0) {
            throw new Exception('Total price must be a positive number.');
        }
        
        return $this->dao->insert($data);
    }
    
    public function getByUserId($user_id) {
        return $this->dao->getByUserId($user_id);
    }
    
    public function delete($id) {
        $booking = $this->dao->getById($id);
        if (!$booking) {
            throw new Exception('Booking not found.');
        }
        
        return $this->dao->delete($id);
    }
    
    public function update($id, $data) {
        $booking = $this->dao->getById($id);
        if (!$booking) {
            throw new Exception('Booking not found.');
        }
        if (isset($data['booking_date'])) {
            $date = DateTime::createFromFormat('Y-m-d', $data['booking_date']);
            if (!$date || $date->format('Y-m-d') !== $data['booking_date']) {
                throw new Exception('Invalid booking date format. Use YYYY-MM-DD.');
            }
        }
        if (isset($data['number_of_people'])) {
            if (!is_numeric($data['number_of_people']) || $data['number_of_people'] <= 0) {
                throw new Exception('Number of people must be a positive number.');
            }
        }
        if (isset($data['total_price'])) {
            if (!is_numeric($data['total_price']) || $data['total_price'] <= 0) {
                throw new Exception('Total price must be a positive number.');
            }
        }
        
        return $this->dao->update($id, $data);
    }
}
?>