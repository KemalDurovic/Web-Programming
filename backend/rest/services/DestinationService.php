<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/DestinationDao.php';

class DestinationService extends BaseService {
   public function __construct() {
        parent::__construct(new DestinationDao());
   }
   public function getByBadge($data) {
       return $this->dao->getByBadge($data);
   }

}
?>
