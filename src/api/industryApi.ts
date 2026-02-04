export type Industry = {
  id: number;
  name: string;
};

const BASE_URL = "http://localhost:3001/industries";

export const industryApi = {
  async getAll(): Promise<Industry[]> {
    const res = await fetch(BASE_URL);
    return res.json();
  },
};
