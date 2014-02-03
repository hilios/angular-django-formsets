angular.module('djangoFormsets').controller('djangoFormsetController', [
  '$attrs', '$templateCache', '$compile',
  function($attrs, $templateCache, $compile) {
    var self = this;

    self.__fid__ = 0;
    self.__children__ = [];
    self.__template__ = $templateCache.get($attrs.djangoFormset);
    self.__formsetprefix__ = $attrs.djangoFormsetPrefix || 'form';
    self.__candelete__ = $attrs.djangoFormsetCanDelete || false;
    self.__canorder__ = $attrs.djangoFormsetCanOrder || false;

    self.__formset__ = null;
    self.__container__ = null;
    self.__totalforms__ = null;
    self.__minforms__ = 0;
    self.__maxforms__ = 1000;

    self.setup = function(element) {
      self.__formset__ = element;
      // Removes leading whitespaces from template, hence jqLite fails can't
      // parse them.
      if(self.__template__) {
        self.__template__ = self.__template__.replace(/^(\s|\n){1,}/gi, '');
      }
      // Grab management form elements
      var fidRegexp = new RegExp(self.__formsetprefix__ +
          "\\-([0-9]{1,})", "i"),
        managementFormRegexp = new RegExp(self.__formsetprefix__ +
          "\\-([A-Z_]+)");
      // Find the higher __fid__
      angular.forEach(self.__children__, function(value, index) {
        var fid, inputName = value.find('input').prop('name');
        inputName = inputName.match(fidRegexp);
        if(inputName) {
          fid = parseInt(inputName[1]);
          if(fid > self.__fid__) {
            self.__fid__ = fid;
          }
        }
      });
      // Find formset management fields
      angular.forEach(element.find('input'), function(value, index) {
        var input = angular.element(value),
          match = input.prop('name').match(managementFormRegexp);
        if(match) {
          switch(match[1]) {
            case 'TOTAL_FORMS':
              self.__totalforms__ = input;
              break;
            case 'INITIAL_FORMS':
              self.__minforms__ = parseInt(input.val()) || self.__minforms__;
              break;
            case 'MAX_NUM_FORMS':
              self.__maxforms__ = parseInt(input.val()) || self.__maxforms__;
              break;
          }
        }
      });
      // If __totalforms__ input wasn't found throw an error
      if(!self.__totalforms__) {
        throw new SyntaxError("Could't find formset TOTAL_FORMS input, " +
          "check if you printed {{formset.management_form}}");
      }
      // If __container__ wans't set throw an error
      if(!self.__container__) {
        throw new SyntaxError("Formset container cound't be found, " +
          "please add django-formset-container to a child");
      }
    }

    self.update = function() {
      if(self.__totalforms__) {
        self.__totalforms__.val(self.__children__.length);
      }
    }

    self.addFormset = function() {
      if(self.__children__.length < self.__maxforms__) {
        self.__fid__ += 1;
        // Setup a new element from template
        var element = angular.element(
          self.__template__.replace(/__prefix__/gi, self.__fid__)
        );
        // Add the template to container and children's list
        self.__container__.append(element);
        // Compile after append to inherits controller
        $compile(element)(self.__formset__.scope() || {});
        return element;
      }
    }

    self.removeFormset = function(element) {
      if(self.__children__.length > self.__minforms__) {
        var child = element, 
          isChild = function(child) {
            return child.attr('django-formset-child') !== undefined ||
              child.attr('data-django-formset-child') !== undefined ||
              child.attr('x-django-formset-child') !== undefined;
          };
        // Find the child container
        while(!isChild(child) && child.prop('tagName') !== 'BODY') {
          child = child.parent(); 
        }
        if(child.prop('tagName') !== 'BODY') {
          try {
            child.scope().$destroy();
          } catch(error) {
            // ...
          } finally {
            child.remove();
          }
        }
        return child;
      }
    }

    self.registerChild = function(element) {
      self.__children__.push(element);
      self.update();
    }

    self.destroyChild = function(element) {
      var childIndex = self.__children__.indexOf(element);
      self.__children__.splice(childIndex, 1);
      self.update();
    }
  }
]);
