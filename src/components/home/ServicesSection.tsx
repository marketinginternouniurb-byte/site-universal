import { CheckCircle } from 'lucide-react';

export default function ServicesSection() {
  const projetos = [
    { 
      nome: "Vista do Universo", 
      local: "Cariacica", 
      status: "LANÇADO", 
      info: "Entrega em Junho/2027", 
      facilita: false 
    },
    { 
      nome: "Vista dos Montes & Rio", 
      local: "Cariacica (Prolar)", 
      status: "PRÉ-LANÇAMENTO", 
      info: "Lançamento 2º Sem/2026", 
      facilita: true 
    },
    { 
      nome: "Reserva Mestre Álvaro", 
      local: "Serra", 
      status: "PRÉ-LANÇAMENTO", 
      info: "Lançamento Jun-Jul/2026", 
      facilita: true 
    },
    { 
      nome: "Nova Campo Grande", 
      local: "Cariacica", 
      status: "LANÇAMENTO 2027", 
      info: "Em breve", 
      facilita: true 
    },
    { 
      nome: "Nova Almeida", 
      local: "Serra", 
      status: "BREVE LANÇAMENTO", 
      info: "Previsão 2027", 
      facilita: true 
    },
    { 
      nome: "Interlagos", 
      local: "Vila Velha", 
      status: "BREVE LANÇAMENTO", 
      info: "Previsão 2027", 
      facilita: true 
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-16 text-center">
        <h2 className="text-[#123AAA] text-4xl font-black mb-16 uppercase tracking-tight">
          Nossa Presença em <span className="text-[#FFD700]">Expansão</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetos.map((p) => (
            <div key={p.nome} className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${p.facilita ? 'border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.1)] bg-[#123AAA]/5' : 'border-gray-100 bg-white'}`}>
              
              {p.facilita && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFD700] text-[#123AAA] text-[10px] font-black rounded-full shadow-md whitespace-nowrap">
                  ✓ DISPONÍVEL NO FACILITA
                </div>
              )}

              <h3 className="text-xl font-bold text-[#123AAA] mb-2">{p.nome}</h3>
              <p className="text-gray-500 text-sm mb-4">{p.local}</p>
              
              <div className="flex flex-col gap-2 mt-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${p.status === 'LANÇADO' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                  {p.status}
                </span>
                <p className="text-sm font-medium text-[#123AAA]/70">{p.info}</p>
              </div>

              <a 
                href={p.facilita ? "/facilita" : "/contato"} 
                className={`mt-6 block w-full py-3 rounded-xl font-bold transition-all ${p.facilita ? 'bg-[#FFD700] text-[#123AAA] hover:scale-105' : 'bg-[#123AAA] text-white hover:bg-[#123AAA]/90'}`}
              >
                {p.facilita ? "Garantir Preferência" : "Ver Detalhes"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}