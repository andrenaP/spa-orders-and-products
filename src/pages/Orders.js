import { Link } from "react-router-dom";

function Orders({
  orders,
  getProductsForOrder,
  calculateSum,
  formatDate,
  setSelectedOrderId,
  showPopup,
  setShowPopup,
  orderToDelete,
  setOrderToDelete,
  deleteOrder,
}) {
  const handleDeleteClick = (id) => {
    setOrderToDelete(id);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    if (orderToDelete) deleteOrder(orderToDelete);
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>Orders</h2>
      {orders.map((order) => {
        const prods = getProductsForOrder(order.id);
        const count = prods.length;
        const sumUSD = calculateSum(order.id, "USD");
        const sumUAH = calculateSum(order.id, "UAH");

        return (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedOrderId(order.id)}
          >
            <h3>{order.title}</h3>
            <p>Products count: {count}</p>
            <p>Date (ISO): {formatDate(order.date, "iso")}</p>
            <p>Date (Locale): {formatDate(order.date, "locale")}</p>
            <p>
              Sum: {sumUSD} USD / {sumUAH} UAH
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(order.id);
              }}
            >
              Delete Order
            </button>
          </div>
        );
      })}

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            border: "1px solid black",
            zIndex: 2000,
          }}
        >
          <p>Are you sure you want to delete this order?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setShowPopup(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default Orders;
