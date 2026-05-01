import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";

export function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold text-black mb-8">
            Terms of Service
          </h1>

          {/* Content */}
          <div className="space-y-6 text-black/80">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                1. Ukubali wa Masharti
              </h2>
              <p>
                Kwa kuomba tovuti hii, unakubali haya masharti. Ikiwa huna
                kubali, tafadhali usitumie tovuti.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                2. Takwimu za Huduma
              </h2>
              <p>
                Oscar Mkatoliki inatoa huduma za kuuza bidhaa kupitia tovuti.
                Huduma hii inatolewa "kama ilivyo" bila dhamana yoyote.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                3. Mikataba ya Mtu Binafsi
              </h2>
              <p className="mb-3">Unakubali kuwa:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Utumia tovuti kwa madhumuni yanayoruhusiwa tu</li>
                <li>
                  Hutaweka, kuharamu, au kuanika maelezo ya siri wa tovuti
                </li>
                <li>Hutacheleza akina mji au huduma yoyote</li>
                <li>
                  Hutabadilisha au kugandua habari yoyote iliyotolewa kwenye
                  tovuti
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                4. Agizo la Bidhaa
              </h2>
              <p className="mb-3">Wakati wa kuagiza bidhaa:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Taarifa ambayo unatoa lazima iwe sahihi na kamili</li>
                <li>Unawajibika kuwa na akaunti ya mtandao salama</li>
                <li>Unakamatia mikataba ya kuuza na kuuza kwa fasa zozote</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                5. Bei na Malipo
              </h2>
              <p>
                Bei zote zimejumlishwa kwa USD au bei iliyotajwa. Tunahubiri
                malipo yenye usalama kupitia njia za fedha zilizomkubali. Wewe
                unawajibika kwa adhimisho lolote la kodi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                6. Ongezeko na Kurudi
              </h2>
              <p className="mb-3">Kwa mingine wa kubadilikuza au kurudi:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Bidhaa lazima irejee katika hali ya asili na kisifu kisifu
                </li>
                <li>Kurejesha bidhaa lazima kufanywa ndani ya siku 30</li>
                <li>
                  Fedha itarudishwa ndani ya siku 14 kutokana na kupokelewa kwa
                  bidhaa
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                7. Nyumba Sana
              </h2>
              <p className="mb-3">
                Oscar Mkatoliki haiwezi kuwa na jukumu kwa:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Hasara yoyote isiyokuwa na moja kwa moja yanayotokana na
                  huduma
                </li>
                <li>Kuzungukwa kwa kulazimika kwa sababu nzuri</li>
                <li>Kupoteza au kutozingatiwa data</li>
                <li>Uamuzi wowote wa mtandao au nyingine</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                8. Kumfanya Hadharani - Haki za Tafsiri
              </h2>
              <p>
                Bidhaa zote juu ya tovuti, kama kumbukata, muundo, kuandika,
                picha, na video, ni mali ya Oscar Mkatoliki. Hutaruhusiwi
                kukamatia, kusambaza, au kufanya kazi mpya bila ruhusa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                9. Hadi Ambayo Inakabidi Sheria
              </h2>
              <p>
                Masharti haya yatakabidwa na sheria ya nchi ambako Oscar
                Mkatoliki inatokea. Wajibu yowote unaweza kutatuliwa kwa
                mahakama katika nchi hiyo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                10. Mabadiliko Kwa Masharti
              </h2>
              <p>
                Tunaweza kubadilisha masharti haya wakati wowote. Kama tunatumia
                huduma baada ya mabadiliko, tunakuwa tunakubali masharti mapya.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                11. Wasiliana Nasi
              </h2>
              <p>
                Kwa maswali kuhusu masharti haya au kujua zaidi, tafadhali
                wasiliana nasi kupitia anwani ya baruapepe iliyosimu kwenye
                tovuti.
              </p>
            </section>

            <div className="mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-black/60">
                Masharti haya ilisasishwa mwisho mnamo{" "}
                {new Date().getFullYear()}. Ikiwa una maswali, tafadhali
                wasiliana nasi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
