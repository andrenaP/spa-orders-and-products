import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const link = process.env.REACT_APP_API_URL || "http://localhost:3001";
const socket = io(link);

function TopMenu({ sessionCount }) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString("ru-RU"),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("ru-RU"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 right-0 p-4 flex items-center space-x-4 text-gray-800">
      <span>{currentTime}</span>
      <span>Активные сессии: {sessionCount}</span>
    </div>
  );
}

function App() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [sessionCount, setSessionCount] = useState(0);

  // const location = useLocation();
  // API
  const fetchOrders = () => {
    fetch(link + "/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  };

  const fetchProducts = () => {
    fetch(link + "/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  const getProductsForOrder = (orderId) =>
    products.filter((p) => p.order_id === orderId);

  const calculateSum = (orderId, symbol) => {
    const prods = getProductsForOrder(orderId);
    return prods.reduce((sum, p) => {
      const price = p.price.find((pr) => pr.symbol === symbol);
      return sum + (price ? price.value : 0);
    }, 0);
  };

  const deleteOrder = (orderId) => {
    fetch(link + `/api/orders/${orderId}`, {
      method: "DELETE",
    }).then(() => {
      setShowPopup(false);
      setOrderToDelete(null);
      if (selectedOrderId === orderId) setSelectedOrderId(null);
      fetchOrders();
    });
  };

  const deleteProduct = (productId) => {
    fetch(`link + `/api/products/${productId}`, {
      method: "DELETE",
    }).then(() => fetchProducts());
  };

  function OrdersPage() {
    const productsForSelected = selectedOrderId
      ? getProductsForOrder(selectedOrderId)
      : [];

    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
          width: "100%",
        }}
      >
        {/* RIGHT: orders list (always visible) */}
        <div style={{ flex: 1, border: "1px solid #ccc" }}>
          <Orders
            orders={orders}
            getProductsForOrder={getProductsForOrder}
            calculateSum={calculateSum}
            formatDate={formatDate}
            setSelectedOrderId={setSelectedOrderId}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            orderToDelete={orderToDelete}
            setOrderToDelete={setOrderToDelete}
            deleteOrder={deleteOrder}
          />
        </div>

        {selectedOrderId && (
          <div
            style={{
              flex: "0 0 380px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedOrderId(null)}
              title="Close"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#ddd",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                fontWeight: "bold",
                lineHeight: "28px",
              }}
            >
              ×
            </button>

            <Products
              products={productsForSelected}
              orders={orders}
              deleteProduct={deleteProduct}
              formatDate={formatDate}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
        )}
      </div>
    );
  }

  function formatDate(dateStr, formatType) {
    const date = new Date(dateStr.replace(" ", "T"));
    if (formatType === "iso") {
      return date.toISOString().slice(0, 19).replace("T", " ");
    } else {
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    }
  }

  useEffect(() => {
    fetchOrders();
    fetchProducts();

    socket.on("sessionCount", (count) => {
      setSessionCount(count);
    });
    socket.on("ordersUpdated", fetchOrders);
    socket.on("productsUpdated", fetchProducts);

    return () => {
      socket.off("sessionCount");
      socket.off("ordersUpdated");
      socket.off("productsUpdated");
    };
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "50%", // Slide in from right
    },
    in: {
      opacity: 1,
      x: 0, // Center position
    },
    out: {
      opacity: 0,
      x: "-50%", // Slide out to left
    },
  };

  // Transition settings
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  function AnimatedRoutes({
    products,
    orders,
    deleteProduct,
    formatDate,
    selectedType,
    setSelectedType,
  }) {
    const location = useLocation();

    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <div>Home</div>
              </motion.div>
            }
          />
          <Route
            path="/income"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <></>
              </motion.div>
            }
          />
          <Route
            path="/orders"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <OrdersPage />
              </motion.div>
            }
          />
          <Route
            path="/products"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Products
                  products={products}
                  orders={orders}
                  deleteProduct={deleteProduct}
                  formatDate={formatDate}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
              </motion.div>
            }
          />
          <Route
            path="/users"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <div>Users</div>
              </motion.div>
            }
          />
          <Route
            path="/settings"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <div>Settings</div>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <>
      {/* top header stays separate; Layout remains intact */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <img alt="logo" src="image.png" />
          <h1 style={{ textTransform: "uppercase", color: "green" }}>
            invertory
          </h1>
        </div>
        <TopMenu sessionCount={sessionCount} />
      </div>

      <BrowserRouter>
        <Layout>
          <AnimatedRoutes
            products={products}
            orders={orders}
            deleteProduct={deleteProduct}
            formatDate={formatDate}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;

