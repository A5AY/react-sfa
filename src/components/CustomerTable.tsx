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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
} from "@mui/material";
import { useState } from "react";
import type { Customer } from "../store/useCustomerStore";
import EditCustomerDialog from "./EditCustomerDialog";
import DeleteCustomerDialog from "./DeleteCustomerDialog";
import { Link } from "react-router-dom";
import { useCustomerStore } from "../store/useCustomerStore";
import { handleImport } from "../utils/handleImport";
import { handleExport } from "../utils/handleExport";
import { handleDownloadTemplate } from "../utils/handleDownloadTemplate";
import { useNavigate } from "react-router-dom";

type Props = {
    customers: Customer[];
    onSelectChange?: (ids: string[]) => void;
    onCreate?: () => void;
};


export default function CustomerTable({ customers, onSelectChange }: Props) {
    const [selected, setSelected] = useState<Customer | null>(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openListDialog, setOpenListDialog] = useState(false);
    const [listErrorOpen, setListErrorOpen] = useState(false);


    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const deleteCustomer = useCustomerStore((state) => state.deleteCustomer);

    const allChecked = customers.length > 0 && selectedIds.length === customers.length;
    const navigate = useNavigate();

    const handleCheck = (id: string) => {
        setSelectedIds((prev) => {
            const newIds = prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id];
            onSelectChange?.(newIds);
            return newIds;
        });
    };


    const handleCheckAll = () => {
        const newIds = allChecked
            ? [] : customers.map((c) => c.id);
        setSelectedIds(newIds);
        onSelectChange?.(newIds)
            ;
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleBulkDelete = () => {
        setOpenConfirm(true);
    };

    const confirmDelete = async () => {
        for (const id of selectedIds) {
            await deleteCustomer(id);
        }
        setSelectedIds([]);
        onSelectChange?.([]);
        setOpenConfirm(false);
        setSnackbarOpen(true);
    };

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                justifyContent={"flex-start"}
                sx={{ mb: "2", width: "100%", display: "flex" }}
            >
                {/* 削除ボタン */}
                <Button
                    variant="contained"
                    color="error"
                    disabled={selectedIds.length === 0}
                    onClick={handleBulkDelete}
                >
                    削除
                </Button>

                {/* 顧客登録 */}
                <Button
                    variant="contained"
                    onClick={() => navigate("/customers/new")}
                >
                    顧客登録
                </Button>

                {/* 顧客リスト登録 */}
                <Button
                    variant="contained"
                    onClick={() => {
                        if (selectedIds.length === 0) {
                            setListErrorOpen(true);
                        } else {
                            setOpenListDialog(true);
                        }
                    }
                    }
                >
                    顧客リスト
                </Button>

                {/* インポート */}
                <Button
                    variant="contained"
                    component="label">
                    インポート
                    <input type="file" accept=".csv" hidden onChange={handleImport} />
                </Button>

                {/* エクスポート */}
                <Button
                    variant="contained"
                    onClick={() => handleExport(selectedIds, customers)}>
                    エクスポート
                </Button>

                {/* テンプレートDL */}
                <Button
                    variant="contained"
                    onClick={handleDownloadTemplate}>
                    テンプレートDL
                </Button>

            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    checked={allChecked}
                                    onChange={handleCheckAll}
                                />
                            </TableCell>

                            <TableCell>ID</TableCell>
                            <TableCell>名前</TableCell>
                            <TableCell>会社名</TableCell>
                            <TableCell>住所</TableCell>
                            <TableCell>メールアドレス</TableCell>
                            <TableCell>電話番号</TableCell>
                            <TableCell>業種</TableCell>
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
                                <TableCell>{c.industry}</TableCell>

                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button variant="outlined" component={Link} to={`/customers/${c.id}`}>
                                            詳細
                                        </Button>
                                        <Button variant="outlined" onClick={() => { setSelected(c); setOpenEdit(true); }}>
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

            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle>削除確認</DialogTitle>
                <DialogContent>
                    {selectedIds.length} 件の顧客を削除します。よろしいですか？
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>キャンセル</Button>
                    <Button color="error" variant="contained" onClick={confirmDelete}>
                        削除する
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity="success" variant="filled">
                    削除しました
                </Alert>
            </Snackbar>

            <Dialog open={listErrorOpen} onClose={() => setListErrorOpen(false)}>
                <DialogTitle>エラー</DialogTitle>
                <DialogContent>顧客を選択してください。</DialogContent>
                <DialogActions>
                    <Button onClick={() => setListErrorOpen(false)}>OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openListDialog} onClose={() => setOpenListDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>顧客リストに追加</DialogTitle>
                <DialogContent>
                    {/* ここに「新規リストに追加」「既存リストに追加」のUIを後で作る */}
                    機能はこれから実装します。
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenListDialog(false)}>閉じる</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
