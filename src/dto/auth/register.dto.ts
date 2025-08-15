export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof RegisterDTO, string>>;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function validateRegister(data: RegisterDTO): RegisterValidationResult {
  const errors: RegisterValidationResult["errors"] = {};
  if (!data.firstName.trim()) errors.firstName = "First name required";
  if (!data.lastName.trim()) errors.lastName = "Last name required";
  if (!data.email.trim()) errors.email = "Email required";
  else if (!emailRegex.test(data.email)) errors.email = "Invalid email";
  if (!data.password) errors.password = "Password required";
  else if (data.password.length < 8) errors.password = "Min 8 characters";
  if (!data.confirmPassword) errors.confirmPassword = "Confirm password";
  else if (data.confirmPassword !== data.password)
    errors.confirmPassword = "Passwords do not match";
  return { valid: Object.keys(errors).length === 0, errors };
}