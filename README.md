angular-django-formets
======================

[![Build Status](https://travis-ci.org/hilios/angular-django-formsets.png?branch=master)](https://travis-ci.org/hilios/angular-django-formsets)

A set of AngularJS directives to easily manage Django Formsets into front-end.

## Usage

Add the `djangoFormsets` module to your Angular application:

```
angular.module('myApp', ['djangoFormsets']);
```

Given you have a template with local variable `formset` that is an instance of `BaseFormSet` (usualy created by the factory `formset_factory`):

```html
<form method="post">{% csrf_token %}
  <div django-formset="template.html">
    {{formset.management_form}}
    <div django-formset-container>
      {% for form in formset %}
      <div django-formset-child>
        {{form.as_p}}
        <button django-formset-remove>Remove</button>
      </div>
      {% endfor %}
    </div>
    <button django-formset-add>Add</button>
  </div>
  <button type="submit">Submit</button>
</form>
<!-- template.html -->
{% with form=formset.empty_form %}
<script type="text/ng-template" id="template.html">
<div django-formset-child>
  {{form.as_p}}
  <button django-formset-remove>Remove</button>
</div>
</script>
{% endwith %}
```

## Bult-in directives

```
django-formset="{template}.html"
django-formset-child
django-formset-add
django-formset-remove

# Modifiers
django-formset-prefix
django-formset-can-delete
django-formset-can-order
```

## Python

Given the django formset:

```python
from django import forms
from django.shortcuts import render, redirect
from django.forms.formsets import formset_factory
 
class SimpleForm(forms.Form):
    name = forms.CharField()
    email = forms.EmailField()
 
SimpleFormSet = formset_factory(SimpleForm, extra=2, can_delete=True)

def main(request):
    formset = SimpleFormSet(request.POST or None, prefix="foo")

    if form.is_valid() and formset.is_valid():
        return redirect('/')
 
    return render(request, 'template.html', {'formset': formset})
```