/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have a defined URL and URL are not empty', function() {
            var i = 0;
            var allFeedsLength = allFeeds.length;
            for (; i < allFeedsLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* Loop through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have a defined name and are not empty', function() {
            var x = 0;
            var allFeedsLength = allFeeds.length;
            for (; x < allFeedsLength; x++) {
                expect(allFeeds[x].name).toBeDefined();
                expect(allFeeds[x].name.length).not.toBe(0);
            }
        });
    });


    /* Test suite named "The menu" */

    describe('The menu', function () {
        /* The menu element should be
         * hidden by default.
         */

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

         /* Make sure the menu changes
          * visibility when the menu icon is clicked.
          */

        describe('icon is clicked', function() {
            beforeEach(function() {
                 $('.menu-icon-link').trigger('click');
             });

            it('and the menu is visible', function() {
                expect($('body').hasClass('menu-hidden')).toBeFalsy();
            });

            it('again and menu is invisible', function() {
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
            });
        });
    });


    /* Test suite named "Initial Entries" */

    describe('Initial Entries', function() {
        /* Make sure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        /* Jasmine will wait 5 seconds by default to mark this async load
         * as successful
         */

        // We have to load a feed before the test
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('have been loaded', function() {
            expect($('.feed').children().length).toBeGreaterThan(0);
        });
    });



    /* Test suite named "New Feed Selection"*/

    describe('New Feed Selection', function() {
        /* Make sure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // setup two variables for two feeds
        var firstFeed, secondFeed;

        // load the first Feed

        beforeEach(function(done) {
            loadFeed(0, function() {

                firstFeed = $('.header h1')[0].innerText;
                // Call the done Callback function
                done();
            });
        });

        // Set back the feed to the first one
        afterEach(function(done) {
            loadFeed(0, done);
        });

        it('works, so that the content is changing', function(done) {
            loadFeed(1, function(){
                // load the second feed
                secondFeed = $('.header').find('h1')[0].innerText;
                // compare the two feeds
                expect(firstFeed).not.toEqual(secondFeed);
                // call the done callback function
                done();
            });
        });
    });
}());
