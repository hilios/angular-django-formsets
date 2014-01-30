from setuptools import setup, find_packages

setup(
  name='angular-django-formsets',
  version='0.0.1',
  description='A set of AngularJS directive to manage Django Formsets',
  keywords='angularjs,angular,django,inline formsets, formsets',
  author='hilios',
  author_email='edson.hilios@gmail.com',
  url='http://hilios.github.io/angular-django-formsets',
  license='MIT',
  test_suite='tests',
  install_requires = [
    'django>=1.3',
  ],
  packages=find_packages(),
  include_package_data=True,
  zip_safe=False,
  )
