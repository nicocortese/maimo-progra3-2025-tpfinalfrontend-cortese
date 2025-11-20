import Image from "next/image";
import Link from "next/link";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

const AthleteCard = ({ athlete, disciplineImage, isFavorite, onToggleFavorite }) => {

if (!athlete) return null;

const countryFlag = athlete.country ? athlete.country.toLowerCase() : "default";

return (
<Link href={`/athletes/${athlete._id}`}> <div className="group relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-[#726540]/30 bg-[#1a1a1a] cursor-pointer">

    <div className="absolute inset-0 w-full h-full"> 
      <Image
        src={`/imgs/${athlete.image}`} 
        alt={athlete.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        priority 
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
    </div>

    {disciplineImage && ( 
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#dac07d] flex items-center justify-center shadow-md z-10">
        <Image
          src={`/imgs/${disciplineImage}`} 
          alt={athlete.discipline}
          width={24} 
          height={24}
          className="object-contain"
        />
      </div>
    )}

    <div className="absolute top-4 left-4 w-10 h-10 z-10">
      <button onClick={onToggleFavorite}>
        {isFavorite ? (
          <HiHeart className="w-6 h-6 text-[#FEFCF4] cursor-pointer" />
        ) : (
          <HiOutlineHeart className="w-6 h-6 text-[#FEFCF4] cursor-pointer" />
        )}
      </button>
    </div>

    <div className="absolute bottom-0 left-0 w-full p-5 z-10"> 
      <h3 className="text-xl md:text-2xl font-bold text-[#fefcf4] leading-none mb-2 group-hover:text-[#dac07d] transition-colors">
        {athlete.name}
      </h3>

      <div className="flex items-center gap-2">
        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#fefcf4]/30 bg-white shrink-0">
          <Image 
            src={`/imgs/${countryFlag}.png`} 
            alt={athlete.country || "Country flag"} 
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-[#fefcf4]/80 uppercase tracking-wide truncate">
          {athlete.country}
        </span>
      </div>

      <div className="w-0 group-hover:w-full h-1 bg-[#dac07d] mt-3 rounded-full transition-all duration-500 ease-out"></div>
    </div>
  </div>
</Link>

);
};

export default AthleteCard;
