angular.module("djangoFormsets", []);

angular.module("djangoFormsets").controller("djangoFormsetController", [ "$attrs", "$templateCache", "$compile", function($attrs, $templateCache, $compile) {
    var self = this;
    self.__fid__ = 0;
    self.__children__ = [];
    self.__template__ = $templateCache.get($attrs.djangoFormset);
    self.__formsetprefix__ = $attrs.djangoFormsetPrefix || "form";
    self.__candelete__ = $attrs.djangoFormsetCanDelete || false;
    self.__canorder__ = $attrs.djangoFormsetCanOrder || false;
    self.__formset__ = null;
    self.__container__ = null;
    self.__totalforms__ = null;
    self.__minforms__ = 0;
    self.__maxforms__ = 1e3;
    self.setup = function(element) {
        self.__formset__ = element;
        if (self.__template__) {
            self.__template__ = self.__template__.replace(/^(\s|\n){1,}/gi, "");
        }
        var fidRegexp = new RegExp(self.__formsetprefix__ + "\\-([0-9]{1,})", "i"), managementFormRegexp = new RegExp(self.__formsetprefix__ + "\\-([A-Z_]+)");
        angular.forEach(self.__children__, function(value, index) {
            var inputName = value.find("input").prop("name"), fid;
            inputName = inputName.match(fidRegexp);
            if (inputName) {
                fid = parseInt(inputName[1]);
                if (fid > self.__fid__) {
                    self.__fid__ = fid;
                }
            }
        });
        angular.forEach(element.find("input"), function(value, index) {
            var input = angular.element(value), match = input.prop("name").match(managementFormRegexp);
            if (match) {
                switch (match[1]) {
                  case "TOTAL_FORMS":
                    self.__totalforms__ = input;
                    break;

                  case "INITIAL_FORMS":
                    self.__minforms__ = parseInt(input.val());
                    break;

                  case "MAX_NUM_FORMS":
                    self.__maxforms__ = parseInt(input.val());
                    break;
                }
            }
        });
    };
    self.update = function() {
        if (self.__totalforms__) {
            self.__totalforms__.val(self.__children__.length);
        }
    };
    self.addFormset = function() {
        if (self.__children__.length + 1 <= self.__maxforms__) {
            self.__fid__ += 1;
            var element = angular.element(self.__template__.replace(/__prefix__/gi, self.__fid__));
            self.__container__.append(element);
            $compile(element)(self.__formset__.scope());
        }
    };
    self.removeFormset = function(element) {
        if (self.__children__.length - 1 >= self.__minforms__) {
            var child = element, isChild = false;
            while (!isChild && child.prop("tagName") !== "BODY") {
                child = child.parent();
                isChild = child.attr("django-formset-child") !== undefined || child.attr("data-django-formset-child") !== undefined || child.attr("x-django-formset-child") !== undefined;
            }
            if (child.prop("tagName") !== "BODY") {
                child.scope().$destroy();
                child.remove();
            }
        }
    };
    self.registerChild = function(element) {
        self.__children__.push(element);
        self.update();
    };
    self.destroyChild = function(element) {
        var childIndex = self.__children__.indexOf(element);
        self.__children__.splice(childIndex, 1);
        self.update();
    };
} ]);

angular.module("djangoFormsets").directive("djangoFormset", function() {
    return {
        require: "djangoFormset",
        restrict: "A",
        scope: true,
        controller: "djangoFormsetController",
        link: function postLink(scope, element, attrs, controller) {
            controller.setup(element);
        }
    };
}).directive("djangoFormsetContainer", function() {
    return {
        require: "^djangoFormset",
        restrict: "A",
        link: function postLink(scope, element, attrs, controller) {
            controller.__container__ = element;
        }
    };
}).directive("djangoFormsetChild", function() {
    return {
        require: "^djangoFormset",
        restrict: "A",
        scope: true,
        link: function postLink(scope, element, attrs, controller) {
            controller.registerChild(element);
            scope.$on("$destroy", function() {
                controller.destroyChild(element);
            });
        }
    };
}).directive("djangoFormsetAdd", function() {
    return {
        require: "^djangoFormset",
        restrict: "A",
        link: function postLink(scope, element, attrs, controller) {
            element.on("click", function(event) {
                event.preventDefault();
                controller.addFormset(element);
            });
            scope.$on("$destroy", function() {
                element.off("click");
            });
        }
    };
}).directive("djangoFormsetRemove", function() {
    return {
        require: "^djangoFormset",
        restrict: "A",
        link: function postLink(scope, element, attrs, controller) {
            element.on("click", function(event) {
                event.preventDefault();
                controller.removeFormset(element);
            });
            scope.$on("$destroy", function() {
                element.off("click");
            });
        }
    };
});