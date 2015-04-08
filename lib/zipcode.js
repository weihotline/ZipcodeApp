$(function() {
  // Backbone Model, Collection, View
  var Zipcode = Backbone.Model.extend({});
  var Zipcodes = Backbone.Collection.extend({ model: Zipcode });
  var ZipcodeView = Backbone.View.extend({
    initialize: function(options) {
      this.allZipcodes = options.allZipcodes;
      this.query = 0;
      this.render();
    },

    events: {
      'keyup input#zipcode': 'submit'
    },

    submit: function(event) {
      var query = $(event.currentTarget).val();

      // matching zip code format (i.e., 5 digits)
      if (/^\d{5}$/.test(query)) {
        this.query = parseInt(query);
        this.render();
      }
    },

    render: function() {
      var info = null;

      if (this.query) {
        this.allZipcodes.forEach(function (areaInfo) {
          if (areaInfo.get('zipcode') === this.query) {
            info = areaInfo;
          }
        }.bind(this));
      }

      var templateFn = _.template( $('#area-template').html() );
      this.$el.html( templateFn( { info: info }) );

      return this;
    }
  });



  // initialze a new zip codes collection
  var AllZipcodes = new Zipcodes();
  // fetch zip codes collection and create the ZipcodeView only when it is fetched successfully
  AllZipcodes.fetch({
    url: "../db/zipcodes.json",

    success: function() {
      var newView = new ZipcodeView({
        el: $('#area'),
        allZipcodes: AllZipcodes
      });
      console.log("ZIP codes data are successfully fetched.");
    },

    error: function() {
      console.log("Error: fetch fails.");
    }
  });
});
