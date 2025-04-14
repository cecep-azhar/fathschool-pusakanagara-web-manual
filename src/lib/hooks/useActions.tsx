import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

type CheckLocation = {
  latitude: number;
  longitude: number;
};

type QrData = {
  qr_code_id: string;
  latitude: number;
  longitude: number;
};
/**
 * * Fetches the checkin status of a user with the given ID, if given.
 *
 * @param {string | null} id The ID of the user to check.
 *
 * @returns {UseQueryResult<boolean, AxiosError>} The result of the query.
 */
function useCheckById(id: string | null) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/isCheckinManual/${id}`

  return useQuery({
    queryKey: ['checkById', id],
    // refetchInterval: 10000, // Refetch every 10 seconds
    enabled: !!id,
    queryFn: async () => axios.get(url),
    onError: (error) => console.error("Error fetching check data:", error),
  })
}

/**
 *  * Logs in a user using the provided login credentials.
 *
 * @param {CheckLocation} data The login credentials to use.
 * @returns {UseMutationResult<AxiosResponse, unknown, CheckLocation, unknown>} The result of the mutation.
 */
function useCheckIn() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/checkinManual`
  const queryClient = useQueryClient();

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString!);
  const id = user.id
  const { refetch } = useCheckById(id)

  const { mutate, isLoading} = useMutation({
    mutationFn: async (data: CheckLocation) => {

      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }

      const user = JSON.parse(userString);
      const payload = {
        user_id: user.id, 
        lattitude: data.latitude,
        longitude: data.longitude,
      };

      return axios.post(url, payload);
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500
      const statusText = status === 400 ? 'Anda Sudah Check In' : status === 403 ? 'Anda Berada Diluar Jangkauan' : status === 404 ? 'User Tidak Ditemukan' : 'Terjadi Kesalahan pada Server'
      
      console.log(error);
      toast.error(statusText)
    },
    onSuccess: () => {
      // window.location.href = "/dashboard/attendance";
      refetch();
      queryClient.invalidateQueries('checkById');
      toast.success("Check In Berhasil")
    },
  });

  return {
    In: mutate,
    loadIn: isLoading
  }
}

/**
 * * Hook to check out the user using the provided location.
 *
 * @param {CheckLocation} data The location to use.
 * @returns {UseMutationResult<AxiosResponse, unknown, CheckLocation, unknown>} The result of the mutation.
 */
function useCheckOut() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/checkoutManual`
  const queryClient = useQueryClient();

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString!);
  const id = user.id
  const { refetch } = useCheckById(id)

  const { mutate, isLoading } =  useMutation({
    mutationFn: async (data: CheckLocation) => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }

      const user = JSON.parse(userString);
      const payload = {
        user_id: user.id, 
        lattitude: data.latitude,
        longitude: data.longitude,
      };

      return axios.post(url, payload);
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500
      const statusText = status === 400 ? 'Anda Sudah Check Out' : status === 402 ? 'Belum Jadwal Pulang'  : status === 401 ? 'Anda Belum Check In' : status === 404 ? 'User Tidak Ditemukan' : status === 403 ? 'Anda Berada Diluar Jangkauan' : 'Terjadi Kesalahan pada Server'

      toast.error(statusText)
    },
    onSuccess: () => {
      // window.location.href = "/dashboard/attendance";
      refetch();
      queryClient.invalidateQueries('checkById');
      toast.success("Check Out Berhasil")
    },
  });

  return {
    Out: mutate,
    loadOut: isLoading
  }
}


/**
 * Hook to submit a leave request. This function will send a POST request to the server
 * with the given data and return the response. If the request is successful, it will
 * invalidate the cache for the "checkById" query and show a success toast. If the
 * request fails, it will show an error toast.
 *
 * @returns {UseMutationResult<AxiosResponse, AxiosError, FormData, unknown>} The result of the mutation.
 */
function useLeave() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/leaveManual`;
  const queryClient = useQueryClient();

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString!);
  const id = user.id
  const { refetch } = useCheckById(id)

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return useMutation({
    mutationFn: async (payload: FormData) => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }
  
      const user = JSON.parse(userString);
      const leavePayload = new FormData();

      const startDate = new Date()

      leavePayload.append('user_id', user.id);
      leavePayload.append('title', payload.get('title') as string);
      leavePayload.append('leave_type_id', payload.get('leave_type_id') as string);
      leavePayload.append('description', payload.get('description') as string);
      leavePayload.append('end', payload.get('end') as string);
      leavePayload.append('start', formatDate(startDate));
      if (payload.get('image')) {
        leavePayload.append('image', payload.get('image') as File);
      }
  
      return axios.post(url, leavePayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500
      toast.error(status === 400 ? 'Anda Sudah Mengajukan Izin' : status === 404 ? 'User Tidak Ditemukan' : 'Terjadi Kesalahan pada Server');
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries('checkById');
      toast.success("Anda Berhasil Mengajukan Izin");
    },
  });
  
}

/**
 * Fetches the list of leave types for the given role type.
 *
 * @param {string} roleType The role type to fetch the leave types for.
 *
 * @returns {UseQueryResult<AxiosResponse, AxiosError>} The result of the query.
 */
function useLeaveTypes(roleType: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/leave-types/${roleType}`;

  return useQuery({
    queryKey: ['leaveTypes', roleType],
    queryFn: async () => axios.get(url),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
}

function useQrin() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/qrinManual`;
  const queryClient = useQueryClient();
  
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: QrData) => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }

      const user = JSON.parse(userString);

      const payload = {
        user_id: user.id, // Kirim user ID
        qr_code_id: data.qr_code_id,
        latitude: data.latitude,
        longitude: data.longitude,
      };

      return axios.post(url, payload);
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500;
      const statusText =
        status === 400 ? "Anda tidak memiliki jadwal" :
        status === 403 ? "Anda berada di luar radius yang diizinkan" :
        status === 404 ? "QR Code tidak ditemukan" :
        "Terjadi kesalahan pada server";

      console.error("Qrin Error:", error);
      toast.error(statusText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("attendance");
      toast.success("Qrin Berhasil");
    },
  });

  return {
    Qrin: mutate,
    loadQrin: isLoading,
  };
}

function useQrout() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/qroutManual`;
  const queryClient = useQueryClient();
  
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: QrData) => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }

      const user = JSON.parse(userString);

      const payload = {
        user_id: user.id, // Kirim user ID
        qr_code_id: data.qr_code_id,
        latitude: data.latitude,
        longitude: data.longitude,
      };

      return axios.post(url, payload);
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500;
      const statusText =
        status === 400 ? "Anda sudah check-out" :
        status === 403 ? "Anda berada di luar jangkauan" :
        status === 404 ? "QR Code tidak ditemukan" :
        "Terjadi kesalahan pada server";

      console.error("Qrout Error:", error);
      toast.error(statusText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("attendance");
      toast.success("Qrout Berhasil");
    },
  });

  return {
    Qrout: mutate,
    loadQrout: isLoading,
  };
}


export {
  useQrin,
  useQrout,
  useCheckIn,
  useCheckOut,
  useLeave,
  useLeaveTypes,
  useCheckById
}