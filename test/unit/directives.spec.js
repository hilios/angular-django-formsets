describe('ngDjangoFormset.directives', function() {
  var formset, container, controller;

  beforeEach(module('ngDjangoFormset'));

  beforeEach(inject(
    function($rootScope, $compile, $controller, $templateCache) {
      $templateCache.put('template.html', '<!-- No template -->');
      // Setup HTML
      container = angular.element('<ul formset-container></ul>');
      formset = angular.element('<div formset="template.html"></div>');
      formset.append('<input name="form-TOTAL_FORMS" value="0">');
      formset.append(container);
      // Create a compiler
      $compile(formset)($rootScope);
      // Grab the controller
      // controller = formset.controller('ngDjangoFormsetCtrl');
    }
  ));

  describe('formset', function() {
    it('should create the an isolate scope', function() {
      expect(formset.isolateScope()).to.be.ok;
    });
  });

  describe('formset-container', function() {
    it('should share the same scope from formset', function() {
      expect(container.scope()).to.be.equal(formset.scope());
    });
  });

  describe.skip('formset-child', function() {
    var child, registerChildFn, destroyChildFn;

    beforeEach(inject(function($rootScope, $compile) {
      child = angular.element('<li formset-child></li>');
      container.append(child);
      $compile(child)($rootScope);
    }));

    it('should inheriths the controller', function() {
      var inheritedController = child.controller('ngDjangoFormsetCtrl');
      expect(inheritedController).to.be.ok;
      expect(inheritedController).to.be.equal(controller);
    });

    it('should register child on controller', function() {
      expect(registerChildFn.called).to.be.ok;
      // Check if the directive element was sent to method
      expect(registerChildFn.getCall(0).args[0][0]).to.be.equal(child[0]);
    });

    it('should destroy child on controller uppon element remove', function() {
      child.remove();

      expect(destroyChildFn.called).to.be.ok;
      // Check if the directive element was sent to method
      expect(destroyChildFn.getCall(0).args[0][0]).to.be.equal(child[0]);
    });
  });

  describe.skip('formset-add', function() {
    var addButton;

    beforeEach(inject(function($rootScope, $compile) {
      addButton = angular.element('<button formset-add></button>');
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

  describe.skip('formset-remove', function() {
    var removeButton;

    beforeEach(inject(function($rootScope, $compile) {
      removeButton = angular.element('<button formset-remove>' +
        '</button>');
      // Setup remove button inside a child
      child = angular.element('<li formset-child></li>');
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
