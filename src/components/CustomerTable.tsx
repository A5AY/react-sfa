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
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
import { customerListApi } from "../api/customerListApi";


type Props = {
    customers: Customer[];
    onSelectChange?: (ids: number[]) => void;
    onCreate?: () => void;
};


export default function CustomerTable({ customers, onSelectChange }: Props) {
    const [selected, setSelected] = useState<Customer | null>(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openListDialog, setOpenListDialog] = useState(false);
    const [listErrorOpen, setListErrorOpen] = useState(false);


    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [newListName, setNewListName] = useState("");
    const [selectedListId, setSelectedListId] = useState<number | "">("");
    const [lists, setLists] = useState<{ id: number; name: string }[]>([]);

    const deleteCustomer = useCustomerStore((state) => state.deleteCustomer);

    const allChecked = customers.length > 0 && selectedIds.length === customers.length;
    const navigate = useNavigate();

    const handleCheck = (id: number) => {
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


    const handleCreateList = async () => {
    const newList = await customerListApi.create(newListName);
    await customerListApi.addCustomers(newList.id, selectedIds);

    setNewListName("");
    setOpenListDialog(false);
};
    
    // 既存リストに追加
    const handleAddToExistingList = async () => {
    await customerListApi.addCustomers(selectedListId as number, selectedIds);

    setSelectedListId("");
    setOpenListDialog(false);
};

    // 既存リスト一括取得
    const fetchLists = async () => {
        const data = await customerListApi.getAll();
        setLists(data);
    };

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
                            fetchLists();
                            setOpenListDialog(true);
                        }
                    }}

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
                <DialogContent sx={{ mt: 2 }}>

                    {/* 新規リスト作成 */}
                    <Stack spacing={2} sx={{ mb: 4 }}>
                        <Typography variant="subtitle1">新規リストを作成</Typography>
                        <TextField
                            label="リスト名"
                            fullWidth
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={handleCreateList}
                            disabled={!newListName}
                        >
                            作成して追加
                        </Button>
                    </Stack>

                    {/* 既存リストに追加 */}
                    <Stack spacing={2}>
                        <Typography variant="subtitle1">既存リストに追加</Typography>

                        <FormControl fullWidth>
                            <InputLabel>リストを選択</InputLabel>
                            <Select
                                value={selectedListId}
                                label="リストを選択"
                                onChange={(e) => setSelectedListId(Number(e.target.value))}
                            >
                                {lists.map((list) => (
                                    <MenuItem key={list.id} value={list.id}>
                                        {list.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            onClick={handleAddToExistingList}
                            disabled={!selectedListId}
                        >
                            追加
                        </Button>
                    </Stack>

                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenListDialog(false)}>閉じる</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
