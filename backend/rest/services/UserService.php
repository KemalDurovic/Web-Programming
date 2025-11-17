<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/UserDao.php';

class UserService extends BaseService {
    public function __construct() {
        parent::__construct(new UserDao());
    }
    //I have created a validation for everything I think is necesseary for my userservice
    public function createUser($data) {
        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            throw new Exception('Username, email, and password are required.');
        }
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format.');
        }
        if (strlen($data['password']) < 8) {
            throw new Exception('Password must be at least 8 characters.');
        }
        if (strlen($data['username']) < 3 || strlen($data['username']) > 50) {
            throw new Exception('Username must be between 3 and 50 characters.');
        }
        if (isset($data['full_name']) && strlen($data['full_name']) > 100) {
            throw new Exception('Full name must not exceed 100 characters.');
        }
        if (isset($data['phone']) && !empty($data['phone'])) {
            if (!preg_match('/^\+?[0-9]{10,15}$/', $data['phone'])) {
                throw new Exception('Invalid phone number format.');
            }
        }
        $valid_roles = ['user', 'admin'];
        if (isset($data['role']) && !in_array($data['role'], $valid_roles)) {
            throw new Exception('Invalid role. Must be either "user" or "admin".');
        }
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        
        return $this->create($data);
    }
    
    public function getAll() {
        $users = $this->dao->getAll();
        foreach ($users as &$user) {
            unset($user['password']);
        }
        return $users;
    }
    
    public function getById($id) {
        $user = $this->dao->getById($id);
        if ($user) {
            unset($user['password']);
        }
        return $user;
    }
    
    public function getByRole($role) {
        $users = $this->dao->getByRole($role);
        foreach ($users as &$user) {
            unset($user['password']);
        }
        return $users;
    }
    public function getByEmail($email) {
        $user = $this->dao->getByEmail($email);
        if ($user) {
            unset($user['password']);
        }
        return $user;
    }
    
    public function delete($id) {
        $user = $this->dao->getById($id);
        if (!$user) {
            throw new Exception('User not found.');
        }
        
        return $this->dao->delete($id);
    }
    
    public function update($id, $data) {
        $user = $this->dao->getById($id);
        if (!$user) {
            throw new Exception('User not found.');
        }
        if (isset($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format.');
        }
        if (isset($data['username']) && (strlen($data['username']) < 3 || strlen($data['username']) > 50)) {
            throw new Exception('Username must be between 3 and 50 characters.');
        }
        if (isset($data['password'])) {
            if (strlen($data['password']) < 8) {
                throw new Exception('Password must be at least 8 characters.');
            }
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        if (isset($data['role'])) {
            $valid_roles = ['user', 'admin'];
            if (!in_array($data['role'], $valid_roles)) {
                throw new Exception('Invalid role. Must be either "user" or "admin".');
            }
        }
        
        return $this->dao->update($id, $data);
    }
}
?>