import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Income from "./pages/Income";

function App() {
  return (
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
  );
}

export default App;
