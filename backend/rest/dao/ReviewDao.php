<?php
require_once 'BaseDao.php';


class ReviewDao extends BaseDao {
   public function __construct() {
       parent::__construct("reviews");
   }


   public function getByUserId($user_id) {
       $stmt = $this->connection->prepare("SELECT * FROM reviews WHERE user_id = :user_id");
       $stmt->bindParam(':user_id', $user_id);
       $stmt->execute();
       return $stmt->fetch();
   }
}
?>