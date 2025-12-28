<?php
class Database {
   private static $connection = null;

   private static function getHost() {
       return self::get_env("DB_HOST", 'db-mysql-fra1-63088-do-user-31107839-0.l.db.ondigitalocean.com');
   }

   private static function getDbName() {
       return self::get_env("DB_NAME", "defaultdb");
   }

   private static function getUsername() {
       return self::get_env("DB_USER", 'doadmin');
   }

   private static function getPassword() {
       return self::get_env("DB_PASSWORD", 'AVNS_CGOgVEpZ6ZGqutXjNih');
   }

   private static function getPort() {
       return self::get_env("DB_PORT", 25060);
   }

   public static function connect() {
       if (self::$connection === null) {
           try {
               $dsn = "mysql:host=" . self::getHost() . 
                      ";port=" . self::getPort() . 
                      ";dbname=" . self::getDbName();
               
               self::$connection = new PDO(
                   $dsn,
                   self::getUsername(),
                   self::getPassword(),
                   [
                       PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                       PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                       PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false, // Required for DigitalOcean
                       PDO::MYSQL_ATTR_SSL_CA => false
                   ]
               );
           } catch (PDOException $e) {
               error_log("Connection failed: " . $e->getMessage());
               die("Connection failed: " . $e->getMessage());
           }
       }
       return self::$connection;
   }

   public static function JWT_SECRET() {
       return self::get_env("JWT_SECRET", ',dpPL,Se%fM-UVQBwf/X0T&B!DF6%}');
   }

   private static function get_env($name, $default) {
       return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
   }
}
?>