<?php
require_once __DIR__ . '/BaseDao.php';

class AuthDao extends BaseDao {
    protected $table_name;

    public function __construct() {
        $this->table_name = "users";
        parent::__construct($this->table_name);
    }

    protected function query_unique($query, $params = []) {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    protected function execute($query, $params = []) {
        $stmt = $this->connection->prepare($query);
        return $stmt->execute($params);
    }

    protected function get_last_insert_id() {
        return $this->connection->lastInsertId();
    }

    public function get_user_by_email($email) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email";
        return $this->query_unique($query, ['email' => $email]);
    }

    public function get_user_by_username($username) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE username = :username";
        return $this->query_unique($query, ['username' => $username]);
    }

    public function create_user($data) {
        $this->insert($data);
        return $this->get_last_insert_id();
    }

    public function get_user_by_id($id) {
        return $this->getById($id);
    }
}
?>