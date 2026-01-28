import { useEffect } from "react";
import { useCustomerStore } from "../store/useCustomerStore";
import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";

export default function CustomerListPage() {

  useEffect(() => {
    useCustomerStore.getState().fetchCustomers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>顧客一覧</h2>
      <CustomerForm />
      <CustomerTable />
    </div>
  );
}
