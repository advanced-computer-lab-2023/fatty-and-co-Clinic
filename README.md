
# Shebeen Health Clinic

This project is a virtual clinic website for remotely booking and holding medical appointments.


![Logo](https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Menoufia_Governorate.PNG)


## Motivation

The motivation behind the Shebeen Health Clinic project is to provide a seamless and efficient way for patients to book and attend medical appointments remotely. In the era of digital transformation, healthcare should not be left behind. This project aims to bring convenience to patients, allowing them to consult with healthcare professionals without the need to travel. This would be especially beneficial in case the global situation requires social distancing once again. Furthermore, it provides a streamlined platform for healthcare providers to manage appointments and consult with patients, making healthcare more accessible and efficient.

## Build Status

[include all missing or broken requirements here]

## Code Style

This project adheres to certain coding conventions for consistency and readability. Here are some of the key points:

- **Indentation:** We use 2 spaces for indentation. No tabs are allowed.
- **Semicolons:** Every statement should be ended with a semicolon.
- **Quotes:** Use single quotes for strings except to avoid escaping.
- **Naming Convention:** We use camelCase for variable and function names, and PascalCase for component/class names.
- **Braces:** Opening braces go on the same line as the statement.
- **Variable Declaration:** Always use `let` or `const` to declare variables. Don't use `var`.

We use [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to make sure formatting is proper and [ESLint](https://eslint.org/) with the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) to enforce these conventions. Before committing any code, make sure to run ESLint to check for and fix any style issues.

To run ESLint, use the following command:

```bash
npm run lint
```

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**FrontEnd:** React, ChakraUI

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

To run tests, run the following command

```bash
  npm run test
```


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

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Authors

- [@ZeyadHabash](https://github.com/ZeyadHabash)
- rest of authors here


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

