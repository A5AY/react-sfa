import { create } from "zustand";
import { customerApi } from "../api/customerApi";

export type Customer = {
  id: string;
  name: string;
  company: string;
};

type CustomerStore = {
  customers: Customer[];
  fetchCustomers: () => Promise<void>;
  addCustomer: (c: Omit<Customer, "id">) => Promise<void>;
  updateCustomer: (c: Customer) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
};

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],

  fetchCustomers: async () => {
    const data = await customerApi.getAll();
    set({ customers: data });
  },

  addCustomer: async (c) => {
    const newCustomer = await customerApi.create(c);
    set((state) => ({
      customers: [...state.customers, newCustomer],
    }));
  },

  updateCustomer: async (c) => {
    const updated = await customerApi.update(c);
    set((state) => ({
      customers: state.customers.map((x) =>
        x.id === updated.id ? updated : x
      ),
    }));
  },

  deleteCustomer: async (id) => {
    await customerApi.delete(id);
    set((state) => ({
      customers: state.customers.filter((x) => x.id !== id),
    }));
  },
}));
