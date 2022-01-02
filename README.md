<h1 align="center">Platley</h1>

[View the live project here.]()

ecommerce site to buy house plants

<img src="" alt=""/>

<br/>
<br/>
<br/>

## User Experience (UX)

<hr>

### User stories

### Design

- #### Typography and Colour Scheme

  - In this project, [Materialize V1.0.0](https://materializecss.com/) was used to create a responsive front-end. The default typography was used, while [colour palette](https://materializecss.com/color.html) teal, with different shades, were used for the colour scheme.

- #### Logo
  -
- #### Favicon

  -

- #### Animations
  -

### Wireframes

- xx

<br>
<br>

## Database architecture

<hr>

<br>
<br>

## Features

<hr>

### xxxxxx

<br>

### xxxxxxx

- <br>

### xxxxxx

<br>

### xxxxxxxx

<br>

### xxxxxxx

### xxxxxxxxx

<br>

### Accessibility

- modal exits with escape
- modal has a screen reader label
- you can tab into the form

Ensure accessibility throughout the website by:

- Adding 'alt' text on all images.
- Font awesome icons are in an `<i>` tag. A span with a class "sr-only" is added which describes the icons. The "sr-only" class has a display:none in the stylesheet, which hides the text on screen, but allows for screenreader to be read.

<br/>

## Technologies Used

<hr>

The following technologies have been used in this project:

- React

- SASS

- [Heroku](https://heroku.com/)
  - Used to deploy the project.
- [HTML](https://www.w3.org/TR/html52/)
  - Used to structure and presenting the web content.
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
  - Used to make the website interactive.
- [FontAwesome](https://fontawesome.com/)
  - Font Awesome was used throughout the website to add icons for better aesthetic and UX purposes. <br/><br/>

## Technologies Used

### Languages Used

- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
- [Python 3.8.2](https://www.python.org/download/releases/3.0/)
  - Python was used to implement a back-end, by creating the CRUD functionality.
- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)

### Frameworks, Libraries & Programs Used

BE

- Django
- [Django REST framework](https://www.django-rest-framework.org/)
- Pillow - image processing library
- Django cors headers https://pypi.org/project/django-cors-headers/

FE

- [React](https://reactjs.org/)
- axios
- react-query
- MSW for testing

  - Using React for my project was pre-approved by my mentor, Narender Singh, with the permission from Code Institute.
  - React is a JavaScript library used for building user interfaces through encapsulated components that manage their own state.

  To create a React project, run:

  ```
  npx create-react-app frontend
  cd frontend
  yarn start
  ```

- [SASS](https://sass-lang.com/)

  - Sass is a stylesheet language that’s compiled to CSS. It allows you to use variables, nested rules, mixins, functions, and more, all with a fully CSS-compatible syntax. Sass helps keep large stylesheets well-organized and makes it easy to share design within and across projects.

  To add a SASS stylesheet, run:

  ```
  yarn add node-sass
  ```

- [ES Lint](https://eslint.org/) and [Prettier](https://github.com/prettier/prettier)

  - ESLint was used to statically analyze the code to quickly find problems. It enforces good code-quality.
  - Prettier was used to automatically format the code as it is saved to mitigate code errors/conflicts.

  To install these dependencies, run:

  ```
  npm i --save-dev eslint@6.8.0 prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hook
  ```

  Modify `package.json`

  ```
  {
    "scripts": {
  ... add the following two line
        "lint": "eslint --fix .",
        "lint-check": "eslint ."
    }
  }
  ```

  To configure the linter, create a file named `.eslintrc.js` at the root of the project with the following:

  ```
  module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['/node_modules/**', '/build/**'],
  rules: {
    'no-unused-vars': ['warn', { args: 'none', argsIgnorePattern: 'req|res|next|val' }],
    'prettier/prettier': ['error'],
  },  settings: {
    react: {
      version: 'detect',
    },
  },
  };
  ```

- [Axios](https://github.com/axios/axios)

  - Axios is a JavaScript library that allows making an HTTP request, and an alternative to the .fetch()
  - Some of the advantages of using axios over the fetch method are that axios performs automatic transforms of JSON data and has better browser support compared to the fetch method.

  To install, run:

  ```
  npm install axios
  ```

- [react-router-dom](https://reactrouter.com/web/guides/quick-start)

  - React is single page application. react-router-dom library allows for the application to navigate between different components, changing the browser URL, modifying the browser history, and keeping the UI state in sync.

  To install:

  ```
  npm install react-router-dom
  ```

## Testing

<hr>

The W3C Markup Validator and W3C CSS Validator Services were used to validate every page of the project to ensure there were no syntax errors in the project.

- [W3C Markup Validator](https://validator.w3.org/#validate_by_uri) <br>

added on `<section>` tags, with a class name of `sr-only` so it does not appear on the page and not change the current UI, but avoid the warning.

- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_uri) <br>

1. The following errror appeared:

<br>
<br>

<br>

### During the development, the following issues were encountered:

### Manual testing were also performed to ensure that the application works as intended. During this, the following errors were found and were rectified:

1. Loading and error page are shown at the same time
   - condition was changed so that error is only shown if loading is false already.
   - there are times that there was error, saved in cache, therefore it's true
   - refetching item again therefore loading
   - putting the condition of not loading and error true covers this
2.

<br>

2. xxxxxxxx

<br>

3. xxxxxxxx

<br>

4. xxxxxxxxxxx

<br>

## Deployment

<hr>

### Heroku

1. Create a heroku account. Create a new app and select your region.
2. Prepare the local workspace for Heroku. Create a `requirements.txt` file by:
   ```
   pip3 freeze --local > requirements.txt
   ```
3. Create a Procfile
   ```
   echo web: python app.py > Procfile
   ```
4. Setup the configuration variables in heroku, by: <br>
   IP = 0.0.0.0 <br>
   PORT = 5000 <br>
   MONGO_URI = mongo_db_uri <br>
   SECRET_KEY = your_secret_key <br>
   MONGO_DBNAME = your_database_name <br>

5. Connect the GitHub repository to the project and allow for automatic deployment.
   <br>
   <br>

### Forking the GitHub Repository

By forking the GitHub Repository we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original repository by using the following steps:

1. At the top of the Repository, above the "Settings" Button on the menu, locate the "Fork" Button.
2. You should now have a copy of the original repository in your GitHub account.

<br>
<br>

### Making a Local Clone

1. Under the repository name, click "Clone or download".
2. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
3. Open Git Bash.
4. Change the current working directory to the location where you want the cloned directory to be made.
5. Type `git clone`, and then paste the URL you copied in Step 2.

```
git clone https://github.com/USERNAME/REPOSITORY
```

## Credits

<hr>

### Code

- xxx
- xxx

### Content

- Background image from unsplash https://unsplash.com/photos/yb3hsmz4utg
- All content was written by the developer.

### Acknowledgements
