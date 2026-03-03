import { useState } from "react";
import { MdSearch } from "react-icons/md";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { orderHistory } from "../data/dummyData";
import toast from "react-hot-toast";

const statusVariants = {
  Delivered: "success",
  Preparing: "info",
  Cancelled: "danger",
};

export default function OrderHistoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  // initialize with built-in dummy data plus any orders saved by checkout
  const [orders, setOrders] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    return [...orderHistory, ...saved];
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.items.some((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    ) || order.id.toString().includes(search);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleReorder = (order) => {
    toast.success("Order placed! Items added to cart.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
        <p className="text-gray-500 mt-1">View your past orders</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 focus:border-edubites-sky outline-none"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Delivered", "Preparing", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === status
                  ? "bg-edubites-sky text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card className="p-12 text-center text-gray-500">
            No orders found
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500">Order #{order.id}</span>
                    <Badge variant={statusVariants[order.status] || "default"}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-gray-700">
                        {item.name} x{item.qty} — ₹{item.price * item.qty}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-800">₹{order.total}</span>
                  {order.status === "Delivered" && (
                    <Button size="sm" variant="outline" onClick={() => handleReorder(order)}>
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
