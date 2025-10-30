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

}
?>