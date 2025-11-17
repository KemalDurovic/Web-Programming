<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/PackageDao.php';

class PackageService extends BaseService {
    public function __construct() {
        parent::__construct(new PackageDao());
    }
    
    public function create($data) {
        if (empty($data['destination_id'])) {
            throw new Exception('Destination ID is required.');
        }
        if (empty($data['name'])) {
            throw new Exception('Package name is required.');
        }
        if (empty($data['category'])) {
            throw new Exception('Category is required.');
        }
        if (empty($data['duration_days'])) {
            throw new Exception('Duration in days is required.');
        }
        if (empty($data['price'])) {
            throw new Exception('Price is required.');
        }
        if (strlen($data['name']) < 3 || strlen($data['name']) > 150) {
            throw new Exception('Package name must be between 3 and 150 characters.');
        }
        if (!is_numeric($data['duration_days']) || $data['duration_days'] <= 0) {
            throw new Exception('Duration days must be a positive number.');
        }
        if (!is_numeric($data['price']) || $data['price'] <= 0) {
            throw new Exception('Price must be a positive number.');
        }
        
        return $this->dao->insert($data);
    }
    
    public function getByCategory($category) {
        return $this->dao->getByCategory($category);
    }
    
    public function getByDestinationId($destination_id) {
        return $this->dao->getByDestinationId($destination_id);
    }
    
    public function delete($id) {
        $package = $this->dao->getById($id);
        if (!$package) {
            throw new Exception('Package not found.');
        }
        
        return $this->dao->delete($id);
    }
    
    public function update($id, $data) {
        $package = $this->dao->getById($id);
        if (!$package) {
            throw new Exception('Package not found.');
        }
        if (isset($data['name'])) {
            if (strlen($data['name']) < 5 || strlen($data['name']) > 150) {
                throw new Exception('Package name must be between 5 and 150 characters.');
            }
        }
        if (isset($data['duration_days'])) {
            if (!is_numeric($data['duration_days']) || $data['duration_days'] <= 0) {
                throw new Exception('Duration days must be a positive number.');
            }
        }
        if (isset($data['price'])) {
            if (!is_numeric($data['price']) || $data['price'] <= 0) {
                throw new Exception('Price must be a positive number.');
            }
        }
        
        return $this->dao->update($id, $data);
    }
}
?>