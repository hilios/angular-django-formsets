describe('djangoFormsets.directives', function() {
  
  describe('django-formset', function() {
    it('should setup the controller with element');
  });

  describe('django-formset-container', function() {
    it('should set the __container__ on controller with element');
  });

  describe('django-formset-child', function() {
    it('should register child on the controller');
  });

  describe('django-formset-add', function() {
    it('should register a click callback');
    it('should add a formset child on the controller');
    it('should remove the event click when destroyed');
  });

  describe('django-formset-remove', function() {
    it('should register a click callback');
    it('should remove current fomset child on the controller');
    it('should remove event click when destroyed');
  });
});