describe('djangoFormsetController', function(){

  var controller, attrs = {
    djangoFormset: 'formset_template.html',
    djangoFormsetPrefix: 'foo',
    djangoFormsetCanDelete: true,
    djangoFormsetCanOrder: true
  };

  beforeEach(inject(function($controller, $templateCache) {
    $templateCache.put(attrs.djangoFormset, 
      '<div django-formset-child>Template</di>');

    controller = $controller('djangoFormsetController', {$attrs: attrs});
  }));

  it('should define a controller', function() {
    expect(controller).to.be.defined;
  });
});
