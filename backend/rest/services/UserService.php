<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/UserDao.php';
class   UserService extends BaseService {
   public function __construct() {
       $dao = new UserDao();
       parent::__construct(new UserDao());
   }
   public function createUser($data) {

        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            throw new Exception('Username, email, and password are required.');
        }
        
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format.');
        }
        
        if (strlen($data['password']) < 8) {
            throw new Exception('Password must be at least 8c characters.');
        }
        
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        
        return $this->create($data);
    }

    public function getByRole($role) {
        return $this->dao->getByRole($role);
    }
    public function getByEmail($email) {
        return $this->dao->getByEmail($email);
    }
}
?>