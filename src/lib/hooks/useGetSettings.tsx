import axios from "axios";
import { useQuery } from "react-query";

export function useGetSettings() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/getSettings`;

  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => axios.get(url),
    refetchInterval: 60000, // Refetch every 60 seconds,
    onError: (error) => console.log("Error:", error),
    onSuccess: (data) => console.log("Settings:", data),
  })

}