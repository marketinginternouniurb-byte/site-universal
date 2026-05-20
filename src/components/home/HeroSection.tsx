import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function HeroSection() {
  // Função para fazer a tela deslizar de forma perfeitamente suave
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('ancora-lotes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* IMAGEM DE FUNDO PREMIUM */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100 hover:scale-105"
        style={{ backgroundImage: "url('/lote-vista.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60" /> 
      </div>

      {/* CONTEÚDO CENTRALIZADO */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center mt-16 antialiased">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-8">
            A credibilidade que constrói<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFa500]">
              o seu futuro há 51 anos.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
            Conquiste o seu espaço com a segurança da Universal Urbanismo. Condições exclusivas de lançamento direto com a loteadora, <span className="font-bold text-[#FFD700]">sem entrada imediata.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            
            {/* PROGRAMA FACILITA */}
            <Link 
              to="/facilita" 
              className="w-full sm:w-auto bg-[#FFD700] hover:bg-[#e6bd00] text-[#123AAA] px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_15px_35px_rgba(255,215,0,0.4)] text-decoration-none"
            >
              Programa Facilita <ArrowRight className="w-5 h-5 stroke-[3]" />
            </Link>
            
            {/* NOSSOS EMPREENDIMENTOS - Rolagem via JavaScript */}
            <button 
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#123AAA] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Nossos Empreendimentos <MapPin className="w-4 h-4" />
            </button>

          </div>
        </motion.div>
      </div>
    </section>
  );
}