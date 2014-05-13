describe('ngDjangoFormset.directives', function() {
  var $scope, $compile, formset, container,
    childTemplate = '<li formset-child data-fid="__prefix__">' +
      '<!-- Child --></li>';

  beforeEach(module('ngDjangoFormset'));

  beforeEach(inject(
    function($rootScope, _$compile_, $templateCache) {
      $scope = $rootScope.$new();
      // Cache the template
      $templateCache.put('formset-child.html', childTemplate);
      // Setup HTML
      totalFormsInput = angular.element('<input name="form-TOTAL_FORMS" ' +
        'value="0">');
      container = angular.element('<ul formset-container></ul>');
      // Build the formset
      formset = angular.element('<div formset="formset-child.html"></div>');
      formset.append(totalFormsInput);
      formset.append(container);
      // Create a compiler
      $compile = _$compile_;
      $compile(formset)($scope);
    }
  ));

  describe('formset', function() {
    it('should create the an isolate scope', function() {
      expect(formset.isolateScope()).to.be.ok;
    });

    it('should have a container', function() {
      expect(formset).to.have(container);
    });
  });

  describe('formset-container', function() {
    it('should share the same scope from formset', function() {
      expect(container.scope()).to.be.equal(formset.scope());
    });
  });

  describe('formset-child', function() {
    var child;

    beforeEach(function() {
      child = angular.element(childTemplate);
      container.append(child);
      $compile(child)($scope);
    });

    it('should be a child of container', function() {
      expect(container).to.have(child);
    });

    it('should update (add 1) TOTAL_FORMS count when added', function() {
      expect(child).to.exist;
      expect(totalFormsInput).to.have.value('1');
    });

    it('should update (subtract 1) TOTAL_FORMS count when removed', function() {
      child.remove();
      expect(container).to.not.have(child);
      expect(totalFormsInput).to.have.value('0');
    });
  });

  describe('formset-add', function() {
    var addButton;

    beforeEach(function() {
      addButton = angular.element('<button formset-add></button>');
      formset.append(addButton);
      $compile(addButton)($scope);
    });

    it('should add a formset child to container on click', function() {
      expect(container).to.not.have('li[formset-child]');
      addButton.click();
      expect(container).to.have('li[formset-child]');
    });

    it('should update (add 1) TOTAL_FORMS count on click', function() {
      addButton.click();
      expect(totalFormsInput).to.have.value('1');
    });

    it('should have replaced __prefix__ to the formeset id', function() {
      var child;
      addButton.click();
      expect(container.find('li')).to.have.data('fid').to.match(/^[0-9]+$/);
    });
  });

  describe('formset-remove', function() {
    var removeButton;

    beforeEach(function() {
      removeButton = angular.element('<button formset-remove></button>');
      // Setup remove button inside a child
      child = angular.element(childTemplate);
      child.append(removeButton);
      container.append(child);
      // Compile a child
      $compile(child)($scope);
    });

    it('should remove child when clicked', function() {
      expect(container).to.have('li[formset-child]');
      removeButton.click();
      expect(container).to.not.have('li[formset-child]');
    });

    it('should update (take away 1) TOTAL_FORMS count on click', function() {
      removeButton.click();
      expect(totalFormsInput).to.have.value('0');
    });
  });
});
