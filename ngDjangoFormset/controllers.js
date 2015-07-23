angular.module('ngDjangoFormset')
.controller('ngDjangoFormsetCtrl', [
  '$attrs', '$templateCache', '$compile',
  function($attrs, $templateCache, $compile) {
    var self = this;

    self.__fid__ = 0;
    self.__children__ = [];
    self.__template__ = $templateCache.get($attrs.formset) || '';
    self.__formsetprefix__ = $attrs.formsetPrefix || 'form';
    self.__candelete__ = $attrs.formsetCanDelete || false;
    self.__canorder__ = $attrs.formsetCanOrder || false;
    self.__on_add__ = $attrs.onAdd || null;
    self.__on_remove__ = $attrs.onRemove || null;

    self.__formset__ = null;
    self.__container__ = null;
    self.__totalforms__ = null;
    self.__minforms__ = 0;
    self.__maxforms__ = 1000;

    self.setup = function(element) {
      self.__formset__ = element;
      // Removes leading whitespaces from template, hence jqLite can't
      // parse the element with them.
      if(self.__template__) {
        self.__template__ = self.__template__.replace(/^(\s|\n|\t){1,}/gi, '');
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
      // If template wasn't found throw an error
      if(!self.__template__) {
        throw new SyntaxError("Template not found");
      }
      // If __totalforms__ input wasn't found throw an error
      if(!self.__totalforms__) {
        throw new SyntaxError("Could't find formset TOTAL_FORMS input, " +
          "check if you printed {{formset.management_form}}");
      }
      // If __container__ wans't set throw an error
      if(!self.__container__) {
        throw new SyntaxError("Formset container cound't be found, " +
          "please add formset-container to a child element");
      }
      self.update();
    }

    self.setupContainer = function(element) {
      self.__container__ = element;
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
	if(self.__on_add__!==null)
	  self.callExtFunction(self.__on_add__);
        return element;
      }
    }

    self.removeFormset = function(element) {
      if(self.__children__.length > self.__minforms__) {
        var child = element,
          isChild = function(child) {
            return child.attr('formset-child') !== undefined ||
              child.attr('data-formset-child') !== undefined ||
              child.attr('x-formset-child') !== undefined;
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
	  if(self.__on_remove__!==null)
	    self.callExtFunction(self.__on_remove__);

        }
        return child;
      }
    }

    self.callExtFunction = function(fname) {
      if(self.__formset__.scope()[fname]) {
	if(typeof(self.__formset__.scope()[fname])=='function')
	  self.__formset__.scope()[fname](self);
      } else {
	fn = window[fname];
	if(typeof fn === 'function')
	  fn.apply(null, [self]);
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
