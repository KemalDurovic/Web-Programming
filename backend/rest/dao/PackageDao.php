<?php
require_once 'BaseDao.php';


class UserDao extends BaseDao {
   public function __construct() {
       parent::__construct("packages");
   }


   public function getByName($name) {
       $stmt = $this->connection->prepare("SELECT * FROM packages WHERE name = :name");
       $stmt->bindParam(':name', $name);
       $stmt->execute();
       return $stmt->fetch();
   }
}
?>