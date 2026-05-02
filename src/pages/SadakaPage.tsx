import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiHeart,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useAuth } from "../lib/AuthContext";
import { orders, profiles } from "../lib/supabaseClient";

interface DonationState {
  amount: number;
  customAmount: string;
  provider: "mpesa" | "tigopesa" | "airtel" | "halo" | "none";
  pin: string;
  showPinInput: boolean;
  message: string;
}

interface DonationRecord {
  user_id: string;
  amount: number;
  provider: string;
  message: string;
  status: string;
}

export function SadakaPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [donation, setDonation] = React.useState<DonationState>({
    amount: 5000,
    customAmount: "",
    provider: "none",
    pin: "",
    showPinInput: false,
    message: "",
  });

  // Predefined donation amounts in TZS
  const donationAmounts = [
    { value: 5000, label: "Tsh 5,000" },
    { value: 10000, label: "Tsh 10,000" },
    { value: 25000, label: "Tsh 25,000" },
    { value: 50000, label: "Tsh 50,000" },
    { value: 100000, label: "Tsh 100,000" },
  ];

  // Ensure user is logged in
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const getAmountToUse = () => {
    return donation.customAmount
      ? parseInt(donation.customAmount)
      : donation.amount;
  };

  const handleDonationAmountClick = (amount: number) => {
    setDonation((prev) => ({
      ...prev,
      amount,
      customAmount: "",
    }));
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDonation((prev) => ({
      ...prev,
      customAmount: value,
    }));
  };

  const handleProviderSelect = (
    provider: "mpesa" | "tigopesa" | "airtel" | "halo",
  ) => {
    setDonation((prev) => ({
      ...prev,
      provider,
      showPinInput: true,
    }));
  };

  const handlePINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonation((prev) => ({
      ...prev,
      pin: e.target.value.slice(0, 4),
    }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDonation((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };

  const handlePINSubmit = async () => {
    if (donation.pin.length !== 4) {
      setError("PIN lazima iwe nambari 4");
      return;
    }

    if (!user) {
      setError("Lazima uwe umeingia kuendelea");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const amountToDonate = getAmountToUse();

      // Create a donation record in the orders table (using it for donations too)
      const donationData: DonationRecord = {
        user_id: user.id,
        amount: amountToDonate,
        provider: donation.provider,
        message: donation.message || "Sadaka",
        status: "pending",
      };

      const { error: createError } = await orders.createOrder({
        user_id: user.id,
        total_price: amountToDonate,
        items: JSON.stringify([
          {
            name: `Sadaka - ${donation.provider}`,
            quantity: 1,
            price: amountToDonate,
          },
        ]),
        delivery_address: `Sadaka: ${donation.message || "Sadaka bila ujumbe"}`,
        payment_method: donation.provider,
        payment_status: "pending",
        notes: `PIN: ${donation.pin}, Message: ${donation.message}`,
      });

      if (createError) throw createError;

      // Show success message
      setSuccess(true);
      setDonation({
        amount: 5000,
        customAmount: "",
        provider: "none",
        pin: "",
        showPinInput: false,
        message: "",
      });

      // Navigate to profile after 3 seconds
      setTimeout(() => {
        navigate("/profile?tab=orders");
      }, 3000);
    } catch (err: any) {
      setError("Kosa la kusubmit sadaka: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProviderName = (provider: string) => {
    const names: Record<string, string> = {
      mpesa: "M-Pesa",
      tigopesa: "TIGO Pesa",
      airtel: "Airtel Money",
      halo: "Halo Pesa",
    };
    return names[provider] || provider;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-amber-100 rounded-lg transition"
          >
            <FiArrowLeft size={24} className="text-amber-700" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-amber-900 flex items-center gap-2">
              <FiHeart size={32} className="text-red-600" />
              Sadaka
            </h1>
            <p className="text-gray-600 mt-1">
              Tafadhali jifunze kuchangia kwa njia ya simu ya pesa
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg flex items-start gap-4">
            <FiCheckCircle
              size={24}
              className="text-green-600 flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="font-semibold text-green-900 text-lg">
                Asante sana!
              </h3>
              <p className="text-green-800 mt-1">
                Sadaka yako ya Tsh {getAmountToUse().toLocaleString("sw-TZ")}{" "}
                imepokelewa kwa{" "}
                <span className="font-semibold">
                  {getProviderName(donation.provider)}
                </span>
              </p>
              <p className="text-sm text-green-700 mt-2">
                Unakondokezwa kwa {donation.message || "kwa sadaka yako"}
              </p>
              <p className="text-sm text-green-700 mt-1">
                Mkutanoni ni upande wa kushoto, unipendea kama ujinga?
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg flex items-start gap-4">
            <FiAlertCircle
              size={24}
              className="text-red-600 flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="font-semibold text-red-900">Kosa!</h3>
              <p className="text-red-800 mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Donation Amount Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Chagua Kiasi cha Sadaka
              </h2>

              {/* Preset Amounts */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount.value}
                    onClick={() => handleDonationAmountClick(amount.value)}
                    className={`p-4 rounded-lg font-semibold transition ${
                      donation.amount === amount.value && !donation.customAmount
                        ? "bg-amber-700 text-white shadow-lg"
                        : "bg-gray-100 text-black hover:bg-amber-100"
                    }`}
                  >
                    {amount.label}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Kiasi Maalum
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={donation.customAmount}
                      onChange={handleCustomAmount}
                      placeholder="Ingiza kiasi..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>
                  <span className="flex items-center text-gray-600 font-semibold">
                    TZS
                  </span>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Ujumbe (Hiyari)
              </h2>
              <textarea
                value={donation.message}
                onChange={handleMessageChange}
                placeholder="Andika ujumbe wako kwa Mungu..."
                maxLength={500}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <p className="text-sm text-gray-500 mt-2">
                {donation.message.length}/500 herufi
              </p>
            </div>

            {/* Payment Methods Section */}
            {!donation.showPinInput && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-black mb-6">
                  Njia ya Malipo
                </h2>
                <p className="text-gray-600 mb-6">
                  Chagua njia ya simu ya pesa unayopendelea
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "M-Pesa",
                      provider: "mpesa" as const,
                      color: "bg-gradient-to-br from-blue-500 to-blue-600",
                      icon: "📱",
                    },
                    {
                      name: "Airtel Money",
                      provider: "airtel" as const,
                      color: "bg-gradient-to-br from-red-500 to-red-600",
                      icon: "💳",
                    },
                    {
                      name: "TIGO Pesa",
                      provider: "tigopesa" as const,
                      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
                      icon: "💰",
                    },
                    {
                      name: "Halo Pesa",
                      provider: "halo" as const,
                      color: "bg-gradient-to-br from-purple-500 to-purple-600",
                      icon: "✨",
                    },
                  ].map((method) => (
                    <button
                      key={method.provider}
                      onClick={() => handleProviderSelect(method.provider)}
                      disabled={loading}
                      className={`${method.color} p-6 rounded-lg text-white font-semibold transition transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="text-4xl mb-2">{method.icon}</div>
                      <div>{method.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right */}
          <div>
            {/* Order Summary */}
            <div className="sticky top-20 bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-black mb-6">Muhtasari</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kiasi cha Sadaka:</span>
                  <span className="font-semibold text-black">
                    Tsh {getAmountToUse().toLocaleString("sw-TZ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Njia ya Malipo:</span>
                  <span className="font-semibold text-black">
                    {donation.provider === "none"
                      ? "Chagua..."
                      : getProviderName(donation.provider)}
                  </span>
                </div>
                {donation.message && (
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600">Ujumbe:</span>
                    <span className="font-semibold text-black text-right max-w-xs">
                      {donation.message.substring(0, 30)}
                      {donation.message.length > 30 ? "..." : ""}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-black">Jumla:</span>
                  <span className="text-2xl font-bold text-amber-700">
                    Tsh {getAmountToUse().toLocaleString("sw-TZ")}
                  </span>
                </div>
              </div>

              {/* PIN Input Modal */}
              {donation.showPinInput && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-black mb-4">Ingiza PIN Yako</h4>
                  <input
                    type="password"
                    inputMode="numeric"
                    value={donation.pin}
                    onChange={handlePINChange}
                    placeholder="****"
                    maxLength={4}
                    className="w-full text-center text-3xl font-bold tracking-widest px-4 py-3 border-2 border-amber-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    PIN yako haitasongezwa
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() =>
                        setDonation((prev) => ({
                          ...prev,
                          showPinInput: false,
                          pin: "",
                          provider: "none",
                        }))
                      }
                      disabled={loading}
                      className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg transition disabled:opacity-50"
                    >
                      Ghairi
                    </button>
                    <button
                      onClick={handlePINSubmit}
                      disabled={loading || donation.pin.length !== 4}
                      className="flex-1 px-4 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition disabled:opacity-50"
                    >
                      {loading ? "Inakusubmit..." : "Tuma Sadaka"}
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                <p className="text-sm text-amber-900">
                  <strong>Karibu sana!</strong> Sadaka yako itasaidia kuendeleza
                  huduma zetu za kikristo na kusambaza Injili.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
