function searchScreen() {
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
        console.log("Key entered into field");
        app.productAdapter.findByName($('.search-key').val()).done(function (events) {
            $('.event-list').html(listItemTemplate(events));
        });
    };

    this.initialize();
};