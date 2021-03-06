function eventScreen(templateName, event_args) {
    var args_length = event_args.length;
    if (args_length > 1) {
        // If the event arguments has more than one, we
        // can collect further template information.
        for (var i = 0; i < args_length -1; i++) {
            templateName = templateName + "_" + event_args[i]
        }
    }
    var event_id = event_args[args_length -1];
    app.eventAdapter.findById(event_id).done(function(event) {
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