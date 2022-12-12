const validateUser = (req, res, next) => {
    const { firstname, lastname, city, language } = req.body;
const errors = [];
const { email } = req.body;
const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  if (firstname == null) {
    errors.push({field: "firstname", message: "this field is required"});
  } else if (firstname.length >= 255) {
    errors.push({ field: "firstname", message: "Should contain less than 255 characters" });
  } if (lastname == null) {
    errors.push({field: "lastname", message: "this field is required"});
  } else if (lastname.length >= 255) {
    errors.push({ field: "lastname", message: "Should contain less than 255 characters" });
  } if (email == null) {
    errors.push({field: "email", message: "this field is required"});
  } else if (email.length >= 255) {
    errors.push({ field: "email", message: "Should contain less than 255 characters" });
  } else if (!emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email' });
  } if (city == null) {
    errors.push({field: "city", message: "this field is required"});
  } else if (city.length >= 255) {
    errors.push({ field: "city", message: "Should contain less than 255 characters" });
  } if (language == null) {
    errors.push({field: "language", message: "this field is required"});
  }else if (language.length >= 255) {
    errors.push({ field: "language", message: "Should contain less than 255 characters" });
  } if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};
module.exports = {
    validateUser,
}