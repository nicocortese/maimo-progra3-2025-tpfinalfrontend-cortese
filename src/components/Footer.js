"use client";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#272727] text-[#feffc4] pt-14 pb-8 w-full mt-auto">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <Image
          src="/imgs/otrologo.png"
          alt="Logo footer"
          width={180}
          height={180}
          className="opacity-90"
          />
          <p className="text-sm text-[#feffc4]/80 leading-relaxed">
          2025 OlympicHub. Proyecto académico inspirado en el espíritu olímpico.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold mb-2 text-[#feffc4]">Suscribite para más novedades olímpicas</h4>
          <p className="text-sm text-[#dac04d] leading-relaxed">
            Recibí noticias
          </p>
          <form className="flex gap-2 mt-2">
            <input 
            type="email"
            placeholder="Tu email"
            className="flex-1 px-4 py-3 rounded-full text-[#272727] outline-none bg-[#726540]"
            />
            <button 
            type="submit"
            className="bg-[#dac04d] text-[#feffc4] px-5 py-3 rounded-r-full hover:bg-[#726540] transition-colors">
              Enviar
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-3 justify-center">
          <h3 className="font-semibold mb-2 text-[#feffc4]">Créditos</h3>
          <p className="text-sm text-[#feffc4]/70 leading-relaxed">
          Nicolás Cortese - Todos los Derechos Reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
