import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Paper,
    Stack,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { useCustomerStore } from "../store/useCustomerStore";
import { useNavigate } from "react-router-dom";
import { industryApi } from "../api/industryApi";
import type { Industry } from "../api/industryApi";

export default function CustomerCreatePage() {
    const addCustomer = useCustomerStore((state) => state.addCustomer);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [industry, setIndustry] = useState("");

    // DB から業種一覧を取得
    const [industries, setIndustries] = useState<Industry[]>([]);

    useEffect(() => {
        industryApi.getAll().then((data) => {
            setIndustries(data);
        });
    }, []);

    const handleSubmit = async () => {
        if (!name || !company || !industry) return;
        await addCustomer({ name, company, address, email, phone, industry });
        navigate("/");
    };

    return (
        <div style={{ padding: 20 }}>
            <Paper sx={{ p: 3, maxWidth: 500, margin: "0 auto" }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    顧客登録
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="名前"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        label="会社名"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />

                    <TextField
                        label="住所"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <TextField
                        label="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="電話番号"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <FormControl fullWidth>
                        <InputLabel>業種</InputLabel>
                        <Select
                            value={industry}
                            label="業種"
                            onChange={(e) => setIndustry(e.target.value)}
                        >
                            {industries.map((item) => (
                                <MenuItem key={item.id} value={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="contained" onClick={handleSubmit}>
                        登録
                    </Button>

                    <Button variant="outlined" onClick={() => navigate("/")}>
                        一覧に戻る
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
}
