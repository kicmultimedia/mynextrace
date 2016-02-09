function eventScreen(templateName, event_args) {
    app.productAdapter.findById(event_args.id).done(function(event) {
        app.EventView(templateName, event)
    });
}

app.EventView = (function () {

    "use strict";

    return function (templateName, event) {

        var template = app.templates.get(templateName);

        this.initialize = function () {
            this.render();
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
            this.$el.on('click', '.small-pic', function () {
                $(".large-pic-bg", this.$el).show();
                $(".large-pic", this.$el).show();
            });
            this.$el.on('click', '.large-pic', function () {
                $(".large-pic", this.$el).hide();
                $(".large-pic-bg", this.$el).hide();
            });
        };

        this.render = function () {
            $('body').html(template(event));
            return this;
        };

        this.initialize();

    };
}());