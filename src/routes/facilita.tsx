import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { supabase } from '../integrations/supabase/client'; 

export const Route = createFileRoute('/facilita')({
  component: Facilita,
});

function Facilita() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [interesse, setInteresse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          name: nome, 
          phone: whatsapp, 
          email: email, 
          interest: interesse 
        } as any]);

      if (error) throw error;
      
      alert("Inscrição realizada com sucesso! Redirecionando para o nosso WhatsApp...");
      
      const message = `Olá! Quero entrar no Programa Facilita para o projeto: ${interesse}. Meu nome é ${nome}.`;
      const whatsappNumber = "5527999999999"; 
      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      setNome('');
      setWhatsapp('');
      setEmail('');
      setInteresse('');

    } catch (err) {
      console.error("Erro ao salvar lead:", err);
      alert("Erro técnico ao processar. Tente novamente em alguns instantes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const unidades = [
    { cidade: "Cariacica", area: "200m²", valor: "806,26" },
    { cidade: "Serra", area: "200m²", valor: "1.056,00" },
    { cidade: "Vila Velha", area: "360m²", valor: "1.100,00" }
  ];

  const beneficios = [
    {
      titulo: "Previsibilidade",
      descricao: "Saiba exatamente quanto vai pagar. Sem taxas surpresas ou reajustes abusivos na sua manutenção mensal."
    },
    {
      titulo: "Parcela Facilitada",
      descricao: "Mensalidades que cabem no seu bolso, projetadas para você investir no seu futuro sem comprometer sua renda atual."
    },
    {
      titulo: "Valorização",
      descricao: "Loteamentos em áreas de grande expansão urbana. Seu patrimônio rendendo acima da inflação ano após ano."
    }
  ];

  const neonFrame = "border-2 border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.3)] bg-[#123AAA]/40 backdrop-blur-md";

  return (
    <div className="min-h-screen bg-[#123AAA] text-white selection:bg-[#FFD700] selection:text-[#123AAA]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      <header className="p-8">
        <div className="w-48 h-24 bg-[#FFD700] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.25)]">
          <img src="/logo-universal.svg" alt="Universal" className="w-4/5 scale-125 object-contain" />
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12 items-start">
        <div className="lg:w-7/12 space-y-6">
          
          {/* TÍTULO E SUBTÍTULO */}
          <div className="space-y-6">
            <div className={`inline-flex items-center px-6 py-2 rounded-full ${neonFrame}`}>
              <span className="text-[#FFD700] text-sm font-extrabold tracking-[0.2em] uppercase">🚀 PRÉ-LANÇAMENTO EXCLUSIVO</span>
            </div>
            
            <h1 className="text-6xl font-extrabold leading-[1.1] tracking-tight">
              Programa que abre <span className="text-[#FFD700]">portas para o seu</span> <br/> futuro lote.
            </h1>
            <p className="text-xl text-gray-200 font-medium leading-relaxed">
              Entre no programa com apenas <span className="text-[#FFD700] font-bold text-3xl">R$ 999,90</span> e elimine a entrada no lançamento.
            </p>
          </div>

          {/* CAIXAS DE BENEFÍCIOS COM HOVER E JANELA EXPLICATIVA CORRIGIDA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 pb-2">
            {beneficios.map((beneficio, index) => (
              <div 
                key={index} 
                className="group relative flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border border-[#FFD700] bg-transparent shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all duration-300 hover:scale-105 hover:bg-[#FFD700]/10 cursor-help"
              >
                <div className="bg-[#FFD700] rounded-full w-7 h-7 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-[#123AAA] w-4 h-4" strokeWidth={3} />
                </div>
                <span className="text-white font-bold text-[14px] md:text-[15px] tracking-tight whitespace-nowrap">{beneficio.titulo}</span>
                
                {/* JANELA EXPLICATIVA CORRIGIDA (Aparece acima) */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 rounded-xl bg-[#0a2366] border border-[#FFD700]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {/* Setinha apontando para baixo */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a2366] border-b border-r border-[#FFD700]/60 transform rotate-45"></div>
                  
                  <p className="text-sm text-gray-100 text-center relative z-10 leading-relaxed font-medium">
                    {beneficio.descricao}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* CIDADES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {unidades.map((u) => (
              <div key={u.cidade} className={`p-7 rounded-[35px] transition-all hover:scale-105 flex flex-col justify-between min-h-[220px] ${neonFrame}`}>
                <div>
                  <h3 className="text-[#FFD700] text-2xl font-black mb-1 tracking-tight">{u.cidade}</h3>
                  <p className="text-xs font-bold text-gray-300 mb-5 uppercase tracking-widest text-opacity-80">Lotes de {u.area}</p>
                </div>
                <div className="text-[13px] leading-relaxed text-gray-100 font-medium">
                  Manutenção a partir de <br/>
                  <span className="text-[#FFD700] font-black text-xl">R$ {u.valor}</span> 
                  <span className="block mt-1 opacity-90 italic font-semibold">que vira crédito de entrada.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORMULÁRIO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={`lg:w-5/12 w-full p-12 rounded-[55px] ${neonFrame}`}
        >
          <div className="mb-10 text-center">
            <p className="text-[#FFD700] font-bold tracking-[0.3em] text-[10px] mb-3 uppercase">💎 ACESSO PRIORITÁRIO</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Antecipe-se ao Lançamento.</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="relative group">
              <label className="text-[11px] font-bold text-[#FFD700] uppercase ml-3 tracking-widest mb-1 block">Nome completo</label>
              <input required placeholder="Seu nome" value={nome} onChange={e => setNome(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-transparent border-2 border-[#FFD700] text-white font-bold text-lg placeholder:text-white/20 focus:outline-none focus:shadow-[0_0_35px_rgba(255,215,0,0.5)] transition-all" />
            </div>

            <div className="relative group">
              <label className="text-[11px] font-bold text-[#FFD700] uppercase ml-3 tracking-widest mb-1 block">WhatsApp</label>
              <input required placeholder="(xx) xxxxx-xxxx" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-transparent border-2 border-[#FFD700] text-white font-bold text-lg placeholder:text-white/20 focus:outline-none focus:shadow-[0_0_35px_rgba(255,215,0,0.5)] transition-all" />
            </div>

            <div className="relative group">
              <label className="text-[11px] font-bold text-[#FFD700] uppercase ml-3 tracking-widest mb-1 block">E-mail</label>
              <input required type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-transparent border-2 border-[#FFD700] text-white font-bold text-lg placeholder:text-white/20 focus:outline-none focus:shadow-[0_0_35px_rgba(255,215,0,0.5)] transition-all" />
            </div>

            <div className="relative group">
              <label className="text-[11px] font-bold text-[#FFD700] uppercase ml-3 tracking-widest mb-1 block">Seu interesse em:</label>
              <div className="relative">
                <select required value={interesse} onChange={e => setInteresse(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-[#123AAA] border-2 border-[#FFD700] text-white font-bold text-lg focus:outline-none focus:shadow-[0_0_35px_rgba(255,215,0,0.5)] transition-all appearance-none pr-12">
                  <option value="">Selecione o projeto</option>
                  <option value="Cariacica: Vista dos Montes">Cariacica: Vista dos Montes (Pré-Lançamento)</option>
                  <option value="Cariacica: Vista do Rio">Cariacica: Vista do Rio (Pré-Lançamento)</option>
                  <option value="Cariacica: Nova Campo Grande">Cariacica: Nova Campo Grande (Em breve)</option>
                  <option value="Serra: Reserva Mestre Álvaro">Serra: Reserva Mestre Álvaro (Pré-Lançamento)</option>
                  <option value="Serra: Nova Almeida">Serra: Nova Almeida (Em breve)</option>
                  <option value="Vila Velha: Interlagos">Vila Velha: Interlagos (Pré-Lançamento)</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFD700] pointer-events-none w-6 h-6" />
              </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full py-6 bg-[#FFD700] text-[#123AAA] font-black uppercase tracking-widest rounded-2xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-4 shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
              {isSubmitting ? "Enviando..." : "QUERO ENTRAR NO PROGRAMA"}
              <ArrowRight className="h-7 w-7" />
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}