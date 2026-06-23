import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://codevector-product-browser-oycb.onrender.com";

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Beauty",
  "Sports",
  "Toys",
  "Grocery",
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [limit, setLimit] = useState(10);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (cursor = null) => {
    try {
      setLoading(true);

      let url = `${API_URL}?limit=${limit}`;

      if (category !== "All") {
        url += `&category=${category}`;
      }

      if (cursor) {
        url += `&cursor=${encodeURIComponent(cursor)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      const fetchedProducts = Array.isArray(data.products)
        ? data.products
        : [];

      if (cursor) {
        setProducts((prev) => [...prev, ...fetchedProducts]);
      } else {
        setProducts(fetchedProducts);
      }

      setNextCursor(data.nextCursor || null);
    } catch (error) {
      console.error("Fetch products error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNextCursor(null);
    fetchProducts();
  }, [category, limit]);

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Product Browser</h1>
          <p>Browse 200,000 products with filters and cursor pagination.</p>
        </div>
        <div className="badge">200,000+ Products</div>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <h2>Filters</h2>

          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <label>Results per page</label>
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <div className="info">
            <h3>Cursor Pagination</h3>
            <p>
              The next page continues from the last product seen, preventing
              duplicates when new products are added.
            </p>
          </div>
        </aside>

        <section className="content">
          <div className="contentTop">
            <div>
              <h2>Products</h2>
              <p>Newest products first</p>
            </div>
          </div>

          {loading && products.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid">
              {products.map((product) => (
                <div className="card" key={product._id}>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="id">{product.productId}</p>
                  <strong>₹{product.price}</strong>
                  <small>
                    Updated: {new Date(product.updated_at).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}

          <div className="footer">
            <p>Showing {products.length} products</p>

            <button
              disabled={!nextCursor || loading}
              onClick={() => fetchProducts(nextCursor)}
            >
              {loading ? "Loading..." : "Next Page →"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}