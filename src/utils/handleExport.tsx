import Encoding from "encoding-japanese";
import type { Customer } from "../store/useCustomerStore";

// CSVエクスポート関数
export const handleExport = (selectedIds: number[], customers: Customer[]) => {
    if (selectedIds.length === 0) {
        alert("エクスポートする顧客が選択されていません");
        return;
    }

    const selectedCustomers = customers.filter((c) =>
        selectedIds.includes(c.id)
    );

    const header = "名前,会社名,住所,メール,電話番号,業種";
    const rows = selectedCustomers.map((c) =>
        [
            c.name,
            c.company,
            c.address ?? "",
            c.email ?? "",
            c.phone ?? "",
            c.industry ?? "",
        ].join(",")
    );

    const csv = [header, ...rows].join("\n");

    // Shift-JIS 変換
    const sjisArray = Encoding.convert(Encoding.stringToCode(csv), {
        to: "SJIS",
        from: "UNICODE",
    });

    const blob = new Blob([new Uint8Array(sjisArray)], {
        type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
    URL.revokeObjectURL(url);
};
