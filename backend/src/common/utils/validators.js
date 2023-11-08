function validateEmail(email) {
  // Declare a regular expression for email validation
  var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  /*
  ^ - start of the line
  \w+ - matches one or more word characters (a-z, A-Z, 0-9, _)
  @ - matches the @ symbol
  [a-zA-Z_]+? - matches one or more of any lowercase letter, uppercase letter, or underscore, as few as possible
  \. - matches the period (.) character
  [a-zA-Z]{2,3} - matches any lowercase or uppercase letter, but only if there are 2 or 3 of them
  $ - end of the line
  */
  return re.test(email);
}

function validatePassword(password) {
  // Declare a regular expression for password validation
  var re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

  /*
  ^ - start of the line
  (?=.*[a-z]) - positive lookahead, ensures at least one lowercase letter exists
  (?=.*[A-Z]) - positive lookahead, ensures at least one uppercase letter exists
  (?=.*\d) - positive lookahead, ensures at least one digit exists
  (?=.*[!@#$%^&*]) - positive lookahead, ensures at least one special character exists
  [a-zA-Z\d!@#$%^&*]{8,} - ensures that the characters are either a letter (lowercase or uppercase), a digit, or a special character, and there are at least 8 of them
  $ - end of the line
  */
  return re.test(password);
}

module.exports = { validateEmail, validatePassword };
