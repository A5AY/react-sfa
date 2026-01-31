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
    Checkbox,
} from "@mui/material";
import { useState } from "react";
import type { Customer } from "../store/useCustomerStore";
import EditCustomerDialog from "./EditCustomerDialog";
import DeleteCustomerDialog from "./DeleteCustomerDialog";
import { Link } from "react-router-dom";
import { useCustomerStore } from "../store/useCustomerStore";

type Props = { customers: Customer[] };

export default function CustomerTable({ customers }: Props) {
    const [selected, setSelected] = useState<Customer | null>(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const deleteCustomer = useCustomerStore((state) => state.deleteCustomer);

    const handleCheck = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const handleBulkDelete = async () => {
        for (const id of selectedIds) {
            await deleteCustomer(id);
        }
        setSelectedIds([]);
    };

    const handleEdit = (customer: Customer) => {
        setSelected(customer);
        setOpenEdit(true);
    };

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button
                    variant="contained"
                    color="error"
                    disabled={selectedIds.length === 0}
                    onClick={handleBulkDelete}
                >
                    削除
                </Button>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>名前</TableCell>
                            <TableCell>会社名</TableCell>
                            <TableCell>住所</TableCell>
                            <TableCell>メールアドレス</TableCell>
                            <TableCell>電話番号</TableCell>
                            <TableCell>操作</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {customers.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIds.includes(c.id)}
                                        onChange={() => handleCheck(c.id)}
                                    />
                                </TableCell>

                                <TableCell>{c.id}</TableCell>
                                <TableCell>{c.name}</TableCell>
                                <TableCell>{c.company}</TableCell>
                                <TableCell>{c.address}</TableCell>
                                <TableCell>{c.email}</TableCell>
                                <TableCell>{c.phone}</TableCell>

                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button variant="outlined" component={Link} to={`/customers/${c.id}`}>
                                            詳細
                                        </Button>
                                        <Button variant="outlined" onClick={() => handleEdit(c)}>
                                            編集
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <EditCustomerDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                customer={selected}
            />

            <DeleteCustomerDialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                customer={selected}
            />
        </>
    );
}
