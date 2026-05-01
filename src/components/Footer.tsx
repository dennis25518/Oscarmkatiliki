import { Link } from "react-router-dom";
import {
  FaTiktok,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLink,
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-amber-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content - 3 Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left Section - Branding */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg text-black mb-2">
              Oscar Mkatoliki
            </h3>
            <p className="text-sm text-black/60">
              &copy; {currentYear} Oscar Mkatoliki. Haki zote zimehifadhiwa.
            </p>
          </div>

          {/* Middle Section - Legal Links */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-sm text-black mb-4">Maalum</h3>
            <div className="flex flex-col gap-2 text-center">
              <Link
                to="/privacy-policy"
                className="text-sm text-black/70 hover:text-amber-700 transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-sm text-black/70 hover:text-amber-700 transition"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Right Section - Social Media Links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold text-sm text-black mb-4">
              Mitandao Yangu
            </h3>
            <div className="flex gap-6">
              <a
                href="https://www.tiktok.com/@oscar_mkatoliki?_r=1&_t=ZP-95Rs2HIasrH"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-amber-700 transition"
                aria-label="TikTok"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="https://www.instagram.com/oscarmkatoliki?igsh=MTdud3RhZ3E1bW9xNA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-amber-700 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/share/14h1YkwwpAi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-amber-700 transition"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.threads.com/@oscarmkatoliki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-amber-700 transition"
                aria-label="Threads"
              >
                <FaLink size={20} />
              </a>
              <a
                href="https://youtube.com/@oscarmkatoliki?si=c5N9YHwRXwuBoB1v"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-amber-700 transition"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-amber-200"></div>
      </div>
    </footer>
  );
}
