# Shebeen Health Clinic

This project is a virtual clinic website for remotely booking and holding medical appointments.

<img src="./frontend/src/assets/img/ShebeenElkom.png" width="200">

## Motivation

The motivation behind the Shebeen Health Clinic project is to provide a seamless and efficient way for patients to book and attend medical appointments remotely. In the era of digital transformation, healthcare should not be left behind. This project aims to bring convenience to patients, allowing them to consult with healthcare professionals without the need to travel. This would be especially beneficial in case the global situation requires social distancing once again. Furthermore, it provides a streamlined platform for healthcare providers to manage appointments and consult with patients, making healthcare more accessible and efficient.

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

<img src="./frontend/src/assets/img/signUp.jpg" width="500" hight="400">
<img src="./frontend/src/assets/img/Chat.jpg" width="500" hight="400">
<img src="./frontend/src/assets/img/appointment.jpg" width="500" hight="400">
<!-- ![App Screenshot](./screenshots/website/loginPage.jpg)
![App Screenshot](./screenshots/website/signupPage.jpg)
![App Screenshot](./screenshots/website/homePage.jpg)
![App Screenshot](./screenshots/website/profilePage.jpg)
![App Screenshot](./screenshots/website/chatPage.jpg)
![App Screenshot](./screenshots/website/viewDoctorsPage.jpg)
[include anything else here] -->

## Tech Stack

**FrontEnd:** React

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

1. Clone the repository:

```bash
git clone https://github.com/advanced-computer-lab-2023/fatty-and-co-Clinic
```

2. Navigate to the project directory:

```bash
cd fatty-and-co-Clinic
```

3. Install the dependencies for backend

```bash
cd backend
npm install
```

4. Install the dependencies for frontend

```bash
cd ../frontend
npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in /backend

`MONGO_URI`
This is the URI for your MongoDB database. It should be in the format: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`

`JWT_SECRET`
This is the secret key used for signing and verifying JWT tokens for user authentication.

`STRIPE_PRIVATE_KEY`
This is your private key for the Stripe API for handling payments. You can obtain this key from your Stripe dashboard.

`PORT`
This is the port number on which your backend server will run. If not specified, it will default to 8000. If changed you will also need to change the API_Paths in frontend/API

Create a `.env` file in the root of your backend directory and insert your key/value pairs in the following format of `KEY=VALUE`:

```env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
STRIPE_PRIVATE_KEY=your_stripe_private_key
PORT=your_port_number
```

## API Reference

Refer to all the API routes in [this file](API_REFERENCE.md)

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

1. Go to the project directory

```bash
  cd fatty-and-co-Clinic
```

2. Start the backend server

```bash
cd backend/src
nodemon server
```

3. Open a new terminal and start the frontend server

```bash
cd ../../frontend
npm start
```

Now, both the frontend and backend servers should be running. You can access the application in your browser at http://localhost:3000.

## Contributing

Contributions are always welcome! Here are the ways you can contribute:

- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Pull Requests](#pull-requests)

### Reporting Bugs

This section guides you through submitting a bug report for this project. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for this project, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and make decisions.

When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion).

### Your First Code Contribution

Unsure where to begin contributing to this project? You can start by looking through these `beginner` and `help-wanted` issues:

We welcome contributions from everyone. If you're interested in helping out, here's how you can support this project:

1. **Fork the repository**: This creates your own copy of the project where you can make your changes.

2. **Clone your fork**: This downloads the repository to your local machine for editing. The command is `git clone https://github.com/your-username/repository-name.git`.

3. **Create a branch**: Changes should be made on a separate branch to allow for review and to keep your code separate from the master branch. The command is `git checkout -b branch-name`.

4. **Make your changes**: Edit the files in your favorite text editor.

5. **Commit your changes**: Save your changes and prepare them for uploading or 'pushing' to GitHub. The command is `git commit -m "Commit message"`.

6. **Push your changes**: Upload your changes to your repository on GitHub. The command is `git push origin branch-name`.

7. **Submit a pull request**: Send your changes to the project maintainer for review. Go to your repository on GitHub, click the 'Pull Request' button, and enter the details of your changes.

Please ensure your contribution adheres to:

- The existing coding style.
- The code is adequately commented.
- The code is adequately tested.

Thank you for your interest in contributing! We look forward to reviewing your contribution.

### Pull Requests

The process described here has several goals:

- Maintain the project's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible project
- Enable a sustainable system for the project's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [Code Style](#Code-Style)
3. After you submit your pull request, verify that all status checks are passing

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## How Do I Submit A Good Bug Report?

