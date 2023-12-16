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

#### Create Doctor

```http
POST /doctors/createDoctor
```

| Parameter               | Type     | Description                                            |
| :---------------------- | :------- | :----------------------------------------------------- |
| `Username`              | `string` | **Required**. The username of the doctor               |
| `Name`                  | `string` | **Required**. The name of the doctor                   |
| `DateOfBirth`           | `date`   | **Required**. The date of birth of the doctor          |
| `HourlyRate`            | `number` | **Required**. The hourly rate of the doctor            |
| `Affiliation`           | `string` | **Required**. The affiliation of the doctor            |
| `EducationalBackground` | `string` | **Required**. The educational background of the doctor |

#### Update Doctor

```http
PATCH /doctors/updateDoctor
```

| Parameter     | Type     | Description                                     |
| :------------ | :------- | :---------------------------------------------- |
| `HourlyRate`  | `number` | **Required**. The new hourly rate of the doctor |
| `Affiliation` | `string` | **Required**. The new affiliation of the doctor |

#### Get Doctor by ID

```http
GET /doctors/getDoctorByid/:id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. The ID of the doctor |

#### Get Doctor by Username

```http
GET /doctors/getDoctorByUsername/:username
```

| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `username` | `string` | **Required**. The username of the doctor |

#### Filter Doctor

```http
GET /doctors/filter2
```

| Parameter    | Type     | Description                                                 |
| :----------- | :------- | :---------------------------------------------------------- |
| `Speciality` | `string` | **Required**. The speciality of the doctor                  |
| `date`       | `date`   | **Required**. The date you're looking for an appointment on |
| `hour`       | `number` | **Required**. The hour you're looking for an appointment on |

#### Add Doctor

```http
POST /doctors/addDoctor
```

| Parameter               | Type     | Description                                            |
| :---------------------- | :------- | :----------------------------------------------------- |
| `Username`              | `string` | **Required**. The username of the doctor               |
| `Name`                  | `string` | **Required**. The name of the doctor                   |
| `DateOfBirth`           | `date`   | **Required**. The date of birth of the doctor          |
| `HourlyRate`            | `number` | **Required**. The hourly rate of the doctor            |
| `Affiliation`           | `string` | **Required**. The affiliation of the doctor            |
| `EducationalBackground` | `string` | **Required**. The educational background of the doctor |

#### Get All Doctors

```http
GET /doctors/getAllDoctors
```

No parameters required.

#### Delete Doctor

```http
DELETE /doctors/deleteDoctor/:id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. The ID of the doctor |

#### Get Doctor

```http
GET /doctors/getDoctor/:id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. The ID of the doctor |

#### View Patient Info And Health Records

```http
GET /doctors/viewPatientInfoAndHealthRecords
```

| Parameter         | Type     | Description                               |
| :---------------- | :------- | :---------------------------------------- |
| `PatientUsername` | `string` | **Required**. The username of the patient |

#### Followup Appointment

```http
POST /doctors/followupAppointment
```

No parameters required.

#### Pay Doctor

```http
POST /doctors/payDoctor
```

No parameters required.

#### Filter Doctor Slot Edition

```http
GET /doctors/filterDoctorSlotEdition
```

No parameters required.

#### Add My Slots Doc

```http
POST /doctors/addMySlotsDoc
```

No parameters required.

#### Update My Slots Doc

```http
PATCH /doctors/updateMySlotsDoc/:id
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `id`      | `string` | **Required**. The ID of the slot |

#### Delete My Slots Doc

```http
DELETE /doctors/deleteMySlotsDoc/:id
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `id`      | `string` | **Required**. The ID of the slot |

#### View Upcoming Appointments Doc

```http
GET /doctors/viewUpcomingAppointmentsDoc
```

No parameters required.

#### View Past Appointments Doc

```http
GET /doctors/viewPastAppoitmentsDoc
```

No parameters required.

#### View All Available Slots

```http
GET /doctors/viewAllAvailableSlots/:username
```

| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `username` | `string` | **Required**. The username of the doctor |

#### View My Slots Doc

```http
GET /doctors/viewMySlotsDoc
```

No parameters required.

#### Validate Booking Date

```http
GET /doctors/validateBookingDate
```

No parameters required.

#### Get Payment Amount

```http
GET /doctors/getPaymentAmount
```

No parameters required.

#### Get Doctor Info

```http
GET /doctors/getDoctorInfo
```

No parameters required.

Here is the "Patient Routes" section for your `API_REFERENCE.md`:

### Patient Routes

#### Create Patient

```http
POST /patients/createPatient
```

| Parameter        | Type     | Description                                      |
| :--------------- | :------- | :----------------------------------------------- |
| `Username`       | `string` | **Required**. The username of the patient        |
| `Name`           | `string` | **Required**. The name of the patient            |
| `DateOfBirth`    | `date`   | **Required**. The date of birth of the patient   |
| `MedicalHistory` | `string` | **Required**. The medical history of the patient |

#### Update Patient

```http
PATCH /patients/updatePatient
```

| Parameter        | Type     | Description                                              |
| :--------------- | :------- | :------------------------------------------------------- |
| `MedicalHistory` | `string` | **Required**. The updated medical history of the patient |

#### Get Patient by ID

```http
GET /patients/getPatientByid/:id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. The ID of the patient |

