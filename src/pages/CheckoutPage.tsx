import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDownload,
} from "react-icons/fi";
import { useAuth } from "../lib/AuthContext";
import {
  orders,
  profiles,
  products as productsApi,
  storage,
} from "../lib/supabaseClient";

const PRODUCTS = {
  1: {
    id: 1,
    name: "Ibada ya Kikatholiki",
    price: 2999,
    description: "Jifunze kuhusu ibada na rituals za Kanisa Katoliki",
    image: "✝️",
  },
  2: {
    id: 2,
    name: "Mafundisho ya Bibilia",
    price: 1999,
    description: "Elimu ya kina kuhusu Bibilia na ujumbe wake",
    image: "📖",
  },
  3: {
    id: 3,
    name: "Historia ya Kanisa",
    price: 4999,
    description: "Historia ya Kanisa Katoliki Duniani kote",
    image: "⛪",
  },
  4: {
    id: 4,
    name: "Sala na Maombi",
    price: 2499,
    description: "Mbinu za usahihi wa sala na maombi ya dini",
    image: "🙏",
  },
};

interface CartItem {
  id: number;
  quantity: number;
}

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useState<CheckoutForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Load cart from localStorage
  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = PRODUCTS[item.id as keyof typeof PRODUCTS];
      return total + product.price * item.quantity;
    }, 0);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!user) {
      setError("Lazima uwe umeingia kuendelea");
      setLoading(false);
      return;
    }

    try {
      // Create order items array
      const orderItems = cartItems.map((item) => {
        const product = PRODUCTS[item.id as keyof typeof PRODUCTS];
        return {
          product_id: item.id.toString(),
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        };
      });

      // Create order in Supabase
      const { data: orderData, error: orderError } = await orders.createOrder({
        user_id: user.id,
        order_number: `ORD-${Date.now()}`,
        total: calculateTotal(),
        status: "pending",
        items: orderItems,
      });

      if (orderError) {
        setError("Kosa la kuunda agizo: " + orderError.message);
        setLoading(false);
        return;
      }

      // Update user profile with checkout info
      const { error: profileError } = await profiles.updateProfile(user.id, {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });

      if (profileError) {
        console.warn("Profile update warning:", profileError);
      }

      // Download ebooks for each product in the order
      for (const item of orderItems) {
        try {
          const productId = parseInt(item.product_id);
          const { data: productData } = await productsApi.getProduct(productId);

          if (productData && productData.file_url) {
            // Extract file name from URL or use product name
            const fileName = `${item.name}.pdf`;
            await storage.downloadEbook(productData.file_url, fileName);
          }
        } catch (downloadErr) {
          console.warn(`Failed to download ${item.name}:`, downloadErr);
        }
      }

      // Clear cart from localStorage
      localStorage.setItem("cart", JSON.stringify([]));
      window.dispatchEvent(new Event("storage"));

      // Navigate to success page or profile
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Hitilafu isiyojulikana iliotokea");
      setLoading(false);
    }
  };

  const total = calculateTotal();
  const itemCount = cartItems.length;

  // If no items in cart, redirect to cart page
  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-6">
            Karata yako ni tupu. Chunguza mafundisho yetu!
          </p>
          <button
            onClick={() => navigate("/cart")}
            className="inline-block px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg transition"
          >
            Rudi kwenye Karata
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Back Link */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate("/cart")}
          className="text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-2"
        >
          <FiArrowLeft size={20} /> Rudi
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-black mb-8">
          Hakiki Hazina Yako
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Taarifa za Kukamatia
              </h2>

              {error && (
                <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-left text-xs font-semibold text-black mb-2 uppercase tracking-wide"
                  >
                    Jina Lako
                  </label>
                  <div className="relative">
                    <FiUser
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Juma Ahmed"
                      required
                      className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-left text-xs font-semibold text-black mb-2 uppercase tracking-wide"
                  >
                    Anwani ya Barua Pepe
                  </label>
                  <div className="relative">
                    <FiMail
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="juma@mfano.com"
                      required
                      className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition text-sm"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-left text-xs font-semibold text-black mb-2 uppercase tracking-wide"
                  >
                    Nambari ya Simu
                  </label>
                  <div className="relative">
                    <FiPhone
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+255 7xx xxx xxx"
                      required
                      className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition text-sm"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-left text-xs font-semibold text-black mb-2 uppercase tracking-wide"
                  >
                    Anwani ya Kukamatia
                  </label>
                  <div className="relative">
                    <FiMapPin
                      className="absolute left-4 top-3 text-gray-400"
                      size={18}
                    />
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Mtaa, Jiji, Kaunti"
                      required
                      rows={3}
                      className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-6"
                >
                  {loading ? "Inakusajifu..." : "Jingilia Malipo"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-black mb-6">
                Muhtasari wa Agizo
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {cartItems.map((item) => {
                  const product = PRODUCTS[item.id as keyof typeof PRODUCTS];
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="text-sm font-semibold text-black">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Idadi: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-amber-700">
                        Tsh {product.price * item.quantity}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Jumla ya Kozi:</span>
                  <span className="font-semibold">{itemCount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Malipo ya Msaada:</span>
                  <span className="font-semibold">Tsh 0</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="bg-amber-50 border-2 border-amber-700 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-black">
                    Jumla ya Kulipa:
                  </span>
                  <span className="text-2xl font-bold text-amber-700">
                    Tsh {total}
                  </span>
                </div>
              </div>

              {/* Info Text */}
              <p className="text-xs text-gray-600 text-center">
                Baada ya kumjaza fomu, utarudi kwenye ukurasa wa malipo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
