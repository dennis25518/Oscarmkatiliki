import * as React from "react";
import {
  products as productsApi,
  maswali as maswaliApi,
} from "../lib/supabaseClient";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  file_url: string;
}

export function HomePage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [contactForm, setContactForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState("");

  // Fetch products from Supabase on mount
  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await productsApi.getAllProducts();
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage("");

    try {
      const { data, error } = await maswaliApi.createMessage({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || null,
        message: contactForm.message,
      });

      if (error) throw error;

      setSubmitMessage("✅ Ujumbe wako umefika, asante!");
      setContactForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitMessage(""), 5000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setSubmitMessage("❌ Kosa: Ujumbe halijafika. Tafadhali jaribu tena.");
    } finally {
      setSubmitting(false);
    }
  };

  const addToCart = (productId: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(
      (item: { id: number }) => item.id === productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Trigger storage event for other tabs/windows
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      {/* Hero Section */}
      <section
        id="nyumbani"
        className="min-h-screen bg-orang-100 flex items-center justify-center px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        </div>

        <div className="text-center max-w-5xl mx-auto py-12 relative z-10">
          <div className="mb-8 inline-block">
            <span className="px-4 py-3 rounded-full bg-amber-100 border border-amber-400 text-amber-800 text-sm font-semibold flex items-center">
              <span className="beeping-dot"></span>
              JIFUNZE NA KUWA KIROHO
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 tracking-tight leading-tight">
            Pata Chakula cha Kiroho{" "}
            <span className="bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent">
              Na Imarika Kiimani
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-black mb-10 leading-relaxed max-w-3xl mx-auto pb-4">
            Imarisha maisha yako ya sala popote ulipo. Kuza imani yako kwa kila
            kurasa unayosoma.
          </p>

          <div className="flex flex-row gap-4 justify-center mb-16 flex-wrap">
            <a
              href="/#bidhaa"
              className="px-8 py-4 bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-800 hover:to-yellow-800 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl inline-block"
            >
              Jipatie Nakala Yako
            </a>
            <a
              href="/register"
              className="px-8 py-4 border-2 border-amber-700 text-black hover:bg-amber-50 font-bold rounded-lg transition duration-300 inline-block"
            >
              Jifunze Zaidi
            </a>
          </div>

          {/* Profile Avatars and Reviews - Horizontal Layout */}
          <div className="flex items-center justify-center gap-6 text-black">
            {/* Profile Avatars with Wave Animation */}
            <div className="flex gap-2">
              {[
                "/Asset/user1.jpg",
                "/Asset/user2.jpg",
                "/Asset/user3.jpg",
                "/Asset/user4.jpg",
              ].map((avatar, index) => (
                <div
                  key={index}
                  className="profile-avatar w-12 h-12 rounded-full border-3 border-amber-200 overflow-hidden shadow-md"
                >
                  <img
                    src={avatar}
                    alt={`Profile ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Reviews Section */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Ungana na Wakristo 10K+
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="bidhaa" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-center max-w-5xl mx-auto py-12 relative z-10">
          <div className="mb-8 inline-block">
            <span className="px-4 py-3 rounded-full bg-amber-100 border border-amber-400 text-amber-800 text-sm font-semibold flex items-center">
              <span className="beeping-dot"></span>
              JIPATIE NAKALA YAKO
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
              Chakula cha Kiroho
            </h2>
            <p className="text-xl text-black max-w-2xl leading-relaxed">
              Vimeandaliwa kwa umakini maalum kwa ajili ya mahitaji yako ya
              kiroho.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">Inakupakia bidhaa...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">Hakuna bidhaa inayopatikana</p>
              </div>
            ) : (
              products.map((product) => (
                <a
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden block no-underline flex flex-col"
                >
                  {/* Product Image Container */}
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain bg-gray-50 p-2"
                      />
                    ) : (
                      <span className="text-5xl opacity-30">📚</span>
                    )}
                  </div>

                  {/* Product Info Container */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    {/* Top Section */}
                    <div className="space-y-2 mb-3">
                      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                        Digital Book
                      </p>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                    </div>

                    {/* Bottom Section - Price & Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-lg font-bold text-gray-900">
                        Tsh {product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product.id);
                        }}
                        className="px-4 py-2 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-semibold text-sm rounded-md transition duration-200"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block px-8 py-3 border-2 border-amber-700 text-amber-700 hover:bg-amber-50 font-bold rounded-lg transition duration-300"
            >
              Tazama Zaidi
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="maswali" className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Column */}
            <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start">
              <div className="mb-6">
                <span className="px-4 py-2 rounded-full bg-amber-100 border border-amber-400 text-amber-800 text-xs font-bold uppercase tracking-widest inline-block text-left flex items-center">
                  <span className="beeping-dot"></span>
                  Maswali na Majibu
                </span>
              </div>

              <h2 className="text-5xl lg:text-6xl pt-4 font-bold text-black mb-8 tracking-tight leading-tight text-left">
                Maswali Yanayoulizwa Mara kwa Mara
              </h2>

              <p className="text-lg text-gray-700 pt-4 leading-relaxed mb-6 font-medium text-left">
                Kila kitu unachohitaji kujua kuhusu Kitabu cha Dini, Maombi, na
                Sacramentals yetu na jinsi ya kumiliki.
              </p>

              <p className="text-base text-gray-500 leading-relaxed mb-12 pt-4 text-left">
                Tafuta jibu kwa swali lako au wasiliana nasi moja kwa moja kwa
                majibu ya haraka na huduma nzuri.
              </p>

              <a
                href="/#mawasiliano"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 mt-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-full transition duration-300 w-fit shadow-lg hover:shadow-xl text-base"
              >
                Uliza Swali Hapa
                <span className="text-2xl">→</span>
              </a>
            </div>

            {/* Right Column - FAQ Items */}
            <div className="border-2 border-gray-200 rounded-2xl overflow-hidden">
              {[
                {
                  question:
                    "Jinsi gani ya kununua Kitabu au Maombi yenye Dini?",
                  answer:
                    "Ni rahisi! Chagua Kitabu au Maombi unayotaka, tambua bei, kisha fuata hatua za malipo. Tunakubali mtandao wa simu, kadi za benki, na njia nyingine salama za malipo. Baada ya malipo, utapokea zako mara moja.",
                },
                {
                  question: "Kitabu cha Dini kinatumwa kwa njia gani?",
                  answer:
                    "Vitabu vyote vinatumwa kwa digital PDF au EPUB baada ya kumaliza kulipa. Kama unataka nuskhah ya karatasi, toa ombi la kuchapisha na tutaleta iwe kwako karibu mwishoni mwa wiki.",
                },
                {
                  question: "Je, ni nini na karibu na Sacramentals?",
                  answer:
                    "Sacramentals ni vitu vya kidini kama rosary, kitabu cha maombi, na madini ya kuzuu. Tunatoa kila kitu na wezesha ili kujenga haba yako ya kidini. Kila sacramental imechaguliwa kwa makini kwa ajili yako.",
                },
                {
                  question: "Naweza kurudi Kitabu au kumfuta agizo lango?",
                  answer:
                    "Ndiyo! Kama sio sawa na Kitabu au Maombi baada ya kupokea, toa ombi la kurudi ndani ya siku 14 tutarudisha pesa yako. Hii ni karabuni yenye upendo kwa wagombewa wangu.",
                },
                {
                  question: "Kasi gani ya kutumwa na kufika Sacramental yangu?",
                  answer:
                    "Vitabu vya digital hukuja mara moja baada ya malipo. Vile vya karatasi hukuja ndani ya siku 5-7. Kuhusu Sacramentals, kila kitu kina sababu yake na hukuja kwa kasi na imani.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group border-t-2 border-gray-200 last:border-b-0 first:border-t-0 cursor-pointer"
                >
                  <summary className="flex justify-between items-center w-full px-7 py-6 font-semibold text-black text-base hover:bg-amber-50 transition hover:translate-x-1 duration-300">
                    <span className="text-left text-gray-900">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 ml-6 inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700 group-open:rotate-45 transition transform duration-300">
                      <span className="text-lg font-light">+</span>
                    </div>
                  </summary>
                  <div className="px-7 py-6 bg-amber-50 border-t-2 border-gray-200 text-gray-700 text-sm leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="mawasiliano" className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Column */}
            <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start">
              <div className="mb-6">
                <span className="px-4 py-2 rounded-full bg-amber-100 border border-amber-400 text-amber-800 text-xs font-bold uppercase tracking-widest inline-block text-left flex items-center">
                  <span className="beeping-dot"></span>
                  Mawasiliano
                </span>
              </div>

              <h2 className="text-5xl lg:text-6xl pt-4 font-bold text-black mb-8 tracking-tight leading-tight text-left">
                Wasiliana Nasi
              </h2>

              <p className="text-lg text-gray-700 pt-4 leading-relaxed mb-6 font-medium text-left">
                Kwa mawasiliano zaidi, tuachie ujumbe wako hapa chini
              </p>

              <div className="space-y-6 w-full text-left">
                <div className="flex items-start gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1 ">
                    <MdEmail className="text-2xl text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">
                      Barua Pepe
                    </h3>
                    <p className="text-gray-600">info@oscarmkatoliki.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <MdPhone className="text-2xl text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Simu</h3>
                    <p className="text-gray-600">+255 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <MdLocationOn className="text-2xl text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Mahali</h3>
                    <p className="text-gray-600">Dar es Salaam, Tanzania</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-black mb-8">
                Tumia Ujumbe Hapa
              </h3>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="space-y-2">
                  <label className="block text-sm text-left font-semibold text-gray-800">
                    Jina Lako *
                  </label>
                  <input
                    type="text"
                    placeholder="Jina kamili"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-left font-semibold text-gray-800">
                    Barua Pepe *
                  </label>
                  <input
                    type="email"
                    placeholder="barua@example.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-left font-semibold text-gray-800">
                    Simu
                  </label>
                  <input
                    type="tel"
                    placeholder="+255 123 456 789"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-left font-semibold text-gray-800">
                    Ujumbe *
                  </label>
                  <textarea
                    placeholder="Andika ujumbe wako hapa..."
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent transition text-gray-900 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                {submitMessage && (
                  <div
                    className={`p-3 rounded-lg text-center font-semibold ${
                      submitMessage.includes("✅")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-8 py-3 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {submitting ? "Inatuma..." : "Tuma Ujumbe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
      </footer>
    </>
  );
}
