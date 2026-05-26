import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  HelpCircle,
  MapPinned,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { supabase } from "../integrations/supabase/client";

export const Route = createFileRoute("/facilita")({
  component: Facilita,
});

const landingUrl = "https://site-universal.vercel.app/facilita";

const advantages = [
  "Financiamento direto com a Universal",
  "Menos burocracia no processo",
  "Atendimento para tirar duvidas antes da escolha",
  "Apoio para entender documentos e proximos passos",
  "Opcoes de lotes em cidades de expansao urbana",
  "Condicoes apresentadas com clareza pela equipe",
];

const steps = [
  {
    title: "Escolha seu lote",
    text: "Veja as opcoes disponiveis e receba orientacao para encontrar uma area que combine com seu plano.",
    icon: MapPinned,
  },
  {
    title: "Separe os documentos",
    text: "A equipe informa quais documentos sao necessarios para avaliar a proposta com seguranca.",
    icon: FileText,
  },
  {
    title: "Entenda as condicoes",
    text: "Voce recebe explicacoes claras sobre valores, prazos, manutencao e regras aplicaveis.",
    icon: HelpCircle,
  },
  {
    title: "Avance com apoio",
    text: "Depois das duvidas resolvidas, o atendimento direciona o proximo passo com a Universal.",
    icon: ClipboardCheck,
  },
];

const faqs = [
  {
    question: "Como funciona o financiamento direto?",
    answer:
      "O atendimento e feito diretamente com a Universal, sem transformar o processo em um labirinto. As condicoes dependem do empreendimento, disponibilidade do lote e analise cadastral.",
  },
  {
    question: "Preciso comprovar renda ou ter avalista?",
    answer:
      "O Facilita reduz burocracias, mas cada proposta passa por validacao. A equipe informa, caso a caso, quais documentos e garantias podem ser solicitados.",
  },
  {
    question: "Onde vejo os lotes disponiveis?",
    answer:
      "Voce pode iniciar pela pagina de empreendimentos ou falar com a equipe pelo formulario. Um consultor confirma as opcoes atuais de Cariacica, Serra e Vila Velha.",
  },
  {
    question: "As condicoes sao iguais para todos os projetos?",
    answer:
      "Nao necessariamente. Valores, prazos, disponibilidade e regras comerciais variam conforme empreendimento e fase de lancamento.",
  },
];

