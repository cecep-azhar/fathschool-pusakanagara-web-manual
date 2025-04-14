import { TypeForgotPassSchema, TypeLoginSchema } from "@/types/Schema";
import { useMutation, UseMutationResult } from "react-query";
import { toast } from "sonner";
import axios, { AxiosError, AxiosResponse } from "axios";


/**
 * Hook to reset the user's password using the provided phone number.
 *
 * @returns {UseMutationResult<AxiosResponse, AxiosError, TypeForgotPassSchema, unknown>} The result of the mutation.
 */
function useForgotPass(): UseMutationResult<AxiosResponse, AxiosError, TypeForgotPassSchema, unknown> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/forgot-password-manual`;

  return useMutation<AxiosResponse, AxiosError, TypeForgotPassSchema>({
    mutationFn: async (data: TypeForgotPassSchema) => axios.post<AxiosResponse>(url, data),
    onSuccess: (data: AxiosResponse) => {
      console.log(data);
      toast.success("Check WhatsApp Anda");
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500;
      const statusText = status === 404 ? 'No Handphone User tidak Ditemukan' : 'Terjadi Kesalahan pada Server';

      toast.error(statusText);
    },
  });
}

/**
 * Hook to login the user.
 *
 * @param {TypeLoginSchema} data The login credentials to use.
 * @returns {UseMutationResult<AxiosResponse, unknown, TypeLoginSchema, unknown>} The result of the mutation.
 */
function useLogin(): UseMutationResult<AxiosResponse, unknown, TypeLoginSchema, unknown> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/loginUsers`;

  return useMutation({
    mutationFn: async (data: TypeLoginSchema) => axios.post<AxiosResponse>(url, data),
    onSuccess: (data: AxiosResponse) => {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.data.data));
      toast.success('Login Berhasil')
      window.location.href = "/dashboard/attendance";
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500
      const statusText = status === 403 ? 'Akun tidak memiliki akses untuk fitur ini' : status === 404 ? 'User tidak ditemukan' : status === 401 ? 'Password Salah' : 'Terjadi kesalahan pada server'
      
      toast.error(statusText) 
    }
  })
}



export {
  useForgotPass,
  useLogin
}