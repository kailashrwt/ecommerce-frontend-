import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://ecommerce-backend-s1l7.onrender.com/api/order/my-orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(res.data.orders || []);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ShoppingBag /> My Orders
      </h1>

      {orders.length === 0 && (
        <p className="text-center text-gray-500">No orders yet.</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="p-4 mb-4 rounded-lg shadow-lg border border-gray-200"
        >
          <h2 className="font-semibold">
            Order ID:{" "}
            <span className="text-blue-500">{order._id}</span>
          </h2>

          <p>Status: <b>{order.status}</b></p>
          <p>Payment: <b>{order.paymentStatus}</b></p>
          <p>Total: ₹{order.totalAmount}</p>

          <div className="mt-4 space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx}>
                {item.product ? (
                  <div className="flex gap-4 items-center">
                    <img
                      src={`https://ecommerce-backend-s1l7.onrender.com${item.product.image}`}
                      className="w-16 h-16 rounded object-cover"
                      alt={item.product.name}
                    />
                    <div>
                      <p className="font-medium">
                        {item.product.name}
                      </p>
                      <p className="text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-red-500">
                    Product not available
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;


