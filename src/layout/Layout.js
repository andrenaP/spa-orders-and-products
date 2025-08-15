import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ children }) {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/orders", label: "приход" },
    { path: "/groups", label: "группы" },
    { path: "/products", label: "продукты" },
    { path: "/users", label: "пользователи" },
    { path: "/settings", label: "настройки" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          width: "200px",
          minHeight: "100vh",
          backgroundColor: "#f0f0f0",
          padding: "1rem",
          // position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {navItems.map((item) => (
            <li
              key={item.path}
              style={{
                borderBottom:
                  location.pathname === item.path ? "2px solid green" : "none",
                paddingBottom: "4px",
              }}
            >
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "black" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main style={{ padding: "1rem", flex: 1 }}>{children}</main>
    </div>
  );
}
