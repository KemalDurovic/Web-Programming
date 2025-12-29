let Constants = {
    PROJECT_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? "http://localhost/kemal_durovic/web-programming/backend/"
        : "/backend/",
    USER_ROLE: "user",
    ADMIN_ROLE: "admin"
}