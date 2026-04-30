import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { products as productsAPI } from "../lib/supabaseClient";
import type { Product } from "../lib/supabaseClient";

interface CartItem {
  id: number;
  quantity: number;
}

export function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);
  const [productDetails, setProductDetails] = React.useState<
    Record<number, Product>
  >({});
  const [loading, setLoading] = React.useState(true);
  const isFirstRender = React.useRef(true);

  // Fetch all products and load cart
  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch all products for suggestions and cart lookup
        const { data: productsData, error: productsError } =
          await productsAPI.getAllProducts();

        if (!productsError && productsData) {
          setAllProducts(productsData);

          // Create a map of products by ID for quick lookup
          const productMap: Record<number, Product> = {};
          productsData.forEach((product) => {
            productMap[product.id] = product;
          });
          setProductDetails(productMap);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Load cart from localStorage on mount and listen for changes
  React.useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    loadCart();

    // Listen for changes from other tabs/components
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        loadCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save cart to localStorage whenever it changes (but skip first render)
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // Dispatch storage event so Navbar badge updates
    window.dispatchEvent(new Event("storage"));
  }, [cartItems]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const addItem = (id: number) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      updateQuantity(id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { id, quantity: 1 }]);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = productDetails[item.id];
      if (!product) return total;
      return total + product.price * item.quantity;
    }, 0);
  };

  const itemsInCart = cartItems.length;
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <a
          href="/"
          className="text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-2 w-fit"
        >
          ← Rudi
        </a>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-black mb-10 pb-4">
          Kapu Lako ({itemsInCart})
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-6 pb-6">
              Kapu Lako ni tupu, linasubiri baraka.!
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg transition"
            >
              Burudani Mafundisho
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = productDetails[item.id];
                  if (!product) return null;
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl">📚</span>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-black mb-3">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-700">
                            Tsh {product.price.toLocaleString("sw-TZ")}
                          </span>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex flex-col items-end justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1 text-gray-600 hover:text-black transition"
                          >
                            <FiMinus size={16} />
                          </button>
                          <span className="px-4 py-1 text-black font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 text-gray-600 hover:text-black transition"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>

                        {/* Total Price and Delete */}
                        <div className="text-right mt-2">
                          <p className="text-sm text-gray-600 mb-2">
                            Jumla: Tsh{" "}
                            {(product.price * item.quantity).toLocaleString(
                              "sw-TZ",
                            )}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 transition"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-20">
                <h2 className="text-xl font-bold text-black mb-6">
                  Muhtasari wa Hazina Zako
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Jumla ya Hazina:</span>
                    <span>{itemsInCart}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Jumla ya Gharama:</span>
                    <span className="font-semibold">Tsh {total}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg transition"
                  >
                    Nenda Kwenye Malipo
                  </button>
                  <a
                    href="/"
                    className="block w-full px-6 py-3 border-2 border-amber-700 text-black hover:bg-amber-50 font-semibold rounded-lg transition text-center"
                  >
                    Tazama Hazina Zaidi
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-8 pb-6">
            Hazina Zaidi
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {allProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-lg transition overflow-hidden"
              >
                {/* Product Image */}
                <div className="h-40 bg-white flex items-center justify-center border-b border-gray-100 group-hover:from-amber-100 group-hover:to-yellow-100 transition overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition duration-300">
                      📚
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-black mb-3 line-clamp-2 group-hover:text-amber-700 transition">
                    {product.name}
                  </h3>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-700">
                      Tsh {product.price.toLocaleString("sw-TZ")}
                    </span>
                    <button
                      onClick={() => addItem(product.id)}
                      className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded transition"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200 py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-black/60">
                &copy; 2024 Oscar Mkatoliki. Haki zote zimehifadhiwa.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-black hover:text-amber-700 transition"
                >
                  <span className="text-xl">𝕏</span>
                </a>
                <a
                  href="#"
                  className="text-black hover:text-amber-700 transition"
                >
                  <span className="text-xl">f</span>
                </a>
                <a
                  href="#"
                  className="text-black hover:text-amber-700 transition"
                >
                  <span className="text-xl">in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
