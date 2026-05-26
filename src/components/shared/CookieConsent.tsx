import { useEffect, useState } from "react";
import { Cookie, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import {
  COOKIE_CONSENT_EVENT,
  defaultCookieConsent,
  readCookieConsent,
  saveCookieConsent,
  type CookieConsentPreferences,
} from "@/lib/cookie-consent";

const categoryCopy = [
  {
    key: "necessary" as const,
    title: "Essenciais",
    text: "Mantem seguranca, login administrativo, preferencias de privacidade e funcoes basicas do site.",
  },
  {
    key: "analytics" as const,
    title: "Analytics",
    text: "Reservado para ferramentas de medicao. Hoje nao ha analytics proprio ativo; se for instalado, so funcionara com autorizacao.",
  },
  {
    key: "marketing" as const,
    title: "Marketing",
    text: "Reservado para pixels e campanhas. Hoje nao ha pixel proprio ativo; se for instalado, so funcionara com autorizacao.",
  },
];

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [consentRecorded, setConsentRecorded] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(defaultCookieConsent);

  useEffect(() => {
    setMounted(true);

    const saved = readCookieConsent();
    if (saved) {
      setPreferences(saved);
      setConsentRecorded(true);
    } else {
      setVisible(true);
    }

    const openPreferences = () => {
      const current = readCookieConsent();
      setPreferences(current ?? defaultCookieConsent());
      setConsentRecorded(Boolean(current));
      setCustomizing(true);
      setVisible(true);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, openPreferences);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, openPreferences);
  }, []);

  const persist = (next: CookieConsentPreferences) => {
    saveCookieConsent(next);
    setPreferences(next);
    setConsentRecorded(true);
    setVisible(false);
    setCustomizing(false);
  };

  const acceptAll = () =>
    persist({
      ...defaultCookieConsent(),
      analytics: true,
      marketing: true,
    });

  const necessaryOnly = () => persist(defaultCookieConsent());

  const saveCustom = () =>
    persist({
      ...preferences,
      necessary: true,
    });

  if (!mounted) return null;

  if (!visible) {
    if (!consentRecorded) return null;

    return (
      <button
        type="button"
        onClick={() => {
          setPreferences(readCookieConsent() ?? defaultCookieConsent());
          setCustomizing(true);
          setVisible(true);
        }}
        className="fixed bottom-4 left-4 z-[70] inline-flex items-center gap-2 rounded-full border border-[#FFD700]/45 bg-[#071947] px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-2xl shadow-black/25 transition hover:bg-[#123AAA] sm:bottom-6 sm:left-6"
      >
        <Cookie size={16} className="text-[#FFD700]" />
        Cookies
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[24px] border border-[#FFD700]/40 bg-[#071947] text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-[28px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
          <div className="p-5 sm:p-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFD700] text-[#123AAA]">
                <Cookie size={23} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">
                  Privacidade e cookies
                </p>
                <h2 className="text-lg font-black uppercase tracking-tight sm:text-xl">
                  Controle seus dados de navegacao
                </h2>
              </div>
            </div>

            <p className="max-w-3xl text-sm font-medium leading-relaxed text-white/75">
              Usamos cookies essenciais para seguranca e funcionamento. Cookies
              de analytics e marketing ficam bloqueados por padrao e so poderao
              funcionar se houver autorizacao. Voce pode revisar sua escolha
              quando quiser.
            </p>

            {customizing && (
              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                {categoryCopy.map((category) => {
                  const checked =
                    category.key === "necessary" ? true : preferences[category.key];

                  return (
                    <label
                      key={category.key}
                      className="flex min-h-[132px] flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-sm font-black uppercase tracking-wider text-white">
                          {category.title}
                        </span>
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={category.key === "necessary"}
                          onChange={(event) =>
                            setPreferences((current) => ({
                              ...current,
                              [category.key]: event.target.checked,
                            }))
                          }
                          className="h-5 w-5 accent-[#FFD700]"
                        />
                      </div>
                      <span className="text-xs font-medium leading-relaxed text-white/65">
                        {category.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-3 border-t border-white/10 bg-white/[0.04] p-5 lg:min-w-72 lg:border-l lg:border-t-0">
            {customizing ? (
              <>
                <button
                  type="button"
                  onClick={saveCustom}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FFD700] px-5 py-3 text-sm font-black uppercase tracking-widest text-[#123AAA] transition hover:bg-[#ffe45c]"
                >
                  <ShieldCheck size={17} />
                  Salvar escolhas
                </button>
                <button
                  type="button"
                  onClick={necessaryOnly}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Somente essenciais
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FFD700] px-5 py-3 text-sm font-black uppercase tracking-widest text-[#123AAA] transition hover:bg-[#ffe45c]"
                >
                  <ShieldCheck size={17} />
                  Aceitar todos
                </button>
                <button
                  type="button"
                  onClick={() => setCustomizing(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <SlidersHorizontal size={17} />
                  Revisar cookies
                </button>
                <button
                  type="button"
                  onClick={necessaryOnly}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white/65 transition hover:text-white"
                >
                  Somente essenciais
                </button>
              </>
            )}

            <a
              href="/politica-de-privacidade"
              className="text-center text-[11px] font-bold uppercase tracking-widest text-[#FFD700] hover:underline"
            >
              Politica de Privacidade
            </a>
          </div>
        </div>

        {consentRecorded && (
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Fechar preferencias de cookies"
            className="absolute right-5 top-5 text-white/60 transition hover:text-white sm:right-7 sm:top-7"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
