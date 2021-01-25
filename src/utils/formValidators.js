var yup = require("yup");

export async function loginFormValidator(email, password) {
  var loginSchema = yup.object().shape({
    //   name: yup.string().required(),
    password: yup
      .number()
      .required()
      .positive(),
    email: yup.string().email(),
    website: yup.string().url(),
    createdOn: yup.date().default(function() {
      return new Date();
    })
  });
  var formValidStatus;
  await loginSchema
    .isValid({
      email: email,
      password: password
    })
    .then(function(valid) {
      formValidStatus = valid;
    })
    .catch(err => {
      console.log("login form validator error" + err);
      console.log(err);
    });
  return formValidStatus;
}


export async function supportFormValidator(category, description) {
  var supportSchema = yup.object().shape({
    //   name: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required()
  });
  var formValidStatus;
  await supportSchema
    .isValid({
      description: description,
      category: category
    })
    .then(function(valid) {
      formValidStatus = valid;
    })
    .catch(err => {
      console.log("login form validator error" + err);
      console.log(err);
    });
  console.log("haha", formValidStatus);
  return formValidStatus;
}