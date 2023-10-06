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

module.exports = {
  generateUsername,
  generateName,
  generateDateOfBirth,
  generateHourlyRate,
  generateAffiliation,
  generateEducationalBackground,
};
