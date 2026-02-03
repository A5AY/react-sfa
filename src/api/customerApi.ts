import type { Customer } from "../store/useCustomerStore";

const BASE_URL = "http://localhost:3001/customers";

export const customerApi = {
  // 全顧客取得
  async getAll(): Promise<Customer[]> {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  // 新規顧客作成
  async create(customer: Omit<Customer, "id">): Promise<Customer> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    return res.json();
  },

  // 顧客更新
  async update(customer: Customer): Promise<Customer> {
    const res = await fetch(`${BASE_URL}/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    return res.json();
  },

  // 顧客削除
  async delete(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  },
};
