export default function Home() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>Allo Inventory System</h1>
      <p>Deployment Successful</p>

      <h2>API Endpoints</h2>
      <ul>
        <li>/api/products</li>
        <li>/api/warehouses</li>
        <li>/api/inventory</li>
        <li>/api/reservations</li>
      </ul>
    </main>
  );
}