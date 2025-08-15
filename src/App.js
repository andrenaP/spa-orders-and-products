import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Income from "./pages/Income";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function TopMenu() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString("ru-RU"),
  );
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("ru-RU"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("sessionCount", (count) => {
      setSessionCount(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 p-4 flex items-center space-x-4 text-gray-800">
      <span>{currentTime}</span>
      <span>Активные сессии: {sessionCount}</span>
    </div>
  );
}

function App() {
  return (
    <>
      <TopMenu></TopMenu>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
