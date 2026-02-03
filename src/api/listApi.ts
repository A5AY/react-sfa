const BASE_URL = "http://localhost:3001/lists";

export const listApi = {
  async getAll() {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  async createList(name: string) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return res.json();
  },

  async addToList(listId: number, customerIds: string[]) {
    const res = await fetch(`${BASE_URL}/${listId}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerIds }),
    });
    return res.json();
  },
};
