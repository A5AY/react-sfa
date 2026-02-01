import Encoding from "encoding-japanese";

// CSVテンプレートダウンロード関数
export const handleDownloadTemplate = () => {
    const header = "名前,会社名,住所,メール,電話番号,業種\n";

    const sjisArray = Encoding.convert(Encoding.stringToCode(header), {
        to: "SJIS",
        from: "UNICODE",
    });

    const blob = new Blob([new Uint8Array(sjisArray)], {
        type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customer_template.csv";
    a.click();
    URL.revokeObjectURL(url);
};
