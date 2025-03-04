export const verifInfoConnexion = (email: string, password: string) => {
  if(email != '' && password != '') {
    return true
  } else {
    return false
  }
}
