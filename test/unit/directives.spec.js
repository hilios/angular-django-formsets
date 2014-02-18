describe('djangoFormsets.directives', function() {
  var formset, container, controller, compile;

  beforeEach(inject(
    function($rootScope, $compile, $controller, $templateCache) {
      $templateCache.put('template.html', 'Foo Bar');
      // Setup HTML
      container = angular.element('<ul django-formset-container></ul>');
      formset = angular.element('<div django-formset="template.html"></div>');
      formset.append('<input name="form-TOTAL_FORMS" value="0">');
      formset.append(container);
      // Create a compiler
      $compile(formset)($rootScope);
      // Grab the controller
      controller = formset.controller('djangoFormset')
    }
  ));
  
  describe('django-formset', function() {
    var setupFn;

    beforeEach(function() {
      setupFn = sinon.spy(controller, 'setup');
    });

    it('should create the controller', function() {
      expect(controller).to.be.ok;
    });

    it('should setup the controller with element', function() {
      expect(controller.__formset__).to.be.defined;
      expect(controller.__formset__[0]).to.be.equal(formset[0]);
    });
  });

  describe('django-formset-container', function() {
    var setupContainerFn;

    beforeEach(inject(function($rootScope) {
      setupContainerFn = sinon.spy(controller, 'setupContainer');
    }));

    it('should inheriths the controller', function() {
      var inheritedController = container.controller('djangoFormset');
      expect(inheritedController).to.be.ok;
      expect(inheritedController).to.be.equal(controller);
    });

    it('should call setup container on controller with element', function() {
      expect(controller.__container__).to.be.defined;
      expect(controller.__container__[0]).to.be.equal(container[0]);
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

    it('should inheriths the controller', function() {
      var inheritedController = child.controller('djangoFormset');
      expect(inheritedController).to.be.ok;
      expect(inheritedController).to.be.equal(controller);
    });

    it('should register child on controller', function() {
      expect(registerChildFn.called).to.be.ok;
      // Check if the directive element was sent to method
      expect(registerChildFn.getCall(0).args[0][0]).to.be.equal(child[0]);
    });
  });

  describe('django-formset-add', function() {
    var addButton;

    beforeEach(inject(function($rootScope, $compile) {
      addButton = angular.element('<button django-formset-add></button>');
      formset.append(addButton);
      $compile(addButton)($rootScope);
    }));

    it('should inheriths the controller', function() {
      var inheritedController = addButton.controller('djangoFormset');
      expect(inheritedController).to.be.ok;
      expect(inheritedController).to.be.equal(controller);
    });

    it('should add a formset child uppon click', function() {
      var addChildFn = sinon.spy(controller, 'addFormset');
      addButton.click();
      expect(addChildFn.called).to.be.ok;
    });

    it('should remove the event click when destroyed', function() {
      var addChildFn = sinon.spy(controller, 'addFormset');
      addButton.remove();
      addButton.click();
      expect(addChildFn.called).to.not.be.ok;
    });
  });

  describe('django-formset-remove', function() {
    var removeButton;

    beforeEach(inject(function($rootScope, $compile) {
      removeButton = angular.element('<button django-formset-remove>' +
        '</button>');
      // Setup remove button inside a child
      child = angular.element('<li django-formset-child></li>');
      child.append(removeButton);
      container.append(child);
      // Create
      $compile(removeButton)($rootScope);
    }));

    it('should inheriths the controller', function() {
      var inheritedController = removeButton.controller('djangoFormset');
      expect(inheritedController).to.be.ok;
      expect(inheritedController).to.be.equal(controller);
    });

    it('should remove current fomset child on the controller', 
      function() {
        var removeChildFn = sinon.spy(controller, 'removeFormset');
        removeButton.click();
        expect(removeChildFn.called).to.be.ok;
      }
    );
    
    it('should only execute click once', function() {
      var removeChildFn = sinon.spy(controller, 'removeFormset');
      removeButton.click();
      removeButton.click();
      expect(removeChildFn.calledOnce).to.be.ok;
    });
  });
});
