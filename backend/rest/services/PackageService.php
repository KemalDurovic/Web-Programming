<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/PackageDao.php';
class PackageService extends BaseService {
   public function __construct() {
        parent::__construct(new PackageDao());
    }
    
    public function getByCategory($category) {
        return $this->dao->getByCategory($category);
    }
    
    public function getByDestinationId($destination_id) {
        return $this->dao->getByDestinationId($destination_id);
    }
}
?>