Bugs are tracked as GitHub issues. Create an issue on the repository and provide the following information:

- Use a clear and descriptive title for the issue to identify the problem.
- Describe the exact steps which reproduce the problem in as many details as possible. When listing steps, don't just say what you did, but explain how you did it.
- Provide specific examples to demonstrate the steps. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use Markdown code blocks.
- Describe the behavior you observed after following the steps and point out what exactly is the problem with that behavior.
- Explain which behavior you expected to see instead and why.
- Include screenshots and animated GIFs which show you following the described steps and clearly demonstrate the problem.

## How Do I Submit A Good Enhancement Suggestion?

Enhancement suggestions are tracked as GitHub issues. Create an issue on the repository and provide the following information:

- Use a clear and descriptive title for the issue to identify the suggestion.
- Provide a step-by-step description of the suggested enhancement in as many details as possible.
- Provide specific examples to demonstrate the steps or how the enhancement would work. Include copy/pasteable snippets which you use in those examples, as Markdown code blocks.
- Describe the current behavior and explain which behavior you expected to see instead and why.
- Include screenshots and animated GIFs which help you demonstrate the steps or point out the part of the project which the suggestion is related to.
- Explain why this enhancement would be useful to most users and isn't something that can or should be implemented as a community plugin.

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

- [@ZeyadHabash](https://github.com/ZeyadHabash)
- [@a7madgom3a16](link here)
- [@ahmedhgabr]
- [@Hamza-gehad]
- [@kholoudkhaledd]
- [@mariam-alaa20031]
- [@mariamhmostafa]
- [@mariamtouny]
- [@RafeeQq]
- [@Shorok02]

## License

[MIT License](https://choosealicense.com/licenses/mit/)

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

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1.  Definitions.

    "License" shall mean the terms and conditions for use, reproduction,
    and distribution as defined by Sections 1 through 9 of this document.

    "Licensor" shall mean the copyright owner or entity authorized by
    the copyright owner that is granting the License.

    "Legal Entity" shall mean the union of the acting entity and all
    other entities that control, are controlled by, or are under common
    control with that entity. For the purposes of this definition,
    "control" means (i) the power, direct or indirect, to cause the
    direction or management of such entity, whether by contract or
    otherwise, or (ii) ownership of fifty percent (50%) or more of the
    outstanding shares, or (iii) beneficial ownership of such entity.

    "You" (or "Your") shall mean an individual or Legal Entity
    exercising permissions granted by this License.

    "Source" form shall mean the preferred form for making modifications,
    including but not limited to software source code, documentation
    source, and configuration files.

    "Object" form shall mean any form resulting from mechanical
    transformation or translation of a Source form, including but
    not limited to compiled object code, generated documentation,
    and conversions to other media types.

    "Work" shall mean the work of authorship, whether in Source or
    Object form, made available under the License, as indicated by a
    copyright notice that is included in or attached to the work
    (an example is provided in the Appendix below).

    "Derivative Works" shall mean any work, whether in Source or Object
    form, that is based on (or derived from) the Work and for which the
    editorial revisions, annotations, elaborations, or other modifications
    represent, as a whole, an original work of authorship. For the purposes
    of this License, Derivative Works shall not include works that remain
    separable from, or merely link (or bind by name) to the interfaces of,
    the Work and Derivative Works thereof.

    "Contribution" shall mean any work of authorship, including
    the original version of the Work and any modifications or additions
    to that Work or Derivative Works thereof, that is intentionally
    submitted to Licensor for inclusion in the Work by the copyright owner
    or by an individual or Legal Entity authorized to submit on behalf of
    the copyright owner. For the purposes of this definition, "submitted"
    means any form of electronic, verbal, or written communication sent
    to the Licensor or its representatives, including but not limited to
    communication on electronic mailing lists, source code control systems,
    and issue tracking systems that are managed by, or on behalf of, the
    Licensor for the purpose of discussing and improving the Work, but
    excluding communication that is conspicuously marked or otherwise
    designated in writing by the copyright owner as "Not a Contribution."

    "Contributor" shall mean Licensor and any individual or Legal Entity
    on behalf of whom a Contribution has been received by Licensor and
    subsequently incorporated within the Work.

2.  Grant of Copyright License. Subject to the terms and conditions of
    this License, each Contributor hereby grants to You a perpetual,
    worldwide, non-exclusive, no-charge, royalty-free, irrevocable
    copyright license to reproduce, prepare Derivative Works of,
    publicly display, publicly perform, sublicense, and distribute the
    Work and such Derivative Works in Source or Object form.

3.  Grant of Patent License. Subject to the terms and conditions of
    this License, each Contributor hereby grants to You a perpetual,
    worldwide, non-exclusive, no-charge, royalty-free, irrevocable
    (except as stated in this section) patent license to make, have made,
    use, offer to sell, sell, import, and otherwise transfer the Work,
    where such license applies only to those patent claims licensable
    by such Contributor that are necessarily infringed by their
    Contribution(s) alone or by combination of their Contribution(s)
    with the Work to which such Contribution(s) was submitted. If You
    institute patent litigation against any entity (including a
    cross-claim or counterclaim in a lawsuit) alleging that the Work
    or a Contribution incorporated within the Work constitutes direct
    or contributory patent infringement, then any patent licenses
    granted to You under this License for that Work shall terminate
    as of the date such litigation is filed.

4.  Redistribution. You may reproduce and distribute copies of the
    Work or Derivative Works thereof in any medium, with or without
    modifications, and in Source or Object form, provided that You
    meet the following conditions:

    (a) You must give any other recipients of the Work or
    Derivative Works a copy of this License; and

    (b) You must cause any modified files to carry prominent notices
    stating that You changed the files; and

    (c) You must retain, in the Source form of any Derivative Works
    that You distribute, all copyright, patent, trademark, and
    attribution notices from the Source form of the Work,
    excluding those notices that do not pertain to any part of
    the Derivative Works; and

    (d) If the Work includes a "NOTICE" text file as part of its
    distribution, then any Derivative Works that You distribute must
    include a readable copy of the attribution notices contained
    within such NOTICE file, excluding those notices that do not
    pertain to any part of the Derivative Works, in at least one
    of the following places: within a NOTICE text file distributed
    as part of the Derivative Works; within the Source form or
    documentation, if provided along with the Derivative Works; or,
    within a display generated by the Derivative Works, if and
    wherever such third-party notices normally appear. The contents
    of the NOTICE file are for informational purposes only and
    do not modify the License. You may add Your own attribution
    notices within Derivative Works that You distribute, alongside
    or as an addendum to the NOTICE text from the Work, provided
    that such additional attribution notices cannot be construed
    as modifying the License.

    You may add Your own copyright statement to Your modifications and
    may provide additional or different license terms and conditions
    for use, reproduction, or distribution of Your modifications, or
    for any such Derivative Works as a whole, provided Your use,
    reproduction, and distribution of the Work otherwise complies with
    the conditions stated in this License.

5.  Submission of Contributions. Unless You explicitly state otherwise,
    any Contribution intentionally submitted for inclusion in the Work
    by You to the Licensor shall be under the terms and conditions of
    this License, without any additional terms or conditions.
    Notwithstanding the above, nothing herein shall supersede or modify
    the terms of any separate license agreement you may have executed
    with Licensor regarding such Contributions.

6.  Trademarks. This License does not grant permission to use the trade
    names, trademarks, service marks, or product names of the Licensor,
    except as required for reasonable and customary use in describing the
    origin of the Work and reproducing the content of the NOTICE file.

7.  Disclaimer of Warranty. Unless required by applicable law or
    agreed to in writing, Licensor provides the Work (and each
    Contributor provides its Contributions) on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
    implied, including, without limitation, any warranties or conditions
    of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
    PARTICULAR PURPOSE. You are solely responsible for determining the
    appropriateness of using or redistributing the Work and assume any
    risks associated with Your exercise of permissions under this License.

8.  Limitation of Liability. In no event and under no legal theory,
    whether in tort (including negligence), contract, or otherwise,
    unless required by applicable law (such as deliberate and grossly
    negligent acts) or agreed to in writing, shall any Contributor be
    liable to You for damages, including any direct, indirect, special,
    incidental, or consequential damages of any character arising as a
    result of this License or out of the use or inability to use the
    Work (including but not limited to damages for loss of goodwill,
    work stoppage, computer failure or malfunction, or any and all
    other commercial damages or losses), even if such Contributor
    has been advised of the possibility of such damages.

9.  Accepting Warranty or Additional Liability. While redistributing
    the Work or Derivative Works thereof, You may choose to offer,
    and charge a fee for, acceptance of support, warranty, indemnity,
    or other liability obligations and/or rights consistent with this
    License. However, in accepting such obligations, You may act only
    on Your own behalf and on Your sole responsibility, not on behalf
    of any other Contributor, and only if You agree to indemnify,
    defend, and hold each Contributor harmless for any liability
    incurred by, or claims asserted against, such Contributor by reason
    of your accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Appendix

Any additional information goes here
