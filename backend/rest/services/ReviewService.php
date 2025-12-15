<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/ReviewDao.php';

class ReviewService extends BaseService {
    public function __construct() {
        parent::__construct(new ReviewDao());
    }
    
    public function create($data) {
        if (empty($data['user_id'])) {
            throw new Exception('User ID is required.');
        }
        if (empty($data['rating'])) {
            throw new Exception('Rating is required.');
        }
        if (!is_numeric($data['rating']) || $data['rating'] < 1 || $data['rating'] > 5) {
            throw new Exception('Rating must be between 1 and 5.');
        }
        if (isset($data['title']) && strlen($data['title']) > 200) {
            throw new Exception('Title must not exceed 200 characters.');
        }
        if (isset($data['comment']) && strlen($data['comment']) > 1000) {
            throw new Exception('Comment must not exceed 1000 characters.');
        }
        
        if (empty($data['package_id'])) {
            unset($data['package_id']);
        }
        if (empty($data['destination_id'])) {
            unset($data['destination_id']);
        }
        
        return $this->dao->insert($data);
    }
    
    public function getByUserId($user_id) {
        return $this->dao->getByUserId($user_id);
    }
    
    public function delete($id) {
        $review = $this->dao->getById($id);
        if (!$review) {
            throw new Exception('Review not found.');
        }
        
        return $this->dao->delete($id);
    }
    
    public function update($id, $data) {
        $review = $this->dao->getById($id);
        if (!$review) {
            throw new Exception('Review not found.');
        }
        if (isset($data['rating'])) {
            if (!is_numeric($data['rating']) || $data['rating'] < 1 || $data['rating'] > 5) {
                throw new Exception('Rating must be between 1 and 5.');
            }
        }
        if (isset($data['title']) && strlen($data['title']) > 200) {
            throw new Exception('Title must not exceed 200 characters.');
        }
        if (isset($data['comment']) && strlen($data['comment']) > 1000) {
            throw new Exception('Comment must not exceed 1000 characters.');
        }
        
        if (empty($data['package_id'])) {
            unset($data['package_id']);
        }
        if (empty($data['destination_id'])) {
            unset($data['destination_id']);
        }
        
        return $this->dao->update($id, $data);
    }
}
?>