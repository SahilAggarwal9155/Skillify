export const nameValidate = /^[a-zA-Z\s]{3,}$/;
export const emailValidate =
  /^[a-zA-Z]+(?:[+-_.][a-zA-Z\d]+)*@[a-zA-Z.-]+\.[a-z]{2,}$/;
export const passwordValidate =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const phoneValidate = /^\d{10}$/;
