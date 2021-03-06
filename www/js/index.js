/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        // Collects all known event data
        app.eventAdapter.getEventData();
        // Loads the required template screens
        app.templates.load("homeScreen", "searchScreen", "eventListItem", "eventScreen", "eventScreen_run").done(function () {
            app.HomeView();
        });
        $(window).on('hashchange', this.route);
        this.bindEvents();
    },
    route: function () {
        var hash = window.location.hash;
        app.getViewDetails(hash);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        FastClick.attach(document.body);
        if (navigator.notification) {
        // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,        // message
                    null,           // callback
                    "My Next Race", // title
                    'OK'            // buttonName
                );
            };
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    buttonPress: function() {
        alert("Help is on the way....");
    },
    getViewDetails: function(hash) {
        var templateName = hash.replace('#','');
        var args = templateName.split("/");
        this.getNextView(args)
    },
    getNextView: function (args) {
        // Collect the view name we need from the arguments provided
        var viewName = args[0];
        // Now that we have the view name, we no longer need it within
        // the provided arguments, so lets remove it.
        args.splice(0, 1);
        // find object
        var fn = window[viewName];
        // is object a function?
        if (typeof fn === "function") fn(viewName, args);
    }
};

Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});
