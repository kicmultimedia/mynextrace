function searchScreen(templateName) {
    var nextTemplate = app.templates.get(templateName);
    $('body').html(nextTemplate());
    $('.search-key').keyup(function() {
        $(this).val(); // get the current value of the input field.
        app.EventSearch()
    });
}

app.EventSearch = function (service) {

    var listItemTemplate = app.templates.get("eventListItem");

    this.initialize = function () {
        this.findByName();
    };

    this.findByName = function () {
        var search_field_value = $('.search-key').val();
        app.productAdapter.findByName(search_field_value).done(function (events) {
            $('.event-list').html(listItemTemplate(events));
        });
        if (search_field_value == "") {
            $('.event-list').html("")
        }
    };

    this.initialize();
};