import { useQuery } from '@tanstack/react-query';
import { fetchCustomer } from './fetchCustomer';

export const useCustomer = () => {
  return useQuery({
    queryKey: ['customerProfile'],
    queryFn: fetchCustomer,
  });
}