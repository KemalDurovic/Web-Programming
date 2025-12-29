<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/AuthDao.php';
require_once __DIR__ . '/../config.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService extends BaseService {
   private $auth_dao;
   
   public function __construct() {
       try {
           $this->auth_dao = new AuthDao();
           parent::__construct($this->auth_dao);
       } catch (Exception $e) {
           error_log("AuthService::__construct error: " . $e->getMessage());
           throw $e;
       }
   }

   public function get_user_by_email($email){
       return $this->auth_dao->get_user_by_email($email);
   }

   public function register($entity) {  
       try {
           if (empty($entity['email']) || empty($entity['password'])) {
               return ['success' => false, 'error' => 'Email and password are required.'];
           }

           if (empty($entity['username'])) {
               return ['success' => false, 'error' => 'Username is required.'];
           }

           if (empty($entity['full_name'])) {
               return ['success' => false, 'error' => 'Full name is required.'];
           }

           $email_exists = $this->auth_dao->get_user_by_email($entity['email']);
           if($email_exists){
               return ['success' => false, 'error' => 'Email already registered.'];
           }

           $username_exists = $this->auth_dao->get_user_by_username($entity['username']);
           if($username_exists){
               return ['success' => false, 'error' => 'Username already taken.'];
           }

           if (!isset($entity['role'])) {
               $entity['role'] = 'user';
           }

           $entity['password'] = password_hash($entity['password'], PASSWORD_BCRYPT);

           $entity = parent::add($entity);

           unset($entity['password']);

           return ['success' => true, 'data' => $entity];
       } catch (Exception $e) {
           error_log("AuthService::register error: " . $e->getMessage());
           return ['success' => false, 'error' => 'Registration failed: ' . $e->getMessage()];
       }
   }

   public function login($entity) {  
       try {
           error_log("AuthService::login called with email: " . ($entity['email'] ?? 'none'));
           
           if (empty($entity['email']) || empty($entity['password'])) {
               return ['success' => false, 'error' => 'Email and password are required.'];
           }

           $user = $this->auth_dao->get_user_by_email($entity['email']);
           
           error_log("User found: " . ($user ? 'yes' : 'no'));
           
           if(!$user){
               return ['success' => false, 'error' => 'Invalid email or password.'];
           }

           if(!password_verify($entity['password'], $user['password'])) {
               return ['success' => false, 'error' => 'Invalid email or password.'];
           }

           unset($user['password']);
          
           $jwt_payload = [
               'user' => $user,
               'iat' => time(),
               'exp' => time() + (60 * 60 * 24) // valid for 1 day
           ];

           $token = JWT::encode(
               $jwt_payload,
               Database::JWT_SECRET(),
               'HS256'
           );

           return ['success' => true, 'data' => array_merge($user, ['token' => $token])];
       } catch (Exception $e) {
           error_log("AuthService::login error: " . $e->getMessage());
           error_log("Stack trace: " . $e->getTraceAsString());
           return ['success' => false, 'error' => 'Login failed: ' . $e->getMessage()];
       }
   }
}
?>