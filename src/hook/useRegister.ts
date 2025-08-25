import { useMutation } from "@tanstack/react-query";
import { rootApi } from "../lib/rootApi";
import { endpoints } from "../lib/endpoints";
import { RegisterDTO } from "../dto/auth/register.dto";

import type { AuthResponse } from "./useLogin";

type RegisterPayload = Omit<RegisterDTO, "confirmPassword"> & {
  confirmPassword?: string;
};

const useRegister = () => {
  const { mutateAsync, data, error } = useMutation({
    mutationFn: async (variables: RegisterPayload): Promise<AuthResponse> => {
      const response = await rootApi.post<AuthResponse>(
        endpoints.register,
        variables
      );
      return response;
    }
  });

  return { mutateAsync, data, error };
};

export default useRegister;