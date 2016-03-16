function homeScreen() {
    app.HomeView();
}

app.HomeView = function (service) {

    var homeTpl = new this.templates.get("homeScreen");

    this.initialize = function () {
        this.render();
    };

    this.render = function() {
        $('body').html(homeTpl());
    };

    this.initialize();
};