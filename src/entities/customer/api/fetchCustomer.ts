import {apiClient} from "@/src/shared/api/apiClient";
import {Customer} from "@/src/entities/customer/model/types";

export const fetchCustomer = async (): Promise<Customer> => {
  const response = await apiClient.get<Customer>(`/Customers/profile-me`);
  return response.data;
};