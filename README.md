# Sync this fork with the upstream repo

```
git remote add upstream git@github.com:retejs/rete.git
git fetch upstream
git checkout master
git rebase upstream/master
git push -f origin master
```

Introduction
----
**Rete** is a modular framework for visual programming. **Rete** allows you to create node-based editor directly in the browser. You can define nodes and workers that allow users to create instructions for processing data in your editor without a single line of code.

Documentation
----
Check the [docs](https://rete.js.org/#/docs) and learn about the components and capabilities.

Examples
----
[Flow-based programming](https://codepen.io/Ni55aN/pen/xzgQYq)

[Events (tasks)](https://codepen.io/Ni55aN/pen/MOYPEz)

[Modules](https://codepen.io/Ni55aN/pen/QOEbEW)

[Programming a Messenger Bot](https://codepen.io/Ni55aN/pen/rpOKNb)

[3D Car configurator](https://codesandbox.io/embed/9jp88p1jpy?view=preview)

License
----
[MIT](http://opensource.org/licenses/MIT)

[Donate](http://rete.js.org/#support)
---
