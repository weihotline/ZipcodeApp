describe('DOM', function() {
  describe('#container', function() {
    var container = document.getElementById('container'),
      area = document.getElementById('area');

    describe('Layout check', function() {
      it('should have container div', function() {
        expect(container).to.not.be.null;
      });

      it('should have area div', function() {
        expect(area).to.not.be.null;
      });
    });
  });
});
