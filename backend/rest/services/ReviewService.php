<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/ReviewDao.php';

class ReviewService extends BaseService {
    public function __construct() {
        parent::__construct(new ReviewDao());
    }
    
    public function getByUserId($user_id) {
        return $this->dao->getByUserId($user_id);
    }
}
?>