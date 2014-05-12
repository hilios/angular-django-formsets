angular.module('ngDjangoFormset')
.directive('formset', function() {
  return {
    require: 'formset',
    restrict: 'A',
    scope: {},
    controller: 'ngDjangoFormsetCtrl',
    link: function postLink(scope, element, attrs, controller) {
      controller.setup(element);
    }
  };
})
.directive('formsetContainer', function() {
  return {
    require: '^formset',
    restrict: 'A',
    link: function postLink(scope, element, attrs, controller) {
      controller.setupContainer(element);
    }
  };
})
.directive('formsetChild', function() {
  return {
    require: '^formset',
    restrict: 'A',
    scope: true,
    link: function postLink(scope, element, attrs, controller) {
      controller.registerChild(element);
      element.on('$destroy', function() {
        controller.destroyChild(element);
      });
    }
  };
})
.directive('formsetAdd', function() {
  return {
    require: '^formset',
    restrict: 'A',
    link: function postLink(scope, element, attrs, controller) {
      element.on('click', function(event) {
        event.preventDefault();
        controller.addFormset();
      });
      element.on('$destroy', function() {
        element.off('click');
      });
    }
  };
})
.directive('formsetRemove', function() {
  return {
    require: '^formset',
    restrict: 'A',
    link: function postLink(scope, element, attrs, controller) {
      element.one('click', function(event) {
        event.preventDefault();
        controller.removeFormset(element);
      });
    }
  };
});
