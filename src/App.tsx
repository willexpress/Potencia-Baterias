import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Phone,
  Sun,
  Menu,
  X,
  Zap,
  ChevronRight,
  Truck,
  Wrench,
  ShieldCheck,
  MapPin,
  Clock,
  Star,
  Quote,
  CircleCheckBig,
  ExternalLink,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Car,
  Award,
  Shield,
  ThumbsUp,
  Check,
} from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ElementType;
}

const CustomSelect = ({ options, value, onChange, placeholder, icon: Icon }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full pl-12 pr-4 py-4 text-left bg-white dark:bg-neutral-900 border ${
          isOpen ? 'border-green-500 ring-2 ring-green-500/20' : 'border-slate-200 dark:border-white/10'
        } rounded-xl text-slate-900 dark:text-white font-medium transition-all hover:border-green-500/50 flex items-center justify-between group outline-none`}
      >
        <div className="absolute left-4 text-slate-400 group-hover:text-green-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className={`block truncate ${!value ? 'text-slate-500' : ''}`}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0a120b] border border-slate-100 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto custom-scrollbar"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
                  value === option.value
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'text-slate-700 dark:text-gray-300'
                }`}
              >
                <span className="font-medium truncate">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');

  const cityOptions = [
    { value: 'taguatinga-norte', label: 'Taguatinga Norte' },
    { value: 'ceilandia', label: 'Ceilândia' },
    { value: 'vicente-pires', label: 'Vicente Pires' },
    { value: 'aguas-claras', label: 'Águas Claras' },
    { value: 'taguatinga-centro', label: 'Taguatinga Centro' },
    { value: 'samambaia', label: 'Samambaia' },
  ];

  const modelOptions = [
    { value: 'leve', label: 'Carro de Passeio' },
    { value: 'suv', label: 'SUV / Caminhonete' },
    { value: 'moto', label: 'Moto' },
    { value: 'pesado', label: 'Caminhão / Ônibus' },
  ];

  const getWhatsappLink = () => {
    const phoneNumber = '5561991004308';
    let message = 'Olá, gostaria de conferir os preços';
    
    const cityMap: Record<string, string> = {
      'taguatinga-norte': 'Taguatinga Norte',
      'ceilandia': 'Ceilândia',
      'vicente-pires': 'Vicente Pires',
      'aguas-claras': 'Águas Claras',
      'taguatinga-centro': 'Taguatinga Centro',
      'samambaia': 'Samambaia'
    };

    const modelMap: Record<string, string> = {
      'leve': 'Carro de Passeio',
      'suv': 'SUV / Caminhonete',
      'moto': 'Moto',
      'pesado': 'Caminhão / Ônibus'
    };

    if (selectedCarModel) {
      message += ` para ${modelMap[selectedCarModel] || selectedCarModel}`;
    }
    
    if (selectedCity) {
      message += ` em ${cityMap[selectedCity] || selectedCity}`;
    }

    if (!selectedCity && !selectedCarModel) {
        return 'https://wa.link/zgopqx';
    }

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    // Check system preference or saved preference
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050a06] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-green-900/40 dark:via-[#050a06] dark:to-[#050a06] text-slate-900 dark:text-white font-sans selection:bg-green-600 selection:text-white relative transition-colors duration-300">
      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      ></div>

      {/* Floating Emergency Call Button */}
      <a
        href="tel:61991004308"
        aria-label="Ligar para socorro de baterias"
        className="fixed bottom-0 left-0 w-full z-[300] md:bottom-6 md:right-6 md:left-auto md:w-auto"
      >
        <div className="flex items-center justify-center gap-3 bg-[#25D366] py-5 md:py-4 md:px-6 md:rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all group hover-electric-green">
          <Phone className="w-6 h-6 md:w-8 md:h-8 text-white fill-current" />
          <div className="flex flex-col md:hidden">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80 leading-none mb-1">
              Socorro Rápido
            </span>
            <span className="text-sm font-black uppercase tracking-tighter text-white">
              Ligar Agora
            </span>
          </div>
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80">
              Emergência
            </span>
            <span className="text-xs font-black uppercase text-white">
              Ligar Agora
            </span>
          </div>
        </div>
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out translate-y-0 bg-white/95 dark:bg-[#050a06]/90 backdrop-blur-md py-4 border-b border-slate-200 dark:border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <img
              alt="Potencia das Baterias Logo"
              className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://i.imgur.com/nrxPkmP.png"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-slate-600 dark:text-gray-300">
            <a href="#" className="hover:text-green-500 transition-colors uppercase">
              Início
            </a>
            <a
              href="#produtos"
              className="hover:text-green-500 transition-colors uppercase"
            >
              Produtos
            </a>
            <a
              href="#unidades"
              className="hover:text-green-500 transition-colors uppercase"
            >
              Lojas
            </a>
            <a
              href="#depoimentos"
              className="hover:text-green-500 transition-colors uppercase"
            >
              Avaliações
            </a>
            <a
              href="#faq"
              className="hover:text-green-500 transition-colors uppercase"
            >
              Dúvidas
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 cursor-pointer"
              aria-label="Alternar tema"
            >
              <Sun className="w-4 h-4" />
            </button>
            <a
              href="tel:61991004308"
              className="flex items-center gap-2 text-white bg-green-600 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-green-600 transition-all duration-300 shadow-lg shadow-green-600/20 border border-transparent hover:border-green-600 hover-electric-green"
            >
              <Phone className="w-3.5 h-3.5" /> Deseja Pedir por Telefone? Ligue: 61991004308
            </a>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 cursor-pointer"
              aria-label="Alternar tema"
            >
              <Sun className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-slate-900 dark:text-white cursor-pointer"
              aria-label="Abrir menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[200] bg-slate-50 dark:bg-[#050a06] transition-transform duration-500 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <img
              alt="Potencia das Baterias Logo"
              className="h-12 w-auto object-contain"
              src="https://i.imgur.com/nrxPkmP.png"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 border border-slate-200 dark:border-white/10 rounded-full text-slate-900 dark:text-white cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="flex flex-col gap-8 text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white">
            <a href="#" onClick={() => setIsMenuOpen(false)}>
              INÍCIO
            </a>
            <a href="#produtos" onClick={() => setIsMenuOpen(false)}>
              PRODUTOS
            </a>
            <a href="#unidades" onClick={() => setIsMenuOpen(false)}>
              LOJAS
            </a>
            <a href="#depoimentos" onClick={() => setIsMenuOpen(false)}>
              AVALIAÇÕES
            </a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </a>
          </div>
          <div className="mt-auto pb-24 text-center">
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center md:items-start pb-20 md:pb-48 md:pt-28">
        <div className="w-full md:max-w-7xl md:mx-auto md:px-6 relative z-40">
          <div className="relative md:rounded-[40px] overflow-hidden bg-slate-900 shadow-2xl min-h-screen md:min-h-[600px] flex items-center">
            {/* Background Image */}
            <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
              <img 
                src="https://eletronautocenter.com.br/wp-content/uploads/2024/08/Helair_Carousel_3_1920x610-1.jpg" 
                alt="Mecânico instalando bateria" 
                className="w-full h-full object-cover object-[65%_center] md:object-center opacity-50"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

            {/* Content Overlay */}
            <div className="relative z-50 p-8 pt-32 pb-48 md:px-16 md:pb-16 md:pt-64 max-w-3xl">
              <div className="flex items-center gap-2 text-green-500 font-bold text-xs tracking-[0.4em] mb-6 uppercase animate-in fade-in slide-in-from-left duration-700">
                <span className="w-8 h-[2px] bg-green-500"></span>Loja de Baterias Especializada
              </div>
              <h1 className="text-3xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8 italic uppercase text-white relative animate-in fade-in slide-in-from-left duration-700 delay-100">
                BATERIAS TAGUATINGA DF
                <br />
                <span className="text-green-500 inline-flex items-center gap-2">
                  TROCA NA HORA!{' '}
                  <Zap className="w-8 h-8 md:w-12 md:h-12 fill-yellow-400 text-yellow-400 animate-pulse hidden md:block" />
                </span>
              </h1>
              <p className="text-gray-200 text-lg max-w-md mb-10 leading-relaxed animate-in fade-in slide-in-from-left duration-700 delay-200">
                Entrega e instalação gratuita de baterias Heliar em
                até 40 minutos em Taguatinga e região.
              </p>
              <div className="flex flex-wrap gap-6 items-center animate-in fade-in slide-in-from-left duration-700 delay-300 relative z-30">
                <a
                  href="https://wa.link/zgopqx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-10 py-5 rounded-lg font-black italic tracking-widest hover:bg-white hover:text-green-600 transition-all flex items-center gap-3 group shadow-lg shadow-green-600/20 hover-electric-green relative z-50"
                >
                  WHATSAPP RÁPIDO{' '}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Floating Search Widget */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-5xl bg-slate-50 dark:bg-[#0a120b]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-green-900/30 p-8 md:p-10 animate-in fade-in zoom-in duration-700 delay-500 z-40">
            <h2 className="text-center text-xl md:text-2xl font-black italic tracking-tight text-slate-900 dark:text-white mb-8">
              Peça de onde estiver e pague apenas na entrega!
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <CustomSelect
                options={cityOptions}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="Selecione sua Cidade"
                icon={MapPin}
              />

              <CustomSelect
                options={modelOptions}
                value={selectedCarModel}
                onChange={setSelectedCarModel}
                placeholder="Modelo do Carro"
                icon={Car}
              />

              <a 
                href={getWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 hover-electric-green"
              >
                Confira os preços
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Units Section */}
      <section id="unidades" className="relative z-30 pt-64 pb-32 bg-white dark:bg-transparent">
        <FadeIn className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <div className="flex items-center gap-2 text-green-500 font-bold text-xs tracking-[0.4em] mb-4 uppercase">
              <span className="w-8 h-[2px] bg-green-500"></span>Onde Estamos
            </div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">
              Nossas Unidades
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Taguatinga */}
            <div className="group relative bg-slate-50 dark:bg-[#0a120b] rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/5 hover:border-green-600/30 transition-all duration-500 shadow-2xl">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  alt="Loja Potencia das Baterias Taguatinga"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/p/AF1QipMixq16-rvnV2l8OSzjPcjFWQh-eBuZRXVao6v9=s680-w680-h510-rw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-neutral-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6 bg-green-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Loja Física
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6 text-slate-900 dark:text-white group-hover:text-green-500 transition-colors">
                  Taguatinga
                </h3>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                    <p className="text-slate-600 dark:text-gray-400 text-sm font-medium leading-relaxed">
                      St. D Norte QND 35 Lojas 6/7 - Taguatinga
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-slate-600 dark:text-gray-400 text-sm font-medium">
                      Seg a Sex: 08h às 18h <br />
                      Sáb das 08h as 14h
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-slate-900 dark:text-white text-lg font-black tracking-tight">
                      (61) 3375-1701
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-neutral-900 transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Ver Mapa
                  </a>
                  <a
                    href="https://wa.link/zgopqx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 hover-electric-green"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Taguatinga Norte */}
            <div className="group relative bg-slate-50 dark:bg-[#0a120b] rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/5 hover:border-green-600/30 transition-all duration-500 shadow-2xl">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  alt="Loja Potencia das Baterias Taguatinga Norte"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwepRhqVrnanScwV8RbV9q1_dWgqgIDHroG1cB9WVHfA_etC6NcysT-HjpRvoBIo3x1uP7FhB5GjUspKb9rzTI3jczGP720QPOOgE2SuI05UwQOuc1MRLzlP-EuXqu8d6ARtJWbXU=s680-w680-h510-rw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-neutral-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6 bg-green-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Loja Física
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6 text-slate-900 dark:text-white group-hover:text-green-500 transition-colors">
                  Taguatinga Norte
                </h3>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                    <p className="text-slate-600 dark:text-gray-400 text-sm font-medium leading-relaxed">
                      QNH 11 Lote 1 Loja 5 - Taguatinga Norte
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-slate-600 dark:text-gray-400 text-sm font-medium">
                      Seg a Sex: 08h às 18h <br />
                      Sáb das 08h as 14h
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-slate-900 dark:text-white text-lg font-black tracking-tight">
                      (61) 3047-2306
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-neutral-900 transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Ver Mapa
                  </a>
                  <a
                    href="https://wa.link/zgopqx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 hover-electric-green"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Why Choose Heliar Section */}
      <section id="produtos" className="relative z-30 py-32 bg-white dark:bg-transparent">
        <FadeIn className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-slate-900 dark:text-white mb-4">
              POR QUE <span className="text-slate-500">ESCOLHER HELIAR?</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg font-medium">
              Confira os benefícios que fazem da Heliar a melhor bateria do Brasil:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="flex gap-6">
              <div className="shrink-0">
                <Award className="w-12 h-12 text-green-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">
                  Garantia Heliar
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Oferecemos até 2 anos de garantia em nossas baterias. A maior do mercado.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="shrink-0">
                <div className="relative">
                  <Shield className="w-12 h-12 text-green-500" strokeWidth={1.5} />
                  <Zap className="w-5 h-5 text-green-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-current" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">
                  Durabilidade
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Nossa tecnologia de grades PowerFrame garante até 66% mais durabilidade do que as baterias sem essa tecnologia.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="shrink-0">
                <ThumbsUp className="w-12 h-12 text-green-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">
                  Equipamento Original
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Heliar atende a exigências internacionais de performance e é líder absoluta nas montadoras.
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-gradient-to-b from-transparent to-slate-50 dark:to-neutral-900/50 rounded-3xl flex items-end justify-center overflow-hidden">
            <img 
              src="https://www.heliarexpress.com.br/content/dist/img/descricao-baterias.png" 
              alt="Linha de Baterias Heliar" 
              className="w-full h-full object-contain object-bottom hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1200";
                e.currentTarget.className = "w-full h-full object-cover object-center opacity-80";
              }}
            />
          </div>
        </FadeIn>
      </section>



      {/* Testimonials Section */}
      <section
        id="depoimentos"
        className="relative z-30 py-32 bg-white dark:bg-transparent overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(22,163,74,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <FadeIn className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 text-green-500 font-bold text-xs tracking-[0.4em] mb-4 uppercase">
              <span className="w-8 h-[2px] bg-green-500"></span>O que dizem sobre
              nós<span className="w-8 h-[2px] bg-green-500"></span>
            </div>
            <h2 className="text-3xl md:text-7xl font-black tracking-tighter italic uppercase mb-6 text-slate-900 dark:text-white">
              Avaliações reais
            </h2>
            <div className="inline-flex items-center gap-4 bg-slate-100 dark:bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200 dark:border-white/10">
              <div className="flex text-yellow-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xl font-black italic tracking-tight text-slate-900 dark:text-white">
                5.0 / 5 no Google
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ricardo Santos',
                time: 'há uma semana',
                text: '"Excelente atendimento! Minha bateria pifou no meio da avenida e em menos de 30 minutos o técnico chegou com uma Moura nova."',
                img: 'https://i.pravatar.cc/150?u=ricardo',
              },
              {
                name: 'Juliana Costa',
                time: 'há 1 mês',
                text: '"Melhor loja de baterias da região. O teste do alternador me salvou de gastar dinheiro à toa."',
                img: 'https://i.pravatar.cc/150?u=juliana',
              },
              {
                name: 'Marcos Oliveira',
                time: 'há 3 meses',
                text: '"Preço competitivo e as melhores marcas. Comprei uma Heliar para meu Start-Stop e o serviço foi impecável."',
                img: 'https://i.pravatar.cc/150?u=marcos',
              },
            ].map((review, index) => (
              <div
                key={index}
                className="group relative bg-slate-50 dark:bg-white/10 backdrop-blur-lg rounded-[32px] p-8 border border-slate-200 dark:border-white/10 hover:border-green-600/30 dark:hover:border-white/20 transition-all duration-500 flex flex-col shadow-xl"
              >
                <div className="absolute top-8 right-8 text-slate-200 dark:text-white/5 group-hover:text-green-600/10 dark:group-hover:text-green-600/20 transition-colors duration-500">
                  <Quote className="w-12 h-12 fill-current" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <img
                      alt={`Avatar de ${review.name}`}
                      className="w-14 h-14 rounded-full border-2 border-white/20 object-cover"
                      src={review.img}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white dark:border-neutral-900">
                      <CircleCheckBig className="w-2.5 h-2.5 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-lg italic uppercase tracking-tighter leading-none mb-1 text-slate-900 dark:text-white">
                      {review.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                      {review.time}
                    </span>
                  </div>
                </div>
                <div className="flex text-yellow-500 gap-0.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-gray-200 text-sm leading-relaxed font-medium mb-8 flex-grow">
                  {review.text}
                </p>
                <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      ></path>
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400">
                      Google Review
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="relative z-30 py-32 bg-slate-50 dark:bg-transparent border-y border-slate-200 dark:border-white/5"
      >
        <FadeIn className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase text-slate-900 dark:text-white">
              Dúvidas sobre Baterias
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'Quanto tempo demora a entrega e instalação?',
                a: 'Nossa média de atendimento em horário comercial é de 30 a 50 minutos para toda a região metropolitana.',
              },
              {
                q: 'Vocês aceitam a bateria usada como base de troca?',
                a: 'Sim! Todos os preços anunciados já consideram a devolução da bateria inservível (base de troca).',
              },
              {
                q: 'Quais as formas de pagamento disponíveis?',
                a: 'Aceitamos cartões de crédito (em até 10x), débito, PIX e dinheiro diretamente ao técnico.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-neutral-800/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <h3 className="font-bold text-lg italic uppercase tracking-tight text-slate-900 dark:text-white">
                    {item.q}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-300 text-slate-500 dark:text-white ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-slate-600 dark:text-gray-400 border-t border-slate-200 dark:border-white/5 mt-2 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 dark:bg-[#020402] pt-32 pb-32 md:pb-12 border-t border-neutral-800 relative overflow-hidden transition-colors duration-300">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <img 
            src="https://www.heliarexpress.com.br/content/dist/img/descricao-baterias.png" 
            alt="Background" 
            className="w-full h-full object-cover object-bottom"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <img
                  alt="Potencia das Baterias Logo"
                  className="h-12 w-auto object-contain"
                  src="https://i.imgur.com/aLVAX0x.png"
                />
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-10 font-medium italic">
                Sua distribuidora de baterias Moura e Heliar com entrega rápida
                na região.
              </p>
              <a
                href="tel:61991004308"
                className="hidden md:inline-flex items-center gap-2 text-white bg-green-600 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-green-600 transition-all shadow-lg shadow-green-600/20 hover-electric-green"
              >
                <Phone className="w-3.5 h-3.5" /> Deseja Pedir por Telefone? Ligue: 61991004308
              </a>
            </div>
            <div>
              <h4 className="font-black mb-10 uppercase tracking-[0.3em] text-[10px] text-green-500 italic">
                Serviços
              </h4>
              <ul className="space-y-4 text-sm text-neutral-400 font-bold uppercase tracking-widest">
                <li>Baterias de Carro</li>
                <li>Baterias de Moto</li>
                <li>Troca no Local</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-10 uppercase tracking-[0.3em] text-[10px] text-green-500 italic">
                Socorro
              </h4>
              <ul className="space-y-4 text-sm text-neutral-400 font-bold uppercase tracking-widest">
                <li>
                  <a
                    href="https://wa.link/zgopqx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Rápido
                  </a>
                </li>
                <li>Teste Elétrico</li>
                <li>Regiões Atendidas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-10 uppercase tracking-[0.3em] text-[10px] text-green-500 italic">
                Social
              </h4>
              <div className="flex gap-4">
                <div className="bg-neutral-800 border border-neutral-700 p-3 rounded-2xl hover:bg-green-600 hover:text-white transition-all cursor-pointer text-neutral-400">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="bg-neutral-800 border border-neutral-700 p-3 rounded-2xl hover:bg-green-600 hover:text-white transition-all cursor-pointer text-neutral-400">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="bg-neutral-800 border border-neutral-700 p-3 rounded-2xl hover:bg-green-600 hover:text-white transition-all cursor-pointer text-neutral-400">
                  <Youtube className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-neutral-800 text-center text-[10px] text-neutral-500 font-black tracking-[0.3em] uppercase">
            <p>© 2024 POTENCIA DAS BATERIAS - OTIMIZADO PARA GOOGLE</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
