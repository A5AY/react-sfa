import type { Customer } from "../store/useCustomerStore";

const BASE_URL = "http://localhost:3001/customers";

export const customerApi = {
  async getAll(): Promise<Customer[]> {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  async create(customer: Omit<Customer, "id">): Promise<Customer> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    return res.json();
  },

  async update(customer: Customer): Promise<Customer> {
    const res = await fetch(`${BASE_URL}/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    return res.json();
  },

  async delete(id: string): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  },
};
