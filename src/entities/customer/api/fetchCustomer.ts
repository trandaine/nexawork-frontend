import {apiClient} from "@shared/api/apiClient";
import {Customer} from "@entities/customer/model/types";

export const fetchCustomer = async (): Promise<Customer> => {
  const response = await apiClient.get<Customer>(`/Customers/profile-me`);
  return response.data;
};