import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
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

    // open が true になった瞬間に初期値をセット
    if (open && customer && name === "" && company === "") {
        setName(customer.name);
        setCompany(customer.company);
        setAddress(customer.address);
        setEmail(customer.email);
        setPhone(customer.phone);
    }

    const handleSave = () => {
        if (!customer) return;

        updateCustomer({
            id: customer.id,
            name,
            company,
            address,
            email,
            phone,
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
