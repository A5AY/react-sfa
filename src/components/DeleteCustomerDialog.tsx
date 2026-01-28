import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import type { Customer } from "../store/useCustomerStore";
import { useCustomerStore } from "../store/useCustomerStore";

type Props = {
  open: boolean;
  onClose: () => void;
  customer: Customer | null;
};

export default function DeleteCustomerDialog({ open, onClose, customer }: Props) {
  const deleteCustomer = useCustomerStore((state) => state.deleteCustomer);

  const handleDelete = () => {
    if (!customer) return;
    deleteCustomer(customer.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>削除確認</DialogTitle>

      <DialogContent>
        <Typography>
          {customer?.name}（{customer?.company}）を削除しますか？
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button color="error" variant="contained" onClick={handleDelete}>
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
