import { fetchUserSubscriptions } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useUserSubscriptions = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchUserSubscriptions,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}