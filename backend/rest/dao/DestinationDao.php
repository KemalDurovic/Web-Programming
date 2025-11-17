<?php
require_once 'BaseDao.php';


class DestinationDao extends BaseDao {
   public function __construct() {
       parent::__construct("destinations");
   }


   public function getByUserId($user_id) {
       $stmt = $this->connection->prepare("SELECT * FROM destinations d JOIN user_favorites uf ON uf.destination_id = d.id");
       $stmt->bindParam(':user_id', $user_id);
       $stmt->execute();
       return $stmt->fetch();
   }
   public function getByBadge($badge) {
    $stmt = $this->connection->prepare("SELECT * FROM destinations WHERE badge = :badge");
    $stmt->bindParam(':badge', $badge);
    $stmt->execute();
    return $stmt->fetchAll();
}
}
?>
