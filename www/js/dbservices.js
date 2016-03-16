app.eventAdapter = (function () {

    "use strict";

    var all_events = [];
    var matched_events = [];
    var url="http://www.mynextrace.co.uk/load_events.php";

    var findById = function (id) {
            var deferred = $.Deferred(),
                product = null,
                l = all_events.length;
            for (var i = 0; i < l; i++) {
                if (all_events[i].uuid === id) {
                    product = all_events[i];
                    break;
                }
            }
            deferred.resolve(product);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred();
            filter_by_name(searchKey);
            deferred.resolve(matched_events);
            return deferred.promise();
        },

        findByCategory = function (event) {
            var deferred = $.Deferred();
            var results = all_events.filter(function (element) {
                if (element.category) {
                    return element.category.toLowerCase().match(event.toLowerCase());
                }
            });
            deferred.resolve(results);
            return deferred.promise();
        },
        findByCategoryAndName = function (event, searchKey) {
            var deferred = $.Deferred();
            var results_by_category = all_events.filter(function (element) {
                if (element.category) {
                    var events_by_type = element.category.toLowerCase().match(event.toLowerCase());
                    return element.category.toLowerCase().match(event.toLowerCase());
                }
            });
            var results = results_by_category.filter(function (element) {
                return element.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        get_event_data = function() {
            $.getJSON(url, function(result){
                all_events = result;
            });
        },

        filter_by_name = function(searchKey) {
            matched_events = all_events.filter(function (element) {
                return element.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
        };

    // The public API
    return {
        findById: findById,
        findByName: findByName,
        findByCategory: findByCategory,
        findByCategoryAndName: findByCategoryAndName,
        getEventData: get_event_data,
        filterByName: filter_by_name
    };

}());