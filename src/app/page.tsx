import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      inventories: {
        include: {
          warehouse: true,
        },
      },
    },
  });

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Allo Inventory System
      </h1>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded"
          >
            <h2 className="text-xl font-semibold">
              {product.name}
            </h2>

            <p>{product.description}</p>

            <p className="mt-2">
              Price: ₹{product.price}
            </p>

            <div className="mt-3">
              <h3 className="font-medium">
                Warehouse Stock
              </h3>

              {product.inventories.map((inventory) => (
                <div
                  key={inventory.id}
                  className="ml-4"
                >
                  • {inventory.warehouse.name} :
                  {" "}
                  {inventory.quantity}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}