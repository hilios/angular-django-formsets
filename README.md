angular-django-formset
======================

[![Build Status](https://travis-ci.org/hilios/angular-formsets.png?branch=master)](https://travis-ci.org/hilios/angular-formsets)

A set of AngularJS directives to easily manage Django Formsets (add and remove) into front-end.

## Usage

Add the `ngDjangoFormset` module to your Angular application:

```
angular.module('app', ['ngDjangoFormset']);
```

Given you have a template with local variable `formset` that is an instance of `BaseFormSet` (usualy created by the factory `formset_factory`):

```html
<form method="post">{% csrf_token %}
  <div formset="template.html">
    {{formset.management_form}}
    <div formset-container>
      {% for form in formset %}
      <div formset-child>
        {{form.as_p}}
        <button formset-remove>Remove</button>
      </div>
      {% endfor %}
    </div>
    <button formset-add>Add</button>
  </div>
  <button type="submit">Submit</button>
</form>
<!-- template.html -->
{% with form=formset.empty_form %}
<script type="text/ng-template" id="template.html">
<div formset-child>
  {{form.as_p}}
  <button formset-remove>Remove</button>
</div>
</script>
{% endwith %}
```

## Bult-in directives

```
formset="{template}.html"
formset-child
formset-add
formset-remove

# Modifiers
formset-prefix
formset-can-delete
formset-can-order
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
