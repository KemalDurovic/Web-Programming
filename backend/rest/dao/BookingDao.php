<?php
require_once 'BaseDao.php';


class BookingDao extends BaseDao {
   public function __construct() {
       parent::__construct("bookings");
   }


    public function getByBookingDate($booking_date) {
       $stmt = $this->connection->prepare("SELECT * FROM bookings WHERE booking_date = :booking_date");
       $stmt->bindParam(':booking_date', $booking_date);
       $stmt->execute();
       return $stmt->fetchAll();
   }
   public function getByUserId($user_id) {
        $stmt = $this->connection->prepare("SELECT * FROM bookings WHERE user_id = :user_id ORDER BY created_at DESC");
        $stmt->execute(['user_id' => $user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
?>