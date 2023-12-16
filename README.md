
# Project Title

A brief description of what this project does and who it's for


![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


## Motivation
## Build Status

- Project is in development stage
- unit tests are needed
- UI and UX need to be improved in several areas such as booking an appointment and viewing doctor requests
- [include all missing or broken requirements here]

## Code Style

This project adheres to certain coding conventions for consistency and readability. Here are some of the key points:

- **Indentation:** We use 2 spaces for indentation. No tabs are allowed.
- **Semicolons:** Every statement should be ended with a semicolon.
- **Quotes:** Use single quotes for strings except to avoid escaping.
- **Naming Convention:** We use camelCase for variable and function names, and PascalCase for component/class names.
- **Braces:** Opening braces go on the same line as the statement.
- **Variable Declaration:** Always use `let` or `const` to declare variables. Don't use `var`.

We use [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to make sure formatting is proper so make sure to use it when writing code.

### Design Pattern

The project follows the MVC design pattern ,MVC is a software architectural pattern commonly used for developing user interfaces that divide the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user , So the Files in the backend was divided into the M (models) where the schema of the models exist which represent the core of the database , the C (controller) where the functions needed for the routes exists and the V (views) the view in MERN stack is represented by the react frontend server.

## Screenshots

![App Screenshot](./screenshots/website/loginPage.jpg)
![App Screenshot](./screenshots/website/signupPage.jpg)
![App Screenshot](./screenshots/website/homePage.jpg)
![App Screenshot](./screenshots/website/profilePage.jpg)
![App Screenshot](./screenshots/website/chatPage.jpg)
![App Screenshot](./screenshots/website/viewDoctorsPage.jpg)
[include anything else here]

## Tech Stack

**FrontEnd:** React

**BackEnd:** Node, Express

**Server:** MongoDB


## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## Code Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Tests

To run jest tests, run the following command

```bash
  npm run test
```

The api routes were tested using postman , Postman is an application used for API testing. It is an HTTP client that tests HTTP requests, utilizing a graphical user interface, through which we obtain different types of responses that need to be subsequently validated. Postman offers many endpoint interaction methods. The following are some of the most used, including their functions:

    GET: Obtain information
    POST: Add information
    PUT: Replace information
    PATCH: Update certain information
    DELETE: Delete information

And we tested the behaviour of our routes and if they produce the correct status code and response according to our project flow .

Many testing routes were created to test the various API endpoints through postman. You can find these in [API_REFERENCE.md](API_REFERENCE.md)

## How To Use

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Credits

- [Readme Template](https://www.mygreatlearning.com/blog/readme-file/#Q5)
- [Frontend Template](https://www.creative-tim.com/product/purity-ui-dashboard)
- [Video Chat Provider JAAS](https://meet.jit.si/)
- [Best Mern Stack tutorial](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)
- [React Documentation](https://react.dev/)
- [Chakra UI Documentation](https://chakra-ui.com/docs/)
- [Template Documentation](https://demos.creative-tim.com/docs-purity-ui-dashboard/docs/)
- [MERN stack authentication + profile](https://www.youtube.com/playlist?list=PLr_bWRQ_9ePVfQwf0LorPwTlOZSBoPGIu)
- [Search Bar in React Tutorial - Cool Search Filter Tutorial](https://www.youtube.com/watch?v=x7niho285qs&list=PLs8AFNosNo41M5IvL5TdewlCzyOUrhDc1&index=16&t=1337s)
- [React: Add/Remove Input Fields Dynamically on button click](https://youtu.be/XtS14dXwvwE?list=PLs8AFNosNo41M5IvL5TdewlCzyOUrhDc1)
- [MERN Auth Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT)

## Authors

- [@octokatherine](https://www.github.com/octokatherine)


## License

[MIT](https://choosealicense.com/licenses/mit/)

MIT License

Copyright (c) 2023 [Fatty & co™]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Appendix

Any additional information goes here

