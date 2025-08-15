import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      top
      <nav className="bg-blue-600 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/income" className="hover:underline">
              приход
            </Link>
          </li>
          <li>
            <Link to="/groups" className="hover:underline">
              группы
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:underline">
              продукты
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:underline">
              пользователи
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover:underline">
              настройки
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
}

export default Layout;
