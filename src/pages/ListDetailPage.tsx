import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customerListApi } from "../api/customerListApi";
import CustomerTable from "../components/CustomerTable";
import type { Customer } from "../store/useCustomerStore";

export default function ListDetailPage() {
    const { id } = useParams();
    const listId = Number(id);

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [listName, setListName] = useState("");

    useEffect(() => {
        // リスト内顧客取得
        customerListApi.getCustomers(listId).then(setCustomers);

        // リスト名取得（一覧から取得）
        customerListApi.getAll().then((lists) => {
            const found = lists.find((l) => l.id === listId);
            if (found) setListName(found.name);
        });
    }, [listId]);

    return (
        <div style={{ padding: 20 }}>
            <h2>顧客リスト内顧客一覧</h2>
            <h3>{listName}</h3>

            <CustomerTable customers={customers} />
        </div>
    );
}
