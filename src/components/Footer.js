"use client";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-[#fefcf4] py-12 w-full mt-auto border-t border-[#dac07d]/30">
      ¿{" "}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <Image
            src="/imgs/otrologo.png"
            alt="Logo footer"
            width={220}
            height={80}
            className="object-contain"
          />
          <p className="text-sm text-[#fefcf4]/60 leading-relaxed max-w-xs">
            2025 OlympicHub. El espíritu olímpico en un solo lugar.
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <div>
            <h4 className="font-bold text-lg text-[#fefcf4]">
              Novedades Olímpicas
            </h4>
            <p className="text-xs text-[#dac07d] font-medium mt-1">
              Suscribite para recibir noticias.
            </p>
          </div>

          <form className="flex w-full max-w-sm shadow-lg rounded-full overflow-hidden border border-[#333]">
            <input
              type="email"
              placeholder="Tu email..."
              className="flex-1 px-5 py-3 text-white outline-none bg-[#1a1a1a] placeholder-[#726540] text-sm"
            />
            <button
              type="submit"
              className="bg-[#dac07d] text-[#1a1a1a] px-6 py-3 hover:bg-[#bfa25f] transition-colors font-bold text-sm uppercase tracking-wide"
            >
              Enviar
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1">
          <h3 className="font-bold text-lg text-[#fefcf4]">Créditos</h3>
          <p className="text-sm text-[#fefcf4]/60">Nicolás Cortese</p>
          <p className="text-[10px] text-[#fefcf4]/30 mt-4">
            © 2025 Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
