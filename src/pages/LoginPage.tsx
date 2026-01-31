import { useState } from "react";
import { TextField, Button, Paper, Stack, Typography } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const ok = login(username, password);
    if (ok) {
      navigate("/");
    } else {
      setError("ユーザー名またはパスワードが違います");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Paper sx={{ p: 3, maxWidth: 400, margin: "0 auto" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          ログイン
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button variant="contained" onClick={handleLogin}>
            ログイン
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
