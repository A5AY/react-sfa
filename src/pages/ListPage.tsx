import { useEffect, useState } from "react";
import { customerListApi } from "../api/customerListApi";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { CustomerList } from "../api/customerListApi";

export default function ListPage() {
  const [lists, setLists] = useState<CustomerList[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    customerListApi.getAll().then(setLists);
  }, []);

  const filtered = lists.filter((l) =>
    l.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>顧客リスト一覧</h2>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="リスト名で検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>リスト名</TableCell>
              <TableCell>作成日時</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((list) => (
              <TableRow key={list.id}>
                <TableCell>{list.id}</TableCell>
                <TableCell>{list.name}</TableCell>
                <TableCell>{list.created_at}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/lists/${list.id}`}
                  >
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
