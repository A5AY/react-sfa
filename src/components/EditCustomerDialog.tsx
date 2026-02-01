import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import type { Customer } from "../store/useCustomerStore";
import { useCustomerStore } from "../store/useCustomerStore";

type Props = {
    open: boolean;
    onClose: () => void;
    customer: Customer | null;
};

export default function EditCustomerDialog({ open, onClose, customer }: Props) {
    const updateCustomer = useCustomerStore((state) => state.updateCustomer);

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [industry, setIndustry] = useState("");

    if (open && customer && name === "" && company === "") {
        setName(customer.name);
        setCompany(customer.company);
        setAddress(customer.address);
        setEmail(customer.email);
        setPhone(customer.phone);
        setIndustry(customer.industry);
    }

    // 業種リスト
    const industryList = ["建設業", "IT", "飲食"];

    const handleSave = () => {
        if (!customer) return;

        updateCustomer({
            id: customer.id,
            name,
            company,
            address,
            email,
            phone,
            industry,
        });

        onClose();
        setName("");
        setCompany("");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>顧客情報を編集</DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="名前"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="会社名"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="住所"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="電話番号"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel>業種</InputLabel>
                        <Select
                            value={industry}
                            label="業種"
                            onChange={(e) => setIndustry(e.target.value)}
                        >
                            {industryList.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>キャンセル</Button>
                <Button variant="contained" onClick={handleSave}>
                    保存
                </Button>
            </DialogActions>
        </Dialog>
    );
}
