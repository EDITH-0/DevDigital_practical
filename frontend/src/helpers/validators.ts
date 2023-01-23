export const ValidateEmail = (email: string) => {
  if (email.trim() === '') {
    return 1
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return 2
  }
  return false
}

export const ValidatePassword = (password: string) => {
  if (password.trim() === '') {
    return 1
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
  ) {
    return 2
  }
  return false
}

export const ValidateConfirmPassword = (password: string, confPass: string) => {
  if (confPass.trim() === '') {
    return 1
  }
  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(confPass)) {
    return 2
  }
  if (password !== confPass) {
    return 3
  }
  return false
}

export const ValidateMobileNumber = (mobile_no: string) => {
  if (mobile_no.trim() === '') {
    return 1
  }
  if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile_no)) {
    return 2
  }
  return false
}
export const ValidateCommonFields = (value: string) => {
  if (value.trim() === '') {
    return 1
  }
  return false
}
