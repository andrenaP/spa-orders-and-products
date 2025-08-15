import { Link } from "react-router-dom";

function Products({
  products,
  orders,
  deleteProduct,
  formatDate,
  selectedType,
  setSelectedType,
}) {
  const uniqueTypes = [...new Set(products.map((p) => p.type))];
  const filteredProducts = selectedType
    ? products.filter((p) => p.type === selectedType)
    : products;

  const getOrderTitle = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    return order ? order.title : "No Order";
  };

  return (
    <div>
      <h2>Products</h2>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">All Types</option>
        {uniqueTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {filteredProducts.map((product) => {
        const priceUSD =
          product.price.find((pr) => pr.symbol === "USD")?.value || 0;
        const priceUAH =
          product.price.find((pr) => pr.symbol === "UAH")?.value || 0;

        return (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
            }}
          >
            <h3>{product.title}</h3>
            <p>Type: {product.type}</p>
            <p>
              Guarantee Start (ISO):{" "}
              {formatDate(product.guarantee.start, "iso")}
            </p>
            <p>
              Guarantee End (ISO): {formatDate(product.guarantee.end, "iso")}
            </p>
            <p>
              Price: {priceUSD} USD / {priceUAH} UAH
            </p>
            <p>Order: {getOrderTitle(product.order_id)}</p>
            <button onClick={() => deleteProduct(product.id)}>
              Delete Product
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
