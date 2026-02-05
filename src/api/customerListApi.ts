export type CustomerList = {
  id: number;
  name: string;
  created_at: string;
};

const BASE_URL = "http://localhost:3001/lists";

export const customerListApi = {
  // 全リスト取得
  async getAll(): Promise<CustomerList[]> {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  // 新規リスト作成
  async create(name: string): Promise<CustomerList> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return res.json();
  },

  // 既存リストに顧客追加
  async addCustomers(listId: number, customerIds: number[]): Promise<void> {
    await fetch(`${BASE_URL}/${listId}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerIds }),
    });
  },
  
// リスト内顧客取得
  async getCustomers(listId: number) {
  const res = await fetch(`${BASE_URL}/${listId}/customers`);
  return res.json();
}

};
