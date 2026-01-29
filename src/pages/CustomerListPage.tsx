import { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "../store/useCustomerStore";
import { useAuthStore } from "../store/useAuthStore";
import CustomerTable from "../components/CustomerTable";

export default function CustomerListPage() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const customers = useCustomerStore((state) => state.customers);

    const [nameQuery, setNameQuery] = useState("");
    const [companyQuery, setCompanyQuery] = useState("");

    useEffect(() => {
        useCustomerStore.getState().fetchCustomers();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const filtered = customers.filter((c) => {
        const nameMatch = c.name.toLowerCase().includes(nameQuery.toLowerCase());
        const companyMatch = c.company.toLowerCase().includes(companyQuery.toLowerCase());
        return nameMatch && companyMatch;
    });

    return (
        <div style={{ padding: 20 }}>
            {/* ログアウト */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleLogout}
                    sx={{ fontSize: "10px", width: "200px" }}
                >
                    ログアウト
                </Button>
            </Stack>

            {/* 顧客登録 */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate("/customers/new")}
                    sx={{ fontSize: "10px", width: "200px" }}
                >
                    顧客登録
                </Button>
            </Stack>

            <h2>顧客検索</h2>

            <TextField
                label="検索（名前）"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
            />

            <TextField
                label="検索（会社名）"
                value={companyQuery}
                onChange={(e) => setCompanyQuery(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
            />
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setNameQuery("");
                        setCompanyQuery("");
                    }}
                    sx={{ width: "200px", fontSize: "10px" }}
                >
                    クリア
                </Button>
            </Stack>


            <h2>顧客一覧</h2>
            <CustomerTable customers={filtered} />
        </div>
    );
}
