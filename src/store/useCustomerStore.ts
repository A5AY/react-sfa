import { create } from "zustand";
import { customerApi } from "../api/customerApi";

export type Customer = {
    id: number;
    name: string;
    company: string;
    address: string;
    email: string;
    phone: string;
    industry: string;
};

type CustomerStore = {
    customers: Customer[];
    fetchCustomers: () => Promise<void>;
    addCustomer: (c: Omit<Customer, "id">) => Promise<void>;
    updateCustomer: (c: Customer) => Promise<void>;
    deleteCustomer: (id: number) => Promise<void>;
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

    deleteCustomer: async (id: number) => {
        await customerApi.delete(id);
        set((state) => ({
            customers: state.customers.filter((x) => x.id !== id),
        }));
    },
}));
