export const isEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isPassword = (password: string): boolean => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(
    password
  );
};

export const isName = (name: string): boolean => {
  return name?.length > 2;
};

export const isConfirmPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return isPassword(password) && password === confirm_password;
};

export const isDate = (date: string): boolean => {
  const regexTest = /^(\d{2})[/](\d{2})[/](\d{4})$/.test(date);
  if (!regexTest) {
    return false;
  }
  const formatDateToUS = date.split("/").reverse().join("-");
  const dateInstance = new Date(formatDateToUS);
  return !isNaN(dateInstance.getTime());
};
