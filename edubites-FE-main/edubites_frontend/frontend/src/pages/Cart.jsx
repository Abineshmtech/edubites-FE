import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getCart, removeFromCart, setCart, updateCartQty } from "../utils/cart";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0),
    [cartItems]
  );

  const updateQty = (id, nextQty) => {
    updateCartQty(id, nextQty);
    setCartItems(getCart());
  };

  const removeItem = (id) => {
    removeFromCart(id);
    setCartItems(getCart());
    toast.success("Removed from cart");
  };

  const clearAll = () => {
    setCart([]);
    setCartItems([]);
    toast.success("Cart cleared");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Cart</h1>
        {cartItems.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear
          </Button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-gray-500">Your cart is empty</p>
          <Button className="mt-4" onClick={() => navigate("/canteen")}>
            Browse Canteen
          </Button>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : null}
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{item.price * (item.qty || 1)}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-2"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">Quantity</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                      disabled={(item.qty || 1) <= 1}
                    >
                      -
                    </Button>
                    <span className="min-w-8 text-center font-medium text-gray-800">
                      {item.qty || 1}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-800">Subtotal</p>
              <p className="text-lg font-semibold text-gray-800">₹{total}</p>
            </div>
            <Button className="mt-4 w-full" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}

