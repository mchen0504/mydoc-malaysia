const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = (email) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

export const validateSignUpData = (user) => {
  let errors = {};

  if (isEmpty(user.username)) errors.username = "Username must not be empty";

  if (
    user.medicalRegistrationNumber &&
    isEmpty(user.medicalRegistrationNumber)
  ) {
    errors.medicalRegistrationNumber =
      "Medical Registration Number must not be empty";
  }

  if (isEmpty(user.email)) {
    errors.email = "Email address must not be empty";
  } else if (!isEmail(user.email)) {
    errors.email = "Email address must be valid";
  }
  if (isEmpty(user.password)) errors.password = "Password must not be empty";

  if (user.password !== user.confirmPassword)
    errors.confirmPassword = "Passwords must match";

  return errors;
};
