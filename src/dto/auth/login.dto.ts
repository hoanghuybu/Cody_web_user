export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof LoginDTO, string>>;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function validateLogin(data: LoginDTO): LoginValidationResult {
  const errors: LoginValidationResult["errors"] = {};
  if (!data.email.trim()) errors.email = "Email required";
  else if (!emailRegex.test(data.email)) errors.email = "Invalid email";
  if (!data.password) errors.password = "Password required";
  return { valid: Object.keys(errors).length === 0, errors };
}