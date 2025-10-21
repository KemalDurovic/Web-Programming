<?php
require_once 'BaseDao.php';


class UserDao extends BaseDao {
   public function __construct() {
       parent::__construct("packages");
   }


   public function getByEmail($email) {
       $stmt = $this->connection->prepare("SELECT * FROM packages WHERE email = :email");
       $stmt->bindParam(':email', $email);
       $stmt->execute();
       return $stmt->fetch();
   }
}
?>