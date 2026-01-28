import { useState } from "react";
import { TextField, Button, Paper, Stack } from "@mui/material";
import { useCustomerStore } from "../store/useCustomerStore";

export default function CustomerForm() {
  const addCustomer = useCustomerStore((state) => state.addCustomer);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async () => {
    if (!name || !company) return;

    // API に POST（id はサーバー側で付与される）
    await addCustomer({
      name,
      company,
    });

    // 入力欄をクリア
    setName("");
    setCompany("");
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Stack spacing={2}>
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

        <Button variant="contained" onClick={handleSubmit}>
          顧客を追加
        </Button>
      </Stack>
    </Paper>
  );
}
