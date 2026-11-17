import { CountryType } from "../../../types";
import Link from "next/link";
import Image from "next/image";
import unImage from "../../../public/un-emblem.svg";

const CountryCard = ({ country }: { country: CountryType }) => {
  const capitals = country.capitals?.map((capital) => capital.name).filter(Boolean);
  const alt = country.flag.description
    ? country.flag.description
    : `${country.names.common} flag.`;

  return (
    <Link href={`/${country.names.official}`} className="inline">
      <div className="rounded overflow-hidden bg-white dark:bg-dark-blue shadow-md h-full hover:scale-105 transition-transform duration-500 hover:shadow-xl max-w-sm">
        <div className="h-[190px] overflow-hidden flex justify-center items-center">
          <Image
            src={country.flag.url_png || unImage}
            alt={alt}
            className="min-h-full min-w-full flex-shrink-0 object-cover"
            height={200}
            width={300}
            loading="lazy"
          />
        </div>
        <div className="p-4 pb-6">
          <div className="py-4 font-bold text-2xl">{country.names.common}</div>
          <div className="pb-2">
            <span className="font-bold mr-2">Population:</span>
            <span className="font-thin">
              {country.population.toLocaleString("en-US")}
            </span>
          </div>
          <div className="pb-2">
            <span className="font-bold mr-2">Region:</span>
            <span className="font-thin">
              {country.region ? country.region : "None"}
            </span>
          </div>
          <div className="pb-2">
            <span className="font-bold mr-2">Capital:</span>
            <span className="font-thin">
              {capitals?.length ? capitals.join(", ") : "None"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
