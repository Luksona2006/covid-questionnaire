# Covid Questionarie

Covid Questionarie is a web application where you should answer some questions (mostly about covid and its regulations) and send all answers to API

## About project

1. Created by [vite](https://vitejs.dev/guide/)
2. Fully writed with [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) (Vue 5.0.8)
3. Styled with [Tailwind CSS](https://tailwindcss.com/docs/installation)
4. ESLint for code quality
5. [Vuex](https://vuex.vuejs.org/installation.html) for store
6. [Prettier](https://prettier.io/docs/en/index.html) code formatter
7. [vee-validate](https://vee-validate.logaretm.com/v4/guide/overview/) package for validations

## Installation

Open terminal and write next line of code:

```sh
cd Desktop
```

```sh
git clone https://github.com/RedberryInternship/luka-bakuridze-covid-questionnaire.git
```

```sh
cd luka-bakuridze-covid-questionnaire
```

## File structure

### In src folder:

1. assets -> images and icons folder, images folder contains as its name says images, icons folder contains icons as components
2. components -> contains all necessary components that are widely used in whole project
3. config -> contains vee-validate folder and there you can see rules.js where are actually rules defined (and then imported to main.js to use it globally in application)
4. pages -> contains all pages
5. router -> contains index.js file where is all routes created
6. store -> contains index.js file (uses vuex package) where are defined states and mutations (only one for setting data in state and localStoragea at the same time)
7. index.css file which helps to use Tailwind CSS globally in application
8. main.js file where app is created

### In public folder:

1. fonts -> contains all fonts which are used in whole application
