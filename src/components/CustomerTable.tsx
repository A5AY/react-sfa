import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useCustomerStore } from "../store/useCustomerStore";
import type { Customer } from "../store/useCustomerStore";
import EditCustomerDialog from "./EditCustomerDialog";
import DeleteCustomerDialog from "./DeleteCustomerDialog";
import { Link } from "react-router-dom";


export default function CustomerTable() {
  const customers = useCustomerStore((state) => state.customers);

  const [selected, setSelected] = useState<Customer | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEdit = (customer: Customer) => {
    setSelected(customer);
    setOpenEdit(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelected(customer);
    setOpenDelete(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>会社名</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.company}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" component={Link} to={`/customers/${c.id}`} >
                      詳細
                    </Button>
                    <Button variant="outlined" onClick={() => handleEdit(c)}>
                      編集
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(c)}
                    >
                      削除
                    </Button>
                  </Stack>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 編集ダイアログ */}
      <EditCustomerDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        customer={selected}
      />

      {/* 削除ダイアログ */}
      <DeleteCustomerDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        customer={selected}
      />
    </>
  );
}
