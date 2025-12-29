<?php
require_once __DIR__ . '/BaseDao.php';
require_once __DIR__ . '/../config.php';

class AuthDao extends BaseDao {
    protected $table_name;

    public function __construct() {
        $this->table_name = "users";
        parent::__construct($this->table_name);
    }

    public function get_user_by_email($email) {
        try {
            $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email";
            $stmt = $this->connection->prepare($query);
            $stmt->execute(['email' => $email]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("AuthDao::get_user_by_email error: " . $e->getMessage());
            return false;
        }
    }

    public function get_user_by_username($username) {
        try {
            $query = "SELECT * FROM " . $this->table_name . " WHERE username = :username";
            $stmt = $this->connection->prepare($query);
            $stmt->execute(['username' => $username]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("AuthDao::get_user_by_username error: " . $e->getMessage());
            return false;
        }
    }

    public function create_user($data) {
        $this->insert($data);
        return $this->connection->lastInsertId();
    }

    public function get_user_by_id($id) {
        return $this->getById($id);
    }
}
?>