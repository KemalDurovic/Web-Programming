var Utils = {
    init_spapp: () => {
        if (!Utils.isAuthenticated()) {
            window.location.href = "login.html";
            return;
        }
        var app = $.spapp({
            templateDir: "./pages/",
            defaultView: "#home"
        });
        
        app.route({
            view: "home",
            load: "home.html"
        });
        
        app.route({
            view: "about",
            load: "about.html"
        });
        
        app.route({
            view: "packages",
            load: "packages.html"
        });
        
        app.route({
            view: "contact",
            load: "contact.html"
        });
        
        app.route({
            view: "destinations",
            load: "destinations.html"
        });

        app.route({
            view: "login",
            load: "login.html"
        });

        app.route({
            view: "bookings",
            load: "bookings.html"
        });

        app.route({
            view: "reviews",
            load: "reviews.html"
        });

        app.route({
            view: "admin",
            load: "admin.html",
            onCreate: function() {
                const user = Utils.getCurrentUser();
                if (!user || user.role !== Constants.ADMIN_ROLE) {
                    alert('Access denied. Admin only.');
                    window.location.hash = "#home";
                }
            }
        });

        app.run();
    },

    parseJwt: function(token) {
        if (!token) return null;
        try {
            const payload = token.split('.')[1];
            const decoded = atob(payload);
            return JSON.parse(decoded);
        } catch (e) {
            console.error("Invalid JWT token", e);
            return null;
        }
    },

    isAuthenticated: function() {
        const token = localStorage.getItem("user_token");
        if (!token) return false;
        
        try {
            const decoded = Utils.parseJwt(token);
            if (!decoded) return false;

            if (decoded.exp && decoded.exp < Date.now() / 1000) {
                localStorage.removeItem("user_token");
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    },

    getCurrentUser: function() {
        const token = localStorage.getItem("user_token");
        if (!token) return null;
        
        const decoded = Utils.parseJwt(token);
        return decoded ? decoded.user : null;
    }
};