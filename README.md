<p align="center">
  <img
		style="object: contain; height: 150px"
		src="https://i.imgur.com/DuZQ24q.png"
	/>
</p>

## Things: To-Do List

Simple task manager developed using [VueJS](https://vuejs.org) on the frontend, and [Firebase](https://firebase.google.com) on the backend.

### Demo

[**Things - To-Do List**](https://astonishing-meringue-7e1211.netlify.app)

### Implementation notes

#### Layout

The application layout was developed with the massive use of [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layou) for diagramming and adaptation to various screen sizes. The style was in charge of [Sass](https://sass-lang.com) (variables, mixins and nested selectors) along with the [BEM](https://en.bem.info) methodology to structure and contextualize the CSS classes.

#### Data flow

The application has a very simple flow, which involves: Application View, [Vuex](https://vuex.vuejs.org) (global state) and the [Realtime Database](https://firebase.google.com/docs/database). Below the flowchart represents how this flow occurs:

<p align="center">
  <img src="https://i.ibb.co/BrszKqn/flowchart.png" width="100%" height="auto" align="center" />
</p>

#### Auto database cleaning

When accessing the application, the user receives an ``id`` that will be used so that it can be uniquely identified by the [Realtime Database](https://firebase.google.com/docs/database). The ``id`` is located in localStorage, so for each browser the user will have a different ``id``.

To avoid overloading the database, every time the user ``id`` is changed or removed in localStorage, the [Realtime Database](https://firebase.google.com/docs/database) will be notified to delete the old user's data, so the database will not persist data from users that no longer exist.

#### Service Worker

A simple Service Worker has been implemented to cache assets and also allows the application to work offline.

#### PWA

The application is also a PWA and can be installed on devices.

### License

[MIT](https://github.com/glhrmoura/things/blob/main/LICENSE)

Copyright (c) Guilherme Moura
