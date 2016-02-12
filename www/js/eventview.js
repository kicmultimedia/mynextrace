function eventScreen(templateName, event_args) {
    app.eventAdapter.findById(event_args.id).done(function(event) {
        app.EventView(templateName, event)
    });
}

app.EventView = (function () {

    "use strict";

    return function (templateName, event) {

        var template = app.templates.get(templateName);

        this.initialize = function () {
            this.render();
        };

        this.render = function () {
            $('body').html(template(event));
            return this;
        };

        this.initialize();

    };
}());