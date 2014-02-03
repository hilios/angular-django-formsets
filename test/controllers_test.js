describe('djangoFormsetController', function(){

  var controller, attrs = {
    djangoFormset: '_formset_template.html',
    djangoFormsetPrefix: 'foo',
    djangoFormsetCanDelete: true,
    djangoFormsetCanOrder: true
  };

  beforeEach(inject(function($controller, $templateCache) {
    $templateCache.put(attrs.djangoFormset, 
      '<div data-fid="__prefix__">Foo Bar</di>');

    controller = $controller('djangoFormsetController', {$attrs: attrs});
  }));

  it('should define a controller', function() {
    expect(controller).to.be.defined;
  });

  describe('#setup(element)', function() {
    it('should set the __formset__ container element');
    it('should set the __template__');
    it('should find the highest __fid__ from the formset`s children');
    it('should find the __totalforms__ element');
    it('should find the __minforms__ element');
    it('should find the __maxforms__ element');

    it('should raise and error if __totalforms__ is not defined');
    it('should raise and error if __minforms__ is not defined');
    it('should raise and error if __maxforms__ is not defined');
  });

  describe('#update()', function() {
    it('should update __totalforms__ value with current children length');
  });

  describe('#addFormset()', function() {
    it('should increase __fid__');
    it('should replace any __prefix__ in the template with __fid__ value');
    it('should append/compile a new formset children to the container');
    it('should not add if __maxforms__ is reached');
  });

  describe('#removeFormset(element)', function() {
    it('should remove formset children from the container');
    it('should find the children container with prefix data-*');
    it('should find the children container with prefix x-*');
    it('should hide formeset children and set delete input if __candelete__');
  });

  describe('#registerChild(element)', function() {
    it('should add a children and update');
  });

  describe('#destroyChild', function() {
    it('should remove a children and update');
  });
});
