<?php
require_once 'BaseDao.php';


class PackageDao extends BaseDao {
   public function __construct() {
       parent::__construct("packages");
   }


   public function getByCategory($category) {
       $stmt = $this->connection->prepare("SELECT * FROM packages WHERE category = :category");
       $stmt->bindParam(':category', $category);
       $stmt->execute();
       return $stmt->fetch();
   }
   public function getByDestinationId($destination_id) {
       $stmt = $this->connection->prepare("SELECT * FROM packages WHERE destination_id = :destination_id");
       $stmt->bindParam(':destination_id', $destination_id);
       $stmt->execute();
       return $stmt->fetch();
   }
}
?>