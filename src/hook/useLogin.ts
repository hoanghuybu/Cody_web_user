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

}

const useLogin = () => {
  const { mutateAsync, data, error } = useMutation({
    mutationFn: (variables: LoginDTO) =>
      rootApi.post<LoginDTO, AuthResponse>(endpoints.login, variables)
  });

  return { mutateAsync, data, error };
};

export default useLogin;