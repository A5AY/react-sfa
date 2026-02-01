import { useState, useEffect } from "react";
import { TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useCustomerStore } from "../store/useCustomerStore";
import CustomerTable from "../components/CustomerTable";

// 顧客一覧画面
export default function CustomerListPage() {

    const customers = useCustomerStore((state) => state.customers);

    const [nameQuery, setNameQuery] = useState("");
    const [companyQuery, setCompanyQuery] = useState("");
    const [addressQuery, setAddressQuery] = useState("");
    const [emailQuery, setEmailQuery] = useState("");
    const [phoneQuery, setPhoneQuery] = useState("");
    const [industryQuery, setIndustryQuery] = useState("");

    useEffect(() => {
        useCustomerStore.getState().fetchCustomers();
    }, []);

    const safe = (v: string | undefined) => (v ?? "").toLowerCase();

    const filtered = customers.filter((c) => {
        return (
            safe(c.name).includes(nameQuery.toLowerCase()) &&
            safe(c.company).includes(companyQuery.toLowerCase()) &&
            safe(c.address).includes(addressQuery.toLowerCase()) &&
            safe(c.email).includes(emailQuery.toLowerCase()) &&
            safe(c.phone).includes(phoneQuery.toLowerCase()) &&
            safe(c.industry).includes(industryQuery.toLowerCase())
        );
    });

    const industryList = ["建設業", "IT", "飲食"];

    return (
        <div style={{ width: "100%" , display: "flex", flexDirection: "column"}}>
            <h2>顧客検索</h2>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TextField label="名前" value={nameQuery} onChange={(e) => setNameQuery(e.target.value)} sx={{ width: "200px" }} />
                <TextField label="会社名" value={companyQuery} onChange={(e) => setCompanyQuery(e.target.value)} sx={{ width: "200px" }} />
                <TextField label="住所" value={addressQuery} onChange={(e) => setAddressQuery(e.target.value)} sx={{ width: "200px" }} />
                <TextField label="メールアドレス" value={emailQuery} onChange={(e) => setEmailQuery(e.target.value)} sx={{ width: "200px" }} />
                <TextField label="電話番号" value={phoneQuery} onChange={(e) => setPhoneQuery(e.target.value)} sx={{ width: "200px" }} />

                <FormControl sx={{ width: "200px" }}>
                    <InputLabel>業種</InputLabel>
                    <Select value={industryQuery} label="業種" onChange={(e) => setIndustryQuery(e.target.value)}>
                        <MenuItem value="">（すべて）</MenuItem>
                        {industryList.map((item) => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="outlined"
                    onClick={() => {
                        setNameQuery("");
                        setCompanyQuery("");
                        setAddressQuery("");
                        setEmailQuery("");
                        setPhoneQuery("");
                        setIndustryQuery("");
                    }}
                    sx={{ width: "120px", fontSize: "10px", ml: "auto" }}
                >
                    クリア
                </Button>
            </Stack>

            <h2>顧客一覧</h2>

            <CustomerTable
                customers={filtered}
            />

        </div>
    );
}
