# API Routes

- [Guest Routes](#guest-routes)
- [Admin Routes](#admin-routes)
- [Doctor Routes](#patient-routes)
- [Appointment Routes](#appointment-routes)
- [Package Routes](#package-routes)
- [Payment Routes](#payment-routes)
- [Prescription Routes](#prescription-routes)
- [Test Routes](#test-routes)

### Guest Routes

#### Login

```http
POST /login
```

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `Username` | `string` | **Required**. Username to login with |
| `Password` | `string` | **Required**. Password to login with |

#### Send OTP

```http
POST /sendOTP
```

| Parameter | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| `Email`   | `string` | **Required**. The Email of the user to send OTP to |

#### Validate OTP

```http
POST /validateOTP
```

| Parameter | Type     | Description                                             |
| :-------- | :------- | :------------------------------------------------------ |
| `Email`   | `string` | **Required**. The Email of the user the OTP was sent to |
| `otp`     | `string` | **Required**. The otp to validate                       |

#### Add Patient

```http
POST /addPatient
```

| Parameter                  | Type     | Description                                                                  |
| :------------------------- | :------- | :--------------------------------------------------------------------------- |
| `Username`                 | `string` | **Required**. The username of the patient                                    |
| `Name`                     | `string` | **Required**. The name of the patient                                        |
| `Password`                 | `string` | **Required**. The password of the patient                                    |
| `Email`                    | `string` | **Required**. The email of the patient                                       |
| `MobileNum`                | `string` | **Required**. The mobile number of the patient                               |
| `DateOfBirth`              | `string` | **Required**. The date of birth of the patient                               |
| `Gender`                   | `string` | **Required**. The gender of the patient ["M", "F"]                           |
| `EmergencyContactNumber`   | `string` | **Required**. The emergency contact number of the patient                    |
| `EmergencyContactName`     | `string` | **Required**. The emergency contact name of the patient                      |
| `EmergencyContactRelation` | `string` | **Required**. The relationship between the patient and the emergency contact |

#### Add Doctor Signup Request

```http
POST /addRequest
```

| Parameter               | Type     | Description                                            |
| :---------------------- | :------- | :----------------------------------------------------- |
| `Username`              | `string` | **Required**. The username of the doctor               |
| `Password`              | `string` | **Required**. The password of the doctor               |
| `Email`                 | `string` | **Required**. The email of the doctor                  |
| `Name`                  | `string` | **Required**. The name of the doctor                   |
| `DateOfBirth`           | `string` | **Required**. The date of birth of the doctor          |
| `HourlyRate`            | `number` | **Required**. The hourly rate of the doctor            |
| `Affiliation`           | `string` | **Required**. The affiliation of the doctor            |
| `EducationalBackground` | `string` | **Required**. The educational background of the doctor |
| `Speciality`            | `string` | **Required**. The speciality of the doctor             |

#### Reset Password

```http
PATCH /resetPass/
```

| Parameter  | Type     | Description                                                  |
| :--------- | :------- | :----------------------------------------------------------- |
| `Email`    | `string` | **Required**. The Email of the user to reset the password of |
| `Password` | `string` | **Required**. The new Password                               |

#### Get Notifications

```http
GET /getNotifs
```

No parameters required.

#### Update Request

```http
PUT /updateRequest/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. ID of the request |
| `request` | `object` | **Required** The new request    |

#### Update Email

```http
PATCH /updateEmail
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `Email`   | `string` | **Required**. The new Email |

#### Update Password

```http
PATCH /updatePass/
```

| Parameter     | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `OldPassword` | `string` | **Required**. The old password |
| `NewPassword` | `string` | **Required**. The new password |

### Admin Routes

#### Get Admins

```http
GET /admins
```

No parameters required.

#### Get Requests

```http
GET /admins/requests
```

No parameters required.

#### Add Admin

```http
POST /admins/addAdmin
```

| Parameter  | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `Username` | `string` | **Required**. Username of the admin |
| `Password` | `string` | **Required**. Password of the admin |
| `Email`    | `string` | **Required**. Email of the admin    |

#### Get Request

```http
GET /admins/getRequest
```

| Parameter  | Type     | Description                                     |
| :--------- | :------- | :---------------------------------------------- |
| `Username` | `string` | **Required**. Username of the requesting doctor |

#### Get Request File

```http
GET /admins/getRequestFile/:filename
```

| Parameter  | Type     | Description                                            |
| :--------- | :------- | :----------------------------------------------------- |
| `filename` | `string` | **Required**. Filename of the requesting doctor's file |

#### Accept Request

```http
POST /admins/acceptRequest
```

| Parameter  | Type     | Description                                     |
| :--------- | :------- | :---------------------------------------------- |
| `Username` | `string` | **Required**. Username of the requesting doctor |

#### Reject Request

```http
PUT /admins/rejectRequest
```

| Parameter  | Type     | Description                                     |
| :--------- | :------- | :---------------------------------------------- |
| `Username` | `string` | **Required**. Username of the requesting doctor |

#### Delete User

```http
DELETE /admins/deleteUser
```

| Parameter  | Type     | Description                                      |
| :--------- | :------- | :----------------------------------------------- |
| `Username` | `string` | **Required**. Username of the user to be deleted |

### Doctor Routes

### Patient Routes

### Appointment Routes

### Package Routes

### Payment Routes

### Prescription Routes

### Test Routes
