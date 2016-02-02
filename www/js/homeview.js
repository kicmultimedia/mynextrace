var HomeView = function (service) {

    var homeTpl = Handlebars.compile($("#home-tpl").html());

    this.initialize = function () {
        console.log("In HomeView");
        this.render();
    };

    this.render = function() {
        $('body').html(homeTpl());
    };

    this.initialize();
};