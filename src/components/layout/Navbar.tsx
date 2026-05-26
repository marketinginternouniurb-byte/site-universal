import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Phone, Building2, Users, Award, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuFixed, setIsMenuFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMenuVisible = isMenuFixed;

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
            : 'bg-white/15 backdrop-blur-sm py-6 border-b border-white/10' 
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          
          <div className="w-12 h-12"></div>

          {/* LOGO CENTRALIZADA */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center hover:opacity-80 transition-all">
            <img 
              src="/logo-universal.svg" 
              alt="Universal Urbanismo" 
              className={`transition-all duration-300 object-contain drop-shadow-[0_4px_15px_rgba(255,255,255,0.5)] ${isScrolled ? 'h-14' : 'h-32'}`} 
            />
          </Link>

          {/* BOTÃO HAMBÚRGUER */}
          <div className="relative group">
            <button 
              onClick={() => setIsMenuFixed(!isMenuFixed)}
              aria-label={isMenuFixed ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuFixed}
              className={`p-3 rounded-xl transition-all duration-300 border shadow-lg ${
                isMenuFixed ? 'bg-[#FFD700] border-[#FFD700]' : 'bg-[#123AAA]/80 border-[#FFD700]/40'
              }`}
            >
              {isMenuFixed ? (
                <X className="w-8 h-8 text-[#123AAA]" strokeWidth={3} />
              ) : (
                <Menu className="w-8 h-8 text-[#FFD700]" strokeWidth={2.5} />
              )}
            </button>

            {/* MENU SUSPENSO */}
            <div 
              className={`absolute top-full right-0 mt-4 w-72 bg-[#123AAA] border-2 border-[#FFD700]/30 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 origin-top-right ${
                isMenuVisible ? 'scale-100 opacity-100 visible' : 'scale-90 opacity-0 invisible'
              }`}
            >
              <div className="p-8 flex flex-col gap-5">
                {/* Item 1.4: Redirecionamento configurado para descer até a âncora da página inicial */}
                <a 
                  href="/#ancora-lotes" 
                  onClick={() => setIsMenuFixed(false)}
                  className="group flex items-center gap-4 text-white hover:text-[#FFD700] transition-colors"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#FFD700]/20 transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-sm">Empreendimentos</span>
                </a>

                <Link
                  to="/sobre"
                  onClick={() => setIsMenuFixed(false)}
                  className="group flex items-center gap-4 text-white hover:text-[#FFD700] transition-colors"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#FFD700]/20 transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-sm">Sobre Nós</span>
                </Link>

                <Link
                  to="/contato"
                  onClick={() => setIsMenuFixed(false)}
                  className="group flex items-center gap-4 text-white hover:text-[#FFD700] transition-colors"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#FFD700]/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-sm">Contato</span>
                </Link>

                <Link
                  to="/politica-de-privacidade"
                  onClick={() => setIsMenuFixed(false)}
                  className="group flex items-center gap-4 text-white hover:text-[#FFD700] transition-colors"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#FFD700]/20 transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-sm">Privacidade e LGPD</span>
                </Link>

                <div className="h-px bg-white/10 my-2"></div>

                <Link 
                  to="/facilita" 
                  onClick={() => setIsMenuFixed(false)}
                  className="flex items-center gap-4 bg-[#FFD700] text-[#123AAA] p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.03] transition-transform shadow-[0_10px_20px_rgba(255,215,0,0.2)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#123AAA]">
                    <img
                      src="/facilita-logo.png"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span>Facilita</span>
                </Link>
              </div>
              
              <div className="bg-[#FFD700]/10 p-5 rounded-b-3xl border-t border-[#FFD700]/20 flex items-center justify-center gap-3">
                <Award className="w-5 h-5 text-[#FFD700]" />
                <p className="text-[12px] text-[#FFD700] uppercase font-black tracking-[0.15em]">
                  51 Anos de Tradição
                </p>
              </div>
            </div>
          </div>

        </div>
      </nav>

      {isMenuFixed && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsMenuFixed(false)}
        />
      )}
    </>
  );
}
