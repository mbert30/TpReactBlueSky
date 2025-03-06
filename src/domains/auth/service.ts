export const verifInfoConnexion = (email: string, password: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (emailRegex.test(email) && passwordRegex.test(password)) {
    return true;
  } else {
    return false;
  }
}

export const verifInfoInscription = (email: string, password: string, username: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  if (emailRegex.test(email) && passwordRegex.test(password) && usernameRegex.test(username)) {
    return true;
  } else {
    return false;
  }
}