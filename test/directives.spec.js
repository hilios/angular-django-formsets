describe('djangoFormsets.directives', function() {
  var formset, container, controller;

  beforeEach(inject(function($rootScope, $compile, $templateCache) {
    $templateCache.put('template.html', 'Foo Bar');
    // Register a controller
    container = angular.element('<ul django-formset-container>container</ul>');
    formset = angular.element('<div django-formset="template.html"></div>');
    formset.append('<input name="form-TOTAL_FORMS" value="0">');
    formset.append(container);
    $compile(formset)($rootScope);
    // Grab the controller
    controller = formset.controller('djangoFormset');
  }));
  
  describe('django-formset', function() {
    it('should create the controller', function() {
      expect(controller).to.be.ok;
    });

    it('should setup the controller with element', function() {
      expect(controller.__formset__.html()).to.be.equal(formset.html());
    });
  });

  describe('django-formset-container', function() {
    it('should set the __container__ on controller with element', function() {
      expect(controller.__container__).to.be.defined;
      expect(controller.__container__.html()).to.be.equal(container.html());
    });
  });

  describe('django-formset-child', function() {
    var child, registerChildFn;

    beforeEach(inject(function($rootScope, $compile) {
      registerChildFn = sinon.spy(controller, 'registerChild');
      child = angular.element('<li django-formset-child></li>');
      container.append(child);
      $compile(child)($rootScope);
    }));

    it('should register child on the controller', function() {
      expect(registerChildFn.called).to.be.ok;
    });
  });

  describe.skip('django-formset-add', function() {
    var addButton;

    beforeEach(inject(function($rootScope, $compile) {
      addButton = angular.element('<button django-formset-add></button>');
      formset.append(addButton);
      $compile(addButton)($rootScope);
    }));

    it('should add a formset child uppon click', function() {
      var addChildFn = sinon.spy(controller, 'addFormset');
      addButton.triggerHandler('click');
      expect(addChildFn.called).to.be.ok;
    });

    it('should remove the event click when destroyed', function() {
      // var addChildFn = sinon.spy(controller, 'addFormset');
      // addButton.scope().$destroy();
      // addButton.triggerHandler('click');
      // expect(addChildFn.called).to.not.be.ok;
    });
  });

  describe.skip('django-formset-remove', function() {
    it('should register a click callback');
    it('should remove current fomset child on the controller');
    it('should remove event click when destroyed');
  });
});
