import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeProductsUser from "./pages/HomeProductsUser";
import HomeProductsAdmin from "./pages/HomeProductsAdmin";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Product from "./pages/Product";
import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <h1>TechZone</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home User</Link>
              </li>
              <li>
                <Link to="/admin">Home Admin</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<HomeProductsUser />} />
          <Route path="/admin" element={<HomeProductsAdmin />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <p>&copy; 2024 TechZone.</p>
      </footer>
    </div>
  );
}

export default App;
