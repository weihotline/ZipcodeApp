describe('DOM', function() {
  describe('#area', function() {
    var AllZipcodes, $inputTag, $pTags;

    before(function(done) {
      AllZipcodes = new window.ZipcodeApp.Zipcodes;
      AllZipcodes.fetch({
        success: function() {
          done();
          $inputTag = $('#zipcode');
          $pTags = $('#area p');
        }
      });
    });

    describe('Layout check', function() {
      it('should have zip code text input tag', function() {
        expect($inputTag.length).to.equal(1);
      });

      it('shoud have two p tags', function() {
        expect($pTags.length).to.equal(2);
      });
    });

    describe('City and State check', function() {
      var $stateP, $cityP;

      beforeEach(function() {
        this.timeout(3000);
      });

      describe('input: 00000', function() {
        it('should be blank', function() {
          var zipcodeView = new window.ZipcodeApp.ZipcodeView({
            el: $('#area'),
            query: "00000",
            allZipcodes: AllZipcodes
          });

          zipcodeView.render();

          $stateP = $('#area p:first-of-type');
          $cityP = $('#area p:last-of-type');

          expect($stateP.text()).to.equal("State: ");
          expect($cityP.text()).to.equal("City: ");
        });
      });

      describe('input: ABCDE', function() {
        it('should be blank', function() {
          var zipcodeView = new window.ZipcodeApp.ZipcodeView({
            el: $('#area'),
            query: "ABCDE",
            allZipcodes: AllZipcodes
          });

          zipcodeView.render();

          $stateP = $('#area p:first-of-type');
          $cityP = $('#area p:last-of-type');

          expect($stateP.text()).to.equal("State: ");
          expect($cityP.text()).to.equal("City: ");
        });
      });

      describe('input: 10001', function() {
        it('should output: State: NY, City: New York', function() {
          var zipcodeView = new window.ZipcodeApp.ZipcodeView({
            el: $('#area'),
            query: "10001",
            allZipcodes: AllZipcodes
          });

          zipcodeView.render();

          $stateP = $('#area p:first-of-type');
          $cityP = $('#area p:last-of-type');

          expect($stateP.text()).to.equal("State: NY");
          expect($cityP.text()).to.equal("City: New York");
        });
      });

      describe('input: 94134', function() {
        it('should output: State: CA, City: San Francisco', function() {
          var zipcodeView = new window.ZipcodeApp.ZipcodeView({
            el: $('#area'),
            query: "94134",
            allZipcodes: AllZipcodes
          });

          zipcodeView.render();

          $stateP = $('#area p:first-of-type');
          $cityP = $('#area p:last-of-type');

          expect($stateP.text()).to.equal("State: CA");
          expect($cityP.text()).to.equal("City: San Francisco");
        });
      });
    });
  });
});