function Facilita() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [interesse, setInteresse] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      alert("Para continuar, aceite a Politica de Privacidade e LGPD.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert([
        {
          name: nome,
          phone: whatsapp,
          email,
          interest: `Facilita: ${interesse}`,
        } as any,
      ]);

      if (error) throw error;

      const message = `Ola! Quero entender o Universal Facilita. Meu nome e ${nome} e tenho interesse em: ${interesse}.`;
      window.location.href = `https://wa.me/552728880001?text=${encodeURIComponent(message)}`;

      setNome("");
      setWhatsapp("");
      setEmail("");
      setInteresse("");
      setAcceptedPrivacy(false);
    } catch (err) {
      console.error("Erro ao salvar lead:", err);
      alert("Erro tecnico ao processar. Tente novamente em alguns instantes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <div className="min-h-screen bg-[#071947] text-white selection:bg-[#FFD700] selection:text-[#123AAA]">
      <section className="relative min-h-screen overflow-hidden pt-36">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/lote-vista.webp')" }}
        />
        <div className="absolute inset-0 bg-[#071947]/85" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071947] to-transparent" />

        <div className="container relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] grid-cols-1 items-center gap-10 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <img
              src="/facilita-logo.png"
              alt="Universal Facilita"
              className="mb-8 h-auto w-full max-w-[340px] rounded-3xl border border-white/10 object-cover shadow-2xl shadow-black/30 sm:max-w-[430px]"
            />
            <p className="mb-4 inline-flex rounded-full border border-[#FFD700]/45 bg-[#FFD700]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#FFD700]">
              Seu lote sem complicacao
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              O jeito mais facil de tirar duvidas e dar o primeiro passo rumo ao
              seu terreno.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/75 sm:text-xl">
              Tudo que voce precisa saber para sair do aluguel e conquistar seu
              lote com mais clareza: financiamento, documentos, escolha do lote
              e atendimento direto com a Universal.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={landingUrl}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FFD700] px-7 py-4 text-sm font-black uppercase tracking-widest text-[#123AAA] shadow-[0_18px_40px_rgba(255,215,0,0.35)] transition hover:bg-[#ffe45c] hover:scale-[1.02]"
              >
                Quero saber como funciona
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#formulario-facilita"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[#123AAA]"
              >
                Falar com consultor
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[28px] border border-[#FFD700]/35 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-7"
          >
            <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#FFD700]">
              Facilidades para comecar
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {advantages.map((item) => (
                <div
                  key={item}
                  className="flex min-h-20 items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FFD700]" />
                  <span className="text-sm font-bold leading-snug text-white/85">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs font-medium leading-relaxed text-white/55">
              Condicoes comerciais, disponibilidade de lotes e documentos podem
              variar por empreendimento e estao sujeitas a analise.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#071947] py-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FFD700]">
              Como funciona
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Seu terreno em 4 passos simples.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="rounded-[24px] border border-white/10 bg-white p-6 text-[#123AAA] shadow-xl shadow-black/10"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD700]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-black text-[#123AAA]/25">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-black">{step.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#123AAA]/70">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-[#123AAA]">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-16">
          <div>
            <img
              src="/facilita-logo.png"
              alt="Universal Facilita"
              className="mb-8 w-full max-w-[360px] rounded-3xl border border-[#123AAA]/10 object-cover shadow-xl"
            />
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#123AAA]/55">
              Perguntas frequentes
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Tire suas duvidas antes de escolher.
            </h2>
            <p className="mt-5 text-base font-medium leading-relaxed text-[#123AAA]/70">
              O Facilita existe para deixar o processo mais transparente: voce
              entende a compra, conversa com a equipe e avanca quando fizer
              sentido.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group rounded-2xl border border-[#123AAA]/12 bg-[#F7F8FB] p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-sm font-medium leading-relaxed text-[#123AAA]/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="formulario-facilita"
        className="bg-[#123AAA] px-6 py-20 text-white lg:px-16"
      >
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FFD700]">
              Atendimento Universal
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Deixe a burocracia com a gente. Voce so precisa dar o primeiro
              passo.
            </h2>
            <p className="mt-5 text-base font-medium leading-relaxed text-white/75">
              Envie seus dados e nossa equipe entra em contato para explicar as
              opcoes atuais do Facilita.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-[#FFD700]/35 bg-[#071947]/60 p-5 shadow-2xl shadow-black/25 backdrop-blur-md sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#FFD700]">
                  Nome completo
                </span>
                <input
                  required
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white px-5 py-4 text-base font-bold text-[#123AAA] outline-none transition placeholder:text-[#123AAA]/35 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/20"
                />
              </label>

              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#FFD700]">
                  WhatsApp
                </span>
                <input
                  required
                  placeholder="(xx) xxxxx-xxxx"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white px-5 py-4 text-base font-bold text-[#123AAA] outline-none transition placeholder:text-[#123AAA]/35 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/20"
                />
              </label>

              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#FFD700]">
                  E-mail
                </span>
                <input
                  required
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white px-5 py-4 text-base font-bold text-[#123AAA] outline-none transition placeholder:text-[#123AAA]/35 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/20"
                />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#FFD700]">
                  Seu interesse
                </span>
                <select
                  required
                  value={interesse}
                  onChange={(e) => setInteresse(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white px-5 py-4 text-base font-bold text-[#123AAA] outline-none transition focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/20"
                >
                  <option value="">Selecione uma opcao</option>
                  <option value="Cariacica">Cariacica</option>
                  <option value="Serra">Serra</option>
                  <option value="Vila Velha">Vila Velha</option>
                  <option value="Ainda quero entender as opcoes">
                    Ainda quero entender as opcoes
                  </option>
                </select>
              </label>
            </div>

            <label className="mt-6 flex items-start gap-3 text-xs font-medium leading-relaxed text-white/70">
              <input
                type="checkbox"
                required
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#FFD700]"
              />
              <span>
                Li e aceito o tratamento dos meus dados para atendimento e
                comunicacoes sobre o Universal Facilita, conforme a{" "}
                <a
                  href="/politica-de-privacidade"
                  className="font-bold text-[#FFD700] hover:underline"
                >
                  Politica de Privacidade e LGPD
                </a>
                .
              </span>
            </label>

            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#FFD700] px-6 py-5 text-sm font-black uppercase tracking-widest text-[#123AAA] shadow-[0_18px_40px_rgba(0,0,0,0.3)] transition hover:bg-[#ffe45c] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Enviando..." : "Quero falar com a Universal"}
              <ShieldCheck className="h-5 w-5" />
            </button>
          </form>
        </div>
      </section>
      </div>
    </PageShell>
  );
}
