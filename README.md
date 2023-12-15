# Shebeen Health Clinic

This project is a virtual clinic website for remotely booking and holding medical appointments.

<img src="./frontend/src/assets/img/ShebeenElkom.png" width="200">

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

![App Screenshot](./screenshots/your-image-name.png)

## Tech Stack

**FrontEnd:** React, ChakraUI

**BackEnd:** Node, Express

**Server:** MongoDB

## Features

- **Patient Management:** Allows for the management of patient data, including personal information, medical history, and appointment scheduling.
- **Doctor Management:** Enables doctors to manage their profiles, set their availability, and view their upcoming appointments.
- **Appointment Scheduling:** Patients can book appointments with available doctors. Appointments can be easily rescheduled or cancelled.
- **Real-Time Video Consultations:** Patients can have virtual consultations with doctors through a secure and reliable video call feature.
- **Prescription Management:** Doctors can create, update, and delete prescriptions for patients. Patients can view their prescriptions anytime.
- **Health Records:** Patients can upload their health records which can be accessed by their doctors. This ensures doctors have all the necessary information to provide appropriate care.
- **Notifications:** Users receive notifications for important events such as upcoming appointments or prescription updates.
- **Payment System:** A secure payment system for patients to pay for their appointments or subscriptions.

## Code Examples

1. **Starting the server (backend/src/server.js):**

```javascript
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

2. **API Paths (frontend/src/API/api_paths.js):**

```javascript
const API_BASE = "http://localhost:8000/";
const PACKAGE_BASE = "http://localhost:8000/package/";
const DOCTOR_BASE = "http://localhost:8000/doctor/";
// ... more paths ...

export const API_PATHS = {
  // Guest
  docSignUp: `${GUEST_BASE}addRequest/`,
  updateEmail: `${GUEST_BASE}updateEmail/`,
  // ... more paths ...
};
```

3. **Custom Login Hook:**

```javascript
import axios from "axios";
import { API_PATHS } from "API/api_paths";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(API_PATHS.login, {
        Username: username,
        Password: password,
      });
      const json = JSON.stringify(res.data);
      localStorage.setItem("LocalStorageItemNameHere", json);
      dispatch({ type: "LOGIN", payload: res.data });
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
      return err.response;
    }
  };

  return { login, error, loading };
};
```

4. **Rescheduling a doctor's appointment**

```javascript
const reschedulePatient = async (req, res) => {
  try {
    const docUsername = req.user.Username;
    const { patientUsername, date } = req.body;
    const prevApp = await appointmentModel.findOne({
      DoctorUsername: docUsername,
      PatientUsername: patientUsername,
      Status: "Upcoming",
    });
    const reqDate = new Date(date);
    if (!prevApp) {
      res
        .status(404)
        .json({ err: "Patient wasn't scheduled for an upcoming appointment!" });
      return;
    } else if (
      prevApp.Date.getFullYear() == reqDate.getFullYear() &&
      prevApp.Date.getMonth() + 1 == reqDate.getMonth() + 1 &&
      prevApp.Date.getDate() + 1 == reqDate.getDate() + 1 &&
      prevApp.Date.getUTCHours() == reqDate.getUTCHours()
    ) {
      res.status(404).json({
        err: "You're rescheduling appointment on the same date it's scheduled on!",
      });
    } else {
      const patientApp = await appointmentModel.find({
        $or: [
          { PatientUsername: patientUsername, Status: "Upcoming" },
          { DoctorUsername: docUsername, Status: "Upcoming" },
        ],
      });
      const reqDate = new Date(date);
      let isBooked = false;
      for (const appReserved of patientApp) {
        if (
          reqDate.getFullYear() == appReserved.Date.getFullYear() &&
          reqDate.getMonth() + 1 == appReserved.Date.getMonth() + 1 &&
          reqDate.getDate() == appReserved.Date.getDate() &&
          reqDate.getUTCHours() == appReserved.Date.getUTCHours()
        ) {
          isBooked = true;
          break;
        }

        if (isBooked) {
          res
            .status(400)
            .json({ err: "There is another appointment booked on same date!" });
          return;
        } else {
          const updateAppOld = await appointmentModel.findOneAndUpdate(
            {
              PatientUsername: patientUsername,
              DoctorUsername: docUsername,
              Status: "Upcoming",
            },
            { Date: date, Status: "Rescheduled" }
          );
          const newApp = await appointmentModel.create({
            PatientUsername: patientUsername,
            PatientName: updateAppOld.PatientName,
            DoctorName: updateAppOld.DoctorName,
            DoctorUsername: docUsername,
            Status: "Upcoming",
            Date: date,
          });
          res
            .status(200)
            .json("You have rescheduled appointment successfully!");
          return;
        }
      }
    }
  } catch (error) {
    res.status(404).json(error);
  }
};
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
