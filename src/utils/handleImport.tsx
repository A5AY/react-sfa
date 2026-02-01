import { useCustomerStore } from "../store/useCustomerStore";

// CSVインポート関数
export const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n").map((l) => l.trim());

    for (const line of lines) {
        const [name, company, address, email, phone, industry] = line.split(",");

        await useCustomerStore.getState().addCustomer({
            name,
            company,
            address,
            email,
            phone,
            industry,
        });
    }
};
