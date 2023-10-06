function validateEmail(email) {
  var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
}

module.exports = { validateEmail };
