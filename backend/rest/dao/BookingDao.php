<?php
require_once 'BaseDao.php';


class UserDao extends BaseDao {
   public function __construct() {
       parent::__construct("bookings");
   }


   public function getByEmail($email) {
       $stmt = $this->connection->prepare("SELECT * FROM bookings WHERE email = :email");
       $stmt->bindParam(':email', $email);
       $stmt->execute();
       return $stmt->fetch();
   }
}
?>