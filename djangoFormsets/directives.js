angular.module('djangoFormsets')
.directive('djangoFormset', function() {
  return {
    require: 'djangoFormset',
    restrict: 'A',
    scope: true,
    controller: 'djangoFormsetController',
    link: function postLink(scope, element, attrs, controller) {
      controller.setup(element);
    }
  };
})
.directive('djangoFormsetContainer', function() {
  return {
    require: '^djangoFormset',
    restrict: 'A',
    link: function postLink(scope, element, attrs, controller) {
      controller.setupContainer(element);
    }
  };
})
.directive('djangoFormsetChild', function() {
  return {
    require: '^djangoFormset',
    restrict: 'A',
    scope: true,
    link: function postLink(scope, element, attrs, controller) {
      controller.registerChild(element);
      scope.$on('$destroy', function() {
        controller.destroyChild(element);
      });
    }
  };
})
.directive('djangoFormsetAdd', function() {
  return {
    require: '^djangoFormset',
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
.directive('djangoFormsetRemove', function() {
  return {
    require: '^djangoFormset',
    restrict: 'A',
    link: function postLink(scope, element, attrs, controller) {
      element.one('click', function(event) {
        event.preventDefault();
        controller.removeFormset(element);
      });
    }
  };
});
