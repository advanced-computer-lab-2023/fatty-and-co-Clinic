function generateUsername() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let username = "";
  for (let i = 0; i < 10; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  username += Math.floor(Math.random() * 1000);
  return username;
}

function generateName() {
  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "William",
    "Olivia",
    "Sophia",
    "Daniel",
    "Ethan",
    "Emma",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Garcia",
    "Davis",
    "Wilson",
    "Lee",
    "Gonzalez",
    "Clark",
    "Rodriguez",
  ];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function generateDateOfBirth() {
  const year = 2020 - Math.floor(Math.random() * 100);
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${month}-${day}`;
}

function generateGender() {
  const genders = ["M", "F"];
  return genders[Math.floor(Math.random() * genders.length)];
}

function generateHourlyRate() {
  return Math.floor(Math.random() * 100) + 1;
}

function generateAffiliation() {
  const affiliations = ["Hospital", "Clinic", "Medical Center", "Practice"];
  const affiliation =
    affiliations[Math.floor(Math.random() * affiliations.length)];
  const suffixes = ["of", "for", "at"];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Philadelphia",
    "Phoenix",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];
  const city = cities[Math.floor(Math.random() * cities.length)];
  return `${affiliation} ${suffix} ${city}`;
}

function generateEducationalBackground() {
  const degrees = [
    "MD",
    "DO",
    "MBBS",
    "MBChB",
    "BMBS",
    "BMED",
    "MB",
    "BCh",
    "BMed",
    "MDCM",
    "MUDr",
    "Dr. med.",
    "Lekarz",
    "Medicinsk Examen",
    "Medicinsk Kandidat",
    "Medicinsk Licentiat",
    "Medicinsk Doktor",
    "Medicinae Universae Doctor",
    "Doctor of Medicine",
  ];
  const degree = degrees[Math.floor(Math.random() * degrees.length)];
  const schools = [
    "Harvard Medical School",
    "Johns Hopkins School of Medicine",
    "Stanford University School of Medicine",
    "Perelman School of Medicine at the University of Pennsylvania",
    "David Geffen School of Medicine at UCLA",
    "UCSF School of Medicine",
    "Washington University School of Medicine in St. Louis",
    "Mayo Clinic Alix School of Medicine",
    "Duke University School of Medicine",
    "University of Michigan Medical School",
  ];
  const school = schools[Math.floor(Math.random() * schools.length)];
  const years = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
  const year = years[Math.floor(Math.random() * years.length)];
  return `${degree} from ${school} (${year})`;
}

function generateSpeciality() {
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Hematology",
    "Infectious Disease",
    "Nephrology",
    "Neurology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Urology",
  ];
  return specialties[Math.floor(Math.random() * specialties.length)];
}

function generateMobileNum() {
  const mobileNum = Math.floor(Math.random() * 1000000000) + 1000000000;
  return mobileNum;
}

function generatePackage() {
  const packages = ["Silver", "Gold", "Platinum"];
  return packages[Math.floor(Math.random() * packages.length)];
}

function generateEmail() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let email = "";
  for (let i = 0; i < 10; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  email += Math.floor(Math.random() * 1000);
  email += "@gmail.com";
  return email;
}

function generatePassword() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let password = "";
  for (let i = 0; i < 10; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  password += Math.floor(Math.random() * 1000);
  return password;
}

function generateWorkingDays() {
  const workingDays = [];
  const numOfWorkingDays = Math.floor(Math.random() * 7) + 1;
  for (let i = 0; i < numOfWorkingDays; i++) {
    let day = Math.floor(Math.random() * 7);
    while (workingDays.includes(day)) {
      day = Math.floor(Math.random() * 7);
    }
    workingDays.push(day);
  }
  return workingDays;
}

function generateStartTimeAndEndTime() {
  const startTime = Math.floor(Math.random() * 10);
  const endTime = Math.floor(Math.random() * 10) + 10;
  return { startTime, endTime };
}

function generateAppointmentStatus() {
  const status = ["Upcoming", "Completed", "Rescheduled", "Cancelled"];
  return status[Math.floor(Math.random() * status.length)];
}

function generateAppointmentDate() {
  const today = new Date();
  const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const randomTimestamp = Math.floor(
    Math.random() * (next30Days.getTime() - today.getTime())
  );
  const randomDate = new Date(today.getTime() + randomTimestamp);

  // Generate random hours, minutes and seconds
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  const randomSeconds = Math.floor(Math.random() * 60);

  // Set the random hours, minutes and seconds
  randomDate.setHours(randomHours);
  randomDate.setMinutes(randomMinutes);
  randomDate.setSeconds(randomSeconds);

  return randomDate.toISOString();
}

function generateUserType() {
  const types = ["Patient", "Doctor", "Admin"];
  return types[Math.floor(Math.random() * types.length)];
}

function generateMedicine() {
  const meds = [
    "Aspirin",
    "Panadol",
    "Ibuprofen",
    "Paracetamol",
    "Penicillin",
    "Amoxicillin",
    "Ciprofloxacin",
    "Omeprazole",
    "Ranitidine",
    "Prednisone",
    "Albuterol",
  ];
  const numberOfMedicinesToGenerate = 5; // Change this number to generate a different list length
  const medicineList = [];
  for (let i = 0; i < numberOfMedicinesToGenerate; i++) {
    const randomIndex = Math.floor(Math.random() * meds.length);
    const randomMedicine = meds[randomIndex];
    const medicineObject = {
      Name: randomMedicine,
    };
    medicineList.push(medicineObject);
  }
  return medicineList;
}

function generateDiagnosis() {
  const diagnosis = [
    "Hypertension",
    "Diabetes",
    "Influenza",
    "Bronchitis",
    "Pneumonia",
    "Migraine",
    "Asthma",
    "Arthritis",
    "Gastritis",
    "Anxiety Disorder",
    "Depression",
    "Strep Throat",
    "Fibromyalgia",
    "Chronic Fatigue Syndrome",
    "Allergies",
    "Common Cold",
    "Osteoporosis",
    "Rheumatoid Arthritis",
    "Gastroesophageal Reflux Disease (GERD)",
    "Cancer",
  ];

  return diagnosis[Math.floor(Math.random() * diagnosis.length)];
}

module.exports = {
  generateUsername,
  generateName,
  generateDateOfBirth,
  generateGender,
  generateHourlyRate,
  generateAffiliation,
  generateEducationalBackground,
  generateSpeciality,
  generateMobileNum,
  generatePackage,
  generateEmail,
  generatePassword,
  generateWorkingDays,
  generateStartTimeAndEndTime,
  generateAppointmentStatus,
  generateAppointmentDate,
  generateUserType,
  generateMedicine,
  generateDiagnosis,
};
