import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import PaymentSelection from "../components/PaymentSelection";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [showUpiConfirm, setShowUpiConfirm] = useState(false);

  // grab the cart data from whatever mechanism the app already uses
  // here we fall back to localStorage so this page works out of the box
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const submitOrder = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, payment: paymentMethod }),
      });
      if (!resp.ok) throw new Error("Network response was not ok");
      await resp.json();

      if (paymentMethod === "COD") {
        toast.success("Order Placed Successfully");
      } else {
        toast.success("Payment Successful");
      }

      // persist new order for history page
      const newOrder = {
        id: Date.now(),
        items: cartItems,
        total,
        status: paymentMethod === "COD" ? "Preparing" : "Delivered",
        date: new Date().toLocaleDateString(),
      };
      const existing = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([...existing, newOrder]));

      // clear cart
      localStorage.removeItem("cart");
      setCartItems([]);

      navigate("/order-history");
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    } finally {
      setLoading(false);
      setShowUpiConfirm(false);
    }
  };

  const handleCheckout = () => {
    if (paymentMethod === "UPI") {
      // ask for confirmation first (mock)
      setShowUpiConfirm(true);
    } else {
      submitOrder();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

      {cartItems.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          Your cart is empty
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  {item.qty && (
                    <p className="text-sm text-gray-500">Qty {item.qty}</p>
                  )}
                </div>
                <p className="font-semibold text-gray-900">₹{item.price * (item.qty || 1)}</p>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold text-gray-800">Total</span>
            <span className="text-xl font-bold text-gray-800">₹{total}</span>
          </div>

          <PaymentSelection value={paymentMethod} onChange={setPaymentMethod} />

          <Button
            className="mt-6"
            disabled={loading}
            onClick={handleCheckout}
          >
            {loading ? "Processing..." : "Proceed"}
          </Button>

          <Modal
            isOpen={showUpiConfirm}
            onClose={() => setShowUpiConfirm(false)}
            title="Confirm UPI Payment"
          >
            <p>Do you want to confirm UPI payment of ₹{total}?</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUpiConfirm(false)}>
                Cancel
              </Button>
              <Button onClick={submitOrder} disabled={loading}>
                {loading ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
