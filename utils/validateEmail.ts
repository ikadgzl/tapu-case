export const validateEmail = (email: string) => {
  const isEmail = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(email);

  return isEmail;
};
