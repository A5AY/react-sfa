import { useParams, Link } from "react-router-dom";
import { useCustomerStore } from "../store/useCustomerStore";
import { Paper, Typography, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import EditCustomerDialog from "../components/EditCustomerDialog";

// 顧客詳細画面
export default function CustomerDetailPage() {
    const { id } = useParams();
    const customers = useCustomerStore((state) => state.customers);
    const fetchCustomers = useCustomerStore((state) => state.fetchCustomers);

    const [openEdit, setOpenEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            await fetchCustomers();
            setLoading(false);
        };
        load();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: 20 }}>
                <Typography>読み込み中...</Typography>
            </div>
        );
    }

    const customer = customers.find((c) => c.id === String(id));

    console.log("🔍 詳細画面 customer:", customer);
    console.log("🔍 customers:", customers); 
    console.log("🔍 id:", id);

    if (!customer) {
        return (
            <div style={{ padding: 20 }}>
                <Typography>顧客が見つかりません。</Typography>
                <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
                    一覧に戻る
                </Button>
            </div>
        );
    }

    return (
        <div style={{ padding: 20 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5">{customer.name}</Typography>
                <Typography sx={{ mt: 1 }}>会社名: {customer.company}</Typography>
                <Typography sx={{ mt: 1 }}>住所: {customer.address}</Typography>
                <Typography sx={{ mt: 1 }}>メールアドレス: {customer.email}</Typography>
                <Typography sx={{ mt: 1 }}>電話番号: {customer.phone}</Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button variant="contained" onClick={() => setOpenEdit(true)}>
                        編集
                    </Button>

                    <Button component={Link} to="/" variant="outlined">
                        一覧に戻る
                    </Button>
                </Stack>
            </Paper>

            <EditCustomerDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                customer={customer}
            />
        </div>
    );
}
