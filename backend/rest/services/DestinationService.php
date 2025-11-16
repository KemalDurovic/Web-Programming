<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/DestinationDao.php';

class DestinationService extends BaseService {
    public function __construct() {
        parent::__construct(new DestinationDao());
    }
    
    public function create($data) {
        if (empty($data['name'])) {
            throw new Exception('Destination name is required.');
        }
        if (empty($data['location'])) {
            throw new Exception('Location is required.');
        }
        if (empty($data['country'])) {
            throw new Exception('Country is required.');
        }
        if (strlen($data['name']) < 2 || strlen($data['name']) > 100) {
            throw new Exception('Destination name must be between 2 and 100 characters.');
        }
        if (isset($data['image_url']) && !empty($data['image_url'])) {
            if (!filter_var($data['image_url'], FILTER_VALIDATE_URL)) {
                throw new Exception('Invalid image URL format.');
            }
        }
        if (isset($data['price_from']) && (!is_numeric($data['price_from']) || $data['price_from'] < 0)) {
            throw new Exception('Price must be a positive number.');
        }
        
        return $this->dao->insert($data);
    }
    
    public function getByBadge($badge) {
        return $this->dao->getByBadge($badge);
    }
    
    public function delete($id) {
        $destination = $this->dao->getById($id);
        if (!$destination) {
            throw new Exception('Destination not found.');
        }
        
        return $this->dao->delete($id);
    }
    
    public function update($id, $data) {
        $destination = $this->dao->getById($id);
        if (!$destination) {
            throw new Exception('Destination not found.');
        }
        if (isset($data['name'])) {
            if (strlen($data['name']) < 2 || strlen($data['name']) > 100) {
                throw new Exception('Destination name must be between 2 and 100 characters.');
            }
        }
        if (isset($data['image_url']) && !empty($data['image_url'])) {
            if (!filter_var($data['image_url'], FILTER_VALIDATE_URL)) {
                throw new Exception('Invalid image URL format.');
            }
        }
        if (isset($data['price_from']) && (!is_numeric($data['price_from']) || $data['price_from'] < 0)) {
            throw new Exception('Price must be a positive number.');
        }
        
        return $this->dao->update($id, $data);
    }
}
?>
