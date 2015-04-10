$(function() {
  window.ZipcodeApp = {};
  // Backbone Model, Collection, View
  var Zipcode = window.ZipcodeApp.Zipcode = Backbone.Model.extend({});
  var Zipcodes = window.ZipcodeApp.Zipcodes = Backbone.Collection.extend({
    url: "./db/zipcodes.json",
    model: Zipcode
  });
  var ZipcodeView = window.ZipcodeApp.ZipcodeView = Backbone.View.extend({
    initialize: function(options) {
      this.allZipcodes = options.allZipcodes;
      this.query = options.query;
      this.render();
    },

    events: {
      'keyup input#zipcode': 'submit'
    },

    submit: function(event) {
      var query = $(event.currentTarget).val();

      // matching zip code format (i.e., 5 digits)
      if (/^\d{5}$/.test(query)) {
        this.query = query;
        this.render();
      }
    },

    render: function() {
      var info = null;

      if (this.query) {
        this.allZipcodes.forEach(function (areaInfo) {
          if (areaInfo.get('zipcode') === parseInt(this.query)) {
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

    success: function() {
      var zipcodeView = new ZipcodeView({
        el: $('#area'),
        allZipcodes: AllZipcodes
      });
      console.info("      ZIP codes data are successfully fetched.");
    },

    error: function() {
      console.error("Error: fetch fails.");
    }
  });
});
