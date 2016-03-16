function searchScreen(templateName, args) {
    var nextTemplate = app.templates.get(templateName);
    $('body').html(nextTemplate());
    if (args.length > 0) {
        app.EventSearchByCategory(args[0]);
        $('.search-key').keyup(function() {
            $(this).val(); // get the current value of the input field.
            if ($(this).val() !== "") {
                app.EventSearchByCategoryAndName(args[0])
            } else {
                app.EventSearchByCategory(args[0])
            }
        });
    } else {
        $('.search-key').keyup(function() {
            $(this).val(); // get the current value of the input field.
            app.EventSearch()
        });
    }
}

app.EventSearch = function (service) {

    var listItemTemplate = app.templates.get("eventListItem");

    this.initialize = function () {
        this.findByName();
    };

    this.findByName = function () {
        var search_field_value = $('.search-key').val();
        app.eventAdapter.findByName(search_field_value).done(function (events) {
            $('.event-list').html(listItemTemplate(events));
        });
        if (search_field_value == "") {
            $('.event-list').html("")
        }
    };

    this.initialize();
};

app.EventSearchByCategory = function (category) {

    var listItemTemplate = app.templates.get("eventListItem");

    this.initialize = function () {
        this.findByCategory(category);
    };

    this.findByCategory = function (category) {
        app.eventAdapter.findByCategory(category).done(function (events) {
            $('.event-list').html(listItemTemplate(events));
        });
    };

    this.initialize();
};

app.EventSearchByCategoryAndName = function (category) {

    var listItemTemplate = app.templates.get("eventListItem");

    this.initialize = function () {
        this.findByCategoryAndName(category);
    };

    this.findByCategoryAndName = function (category) {
        var search_field_value = $('.search-key').val();
        app.eventAdapter.findByCategoryAndName(category, search_field_value).done(function (events) {
            $('.event-list').html(listItemTemplate(events));
        });
    };

    this.initialize();
};