import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

const fetchUser = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

export const useUser = () => {
  return useQuery({queryKey:['user'], queryFn: fetchUser});
};
