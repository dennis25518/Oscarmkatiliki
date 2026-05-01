import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";

export function PrivacyPolicyPage() {
  return (
    <>
      
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-left">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/" className="text-amber-700 hover:text-amber-800">
              ← Rudi 
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-black mb-8">Privacy Policy</h1>

          {/* Content */}
          <div className="space-y-6 text-black/80">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                1. Utangulizi
              </h2>
              <p>
                Oscar Mkatoliki ("nasi," "sisi," au "kampuni yetu") inatosha kwa
                faragha yako. Sera hii inaeleza jinsi tunavyo kukusanya,
                kutumia, na kulinganisha habari yako wakati unakutembea kwenye
                tovuti yetu na wanapotumia huduma zetu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                2. Habari Tunazoikusanya
              </h2>
              <p className="mb-3">
                Tunaweza kukusanya aina zifuatazo za habari:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Habari ya Mtu Binafsi:</strong> Jina, anwani ya
                  baruapepe, namba ya simu, na taarifa nyingine unazotoa moja
                  kwa moja
                </li>
                <li>
                  <strong>Habari ya Nchi:</strong> Dirisha la mtambo, kazi ya
                  simu, na mahali unakokuwa
                </li>
                <li>
                  <strong>Habari ya Tabia Milele:</strong> Jinsi unavyotembea
                  tovuti yetu, bidhaa unazocheki, na jinsi unavyoandika
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                3. Jinsi Tunavyotumia Taarifa Yako
              </h2>
              <p className="mb-3">Tunatumia habari ili:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Kusambaza huduma na kuboresha kazipereka</li>
                <li>
                  Kukutekelezea agizo lako na kumfanya harakati zinazohitajika
                </li>
                <li>Kutuma taarifa zinazohusiana na huduma</li>
                <li>Kurekebisha na kulinda usalama wa tovuti</li>
                <li>Kuzingatiwa na sheria inayotumika</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                4. Ushiriki wa Habari
              </h2>
              <p>
                Hatuwashiriki habari yako ya mtu binafsi na wahitaji wa tatu
                isipokuwa inapohitajika kutekeleza agizo lako, kupiga mtu
                mwingine, au kuzingatiwa na sheria.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                5. Usalama wa Habari
              </h2>
              <p>
                Tunajitahidi kulindia habari yako kwa kutumia usalama wa
                dijitali. Hata hivyo, hakuna njia ya kusambaza habari kupitia
                mtandao ni 100% salama.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                6. Vidakuvi
              </h2>
              <p>
                Tovuti yetu huhatua vidakuvi vya kukamatia taarifa kuhusu jinsi
                unavyotembea. Unaweza kubadilisha hali ya mtambo wako ili
                kukataza vidakuvi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                7. Haki Yako
              </h2>
              <p className="mb-3">Una haki:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Kuomba kuona habari tunayoyakusanya kuhusu wewe</li>
                <li>Kuomba marekebishaji au kufuta habari</li>
                <li>Kubadilisha mikataba yako kwa huduma za kukamatia</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                8. Mabadiliko Kwa Sera
              </h2>
              <p>
                Tunaweza kubadilisha sera hii kila wakati. Tutakufahamisha kwa
                njia zinazofaa juu ya mabadiliko yoyote mahidi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                9. Wasiliana Nasi
              </h2>
              <p>
                Kama una swali kuhusu sera hii au maombi kuhusu habari yako,
                tafadhali wasiliana nasi kupitia anwani ya baruapepe iliyosimu
                kwenye tovuti.
              </p>
            </section>

            <div className="mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-black/60">
                Sera hii ilisasishwa mwisho mnamo {new Date().getFullYear()}.
                Ikiwa una maswali, tafadhali wasiliana nasi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
