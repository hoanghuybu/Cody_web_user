import { rootApi } from "../lib/rootApi";
import { endpoints } from "../lib/endpoints";
import { LoginDTO } from "../dto/auth/login.dto";
import { useMutation } from "@tanstack/react-query";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface AuthResponse {
  token?: string;
  user?: User;
  status?: number;
  message?: string;
  error?: {
    detail?: string;
  };
}

const useLogin = () => {
  const { mutateAsync, data, error } = useMutation({
    mutationFn: async (variables: LoginDTO): Promise<AuthResponse> =>
      rootApi.post(endpoints.login, variables) as Promise<AuthResponse>,
    retry: false
  });

  return { mutateAsync, data, error };
};

export default useLogin;