#### Get Patient by Username

```http
GET /patients/getPatientByUsername/:username
```

| Parameter  | Type     | Description                               |
| :--------- | :------- | :---------------------------------------- |
| `username` | `string` | **Required**. The username of the patient |

#### Add Patient

```http
POST /patients/addPatient
```

| Parameter        | Type     | Description                                      |
| :--------------- | :------- | :----------------------------------------------- |
| `Username`       | `string` | **Required**. The username of the patient        |
| `Name`           | `string` | **Required**. The name of the patient            |
| `DateOfBirth`    | `date`   | **Required**. The date of birth of the patient   |
| `MedicalHistory` | `string` | **Required**. The medical history of the patient |

#### Get All Patients

```http
GET /patients/getAllPatients
```

No parameters required.

#### Delete Patient

```http
DELETE /patients/deletePatient/:id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. The ID of the patient |

#### Get Patient

```http
GET /patients/getPatient/:id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. The ID of the patient |

#### View Doctor Info And Health Records

```http
GET /patients/viewDoctorInfoAndHealthRecords
```

| Parameter        | Type     | Description                              |
| :--------------- | :------- | :--------------------------------------- |
| `DoctorUsername` | `string` | **Required**. The username of the doctor |

#### Book Appointment

```http
POST /patients/bookAppointment
```

| Parameter        | Type     | Description                               |
| :--------------- | :------- | :---------------------------------------- |
| `DoctorUsername` | `string` | **Required**. The username of the doctor  |
| `Date`           | `date`   | **Required**. The date of the appointment |
| `Time`           | `time`   | **Required**. The time of the appointment |

#### Pay Doctor

```http
POST /patients/payDoctor
```

| Parameter        | Type     | Description                              |
| :--------------- | :------- | :--------------------------------------- |
| `DoctorUsername` | `string` | **Required**. The username of the doctor |
| `Amount`         | `number` | **Required**. The amount to be paid      |

#### View Upcoming Appointments

```http
GET /patients/viewUpcomingAppointments
```

No parameters required.

#### View Past Appointments

```http
GET /patients/viewPastAppointments
```

No parameters required.

#### View All Available Slots

```http
GET /patients/viewAllAvailableSlots/:username
```

| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `username` | `string` | **Required**. The username of the doctor |

#### Validate Booking Date

```http
GET /patients/validateBookingDate
```

No parameters required.

#### Get Payment Amount

```http
GET /patients/getPaymentAmount
```

No parameters required.

#### Get Patient Info

```http
GET /patients/getPatientInfo
```

No parameters required.

Here is the "Appointment Routes" section for your `API_REFERENCE.md`:

### Appointment Routes

#### Get Appointments

```http
GET /appointments
```

No parameters required.

#### Find Patients

```http
GET /appointments/findPatients
```

No parameters required.

#### Get All Appointments for Patient

```http
GET /appointments/getAllAppointmentsPat
```

No parameters required.

#### Get Upcoming Appointments for Doctor

```http
GET /appointments/upcoming
```

No parameters required.

#### Search Patient

```http
GET /appointments/searchpatient
```

| Parameter         | Type     | Description                               |
| :---------------- | :------- | :---------------------------------------- |
| `PatientUsername` | `string` | **Required**. The username of the patient |

#### Get Appointments for Doctor

```http
GET /appointments/getAppointmentsDoc
```

No parameters required.

#### Reschedule Appointment for Patient

```http
POST /appointments/rescheduleAppointmentPatient
```

No parameters required.

#### Reschedule Appointment for Family Member

```http
POST /appointments/rescheduleAppointmentfamilymember
```

No parameters required.

#### Get Appointments for Patient

```http
GET /appointments/getAppointmentsPat
```

No parameters required.

#### Get Appointments for Family Members

```http
GET /appointments/getAppointmentsfamilymembers
```

No parameters required.

#### Filter Appointments by Status for Doctor

```http
GET /appointments/filterAppointmentsByStatusDoc
```

No parameters required.

#### Filter Appointments by Status for Patient

```http
GET /appointments/filterAppointmentsByStatusPat
```

No parameters required.

#### Filter Appointments by Date for Doctor

```http
GET /appointments/filterAppointmentsByDateDoc
```

No parameters required.

#### Filter Appointments by Date for Patient

```http
GET /appointments/filterAppointmentsByDatePat
```

No parameters required.

#### Test Appointment Reference

```http
GET /appointments/testAppRef
```

No parameters required.

#### Create Appointment

```http
POST /appointments/createAppointment
```

No parameters required.

#### Reschedule for Patient

```http
POST /appointments/rescheduleForPatient
```

