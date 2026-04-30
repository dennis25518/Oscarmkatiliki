import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiArrowLeft,
} from "react-icons/fi";
import { auth, profiles } from "../lib/supabaseClient";

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Maneno ya siri hayalingani!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Nenosiri lazima liwe na angalau herufi 6");
      return;
    }

    setLoading(true);

    try {
      // Sign up with Supabase
      const { data: signUpData, error: signUpError } = await auth.signup(
        formData.email,
        formData.password,
        formData.name,
      );

      if (signUpError) {
        setError(signUpError.message || "Kuandika kumefailiwa");
        setLoading(false);
        return;
      }

      if (signUpData.user) {
        // Create user profile in database
        const { error: profileError } = await profiles.createProfile({
          id: signUpData.user.id,
          email: formData.email,
          name: formData.name,
          phone: "",
          address: "",
          profile_picture: null,
        });

        if (profileError) {
          setError("Kosa la kuundwa kwa profaili");
          setLoading(false);
          return;
        }

        navigate("/login");
      }
    } catch (err: any) {
      setError(err.message || "Hitilafu isiyojulikana iliotokea");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex gap-6 bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Left Side - Image */}
        <div
          className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage:
              "url(/Asset/the-blessed-virgin-mary-4376984_1280.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 text-gray-600 hover:text-gray-800 transition p-2"
            aria-label="Rudi Nyuma"
          >
            <FiArrowLeft size={20} />
          </button>
          <div className="w-full max-w-sm">
            <h2 className="text-lg font-bold text-black mb-6">
              Fungua Akaunti
            </h2>
            <p className="text-gray-600 mb-10 text-sm">
              Jiandikishe na kuanza kusoma
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-left text-xs font-semibold text-black mb-1 mt-10n uppercase tracking-wide"
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
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-black focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none transition placeholder-gray-400"
                    placeholder="Juma Seif"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-left text-xs font-semibold text-black mb-1 uppercase tracking-wide"
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
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-black focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none transition placeholder-gray-400"
                    placeholder="wewe@mfano.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-left text-xs font-semibold text-black mb-1 uppercase tracking-wide"
                >
                  Nenosiri
                </label>
                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-2 border border-gray-300 rounded-md bg-white text-sm text-black focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none transition placeholder-gray-400"
                    placeholder="Ingiza nenosiri"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-left text-xs font-semibold text-black mb-1 uppercase tracking-wide"
                >
                  Thibitisha Nenosiri
                </label>
                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type={showConfirm ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-2 border border-gray-300 rounded-md bg-white text-sm text-black focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none transition placeholder-gray-400"
                    placeholder="Thibitisha nenosiri"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                  >
                    {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  loading ||
                  !formData.name ||
                  !formData.email ||
                  !formData.password ||
                  !formData.confirmPassword
                }
                className="w-full px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-4"
              >
                {loading ? "Inakusajili..." : "Fungua Akaunti"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-6 text-xs">
              Una akaunti tayari?{" "}
              <a
                href="/login"
                className="text-amber-700 hover:text-amber-600 font-bold"
              >
                Ingia
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
