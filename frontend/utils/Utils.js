var Utils = {
    init_spapp: () => {
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
        app.run();
    }
}