No parameters required.

#### Cancel Appointment for Family Member

```http
PATCH /appointments/cancelAppFam
```

No parameters required.

#### Cancel Appointment

```http
PATCH /appointments/cancelAppointment
```

No parameters required.

Here is the "Package Routes" section for your `API_REFERENCE.md`:

### Package Routes

#### Get All Packages

```http
GET /packages
```

No parameters required.

#### Get Package by Name

```http
GET /packages/:Name
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `Name`    | `string` | **Required**. The name of the package |

#### Create Package

```http
POST /addPackage
```

| Parameter           | Type     | Description                                        |
| :------------------ | :------- | :------------------------------------------------- |
| `Name`              | `string` | **Required**. The name of the package              |
| `Price`             | `number` | **Required**. The price of the package             |
| `Session_Discount`  | `number` | **Required**. The session discount of the package  |
| `Medicine_Discount` | `number` | **Required**. The medicine discount of the package |
| `Family_Discount`   | `number` | **Required**. The family discount of the package   |

#### Delete Package

```http
DELETE /deletePackage/:id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. The ID of the package |

#### Update Package

```http
PATCH /updatePackage/:id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. The ID of the package |

### Payment Routes

#### Pay with Card

```http
POST /cardPayment
```

No parameters required.

#### Wallet Payment

```http
POST /walletPayment
```

No parameters required.

#### Subscription Payment

```http
POST /subscr
```

No parameters required.

Here is the "Prescription Routes" section for your `API_REFERENCE.md`:

### Prescription Routes

#### Add Prescription

```http
POST /addPrescription
```

No parameters required.

#### Add Medicine to Prescription

```http
POST /addMedToPrescription
```

No parameters required.

#### Delete Medicine from Prescription

```http
POST /deleteMedFromPrescription
```

No parameters required.

#### Update Description

```http
POST /updateDescription
```

No parameters required.

#### Order Prescription

```http
POST /orderPrescription
```

No parameters required.

#### Get Prescription APP

```http
GET /getPrescriptionAPP
```

No parameters required.

#### Update Dosage

```http
POST /updateDosage
```

No parameters required.

#### Check for Prescription

```http
GET /checkForPrescription
```

No parameters required.

#### Get Prescription Medicines

```http
GET /getPrescriptionMeds
```

No parameters required.

### Test Routes

#### Test Route

```http
GET /tests
```

No parameters required.

#### Accept Doctor

```http
POST /tests/acceptDoc
```

No parameters required.

#### Get All System Users

```http
GET /tests/Users
```

No parameters required.

#### Get All Admins

```http
GET /tests/Admins
```

No parameters required.

#### Get All Doctors

```http
GET /tests/Doctors
```

No parameters required.

#### Get All Patients

```http
GET /tests/Patients
```

No parameters required.

#### Get All Appointments

```http
GET /tests/Appointments
```

No parameters required.

#### Create Notification

```http
POST /tests/createNotif
```

No parameters required.

#### Get All Requests

```http
GET /tests/Requests
```

No parameters required.

#### Create System User

```http
POST /tests/createUser
```

No parameters required.

#### Create Patient

```http
POST /tests/createPatient
```

No parameters required.

#### Create Doctor

```http
POST /tests/createDoctor
```

No parameters required.

#### Create Appointment

```http
POST /tests/createAppointment
```

No parameters required.

#### Create Random Appointment

```http
POST /tests/createRandomAppointment
```

No parameters required.

#### Create Prescription

```http
POST /tests/createPrescription
```

No parameters required.

#### Get Doctor Slot

```http
GET /tests/getDocSlot
```

No parameters required.

#### Test Doctor Slot Reference

```http
GET /tests/testDocSlotRef
```

No parameters required.

#### Test Appointment Reference

```http
GET /tests/testAppointRef
```

No parameters required.

#### Create Doctor Slot

```http
POST /tests/createDocSlot
```

No parameters required.

#### Filter Doctor Slot Edition

```http
GET /tests/filterDoctorSlotEdition
```

No parameters required.

#### Add My Slots Doctor

```http
POST /tests/addMySlotsDoc
```

No parameters required.

#### Update My Slots Doctor

```http
PUT /tests/updateMySlotsDoc
```

No parameters required.

#### Delete My Slots Doctor

```http
DELETE /tests/deleteMySlotsDoc
```

No parameters required.

#### View Upcoming Appointments Doctor

```http
GET /tests/viewUpcomingAppointmentsDoc
```

No parameters required.

#### View Past Appointments Doctor

```http
GET /tests/viewPastAppoitmentsDoc
```

No parameters required.

#### View All Available Slots

```http
GET /tests/viewAllAvailableSlots
```

No parameters required.

#### View Upcoming Appointments Patient

```http
GET /tests/viewUpcomingAppointmentsPat
```

No parameters required.

#### View Past Appointments Patient

```http
GET /tests/viewPastAppoitmentsPat
```

No parameters required.
