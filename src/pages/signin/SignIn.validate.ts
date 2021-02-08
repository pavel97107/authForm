export function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

export function validatePassword(value: string) {
  let error;
  if (!value) {
    error = "Required!";
  } else if (value.length < 3) {
    error = "Password must contain more than three characters";
  }
  return error;
}
