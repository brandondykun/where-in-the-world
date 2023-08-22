import { CountryType } from "../../../types";
import Link from "next/link";

const CountryCard = ({ country }: { country: CountryType }) => {
  return (
    <Link href={`countries/${country.name.official}`} className="inline">
      <div className="rounded overflow-hidden bg-white dark:bg-dark-blue shadow-md h-full hover:scale-105 transition-all duration-300 hover:shadow-xl">
        <div className="h-[190px] overflow-hidden flex justify-center items-center">
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            className="min-h-full min-w-full flex-shrink-0 object-cover"
          />
        </div>
        <div className="p-4 pb-6">
          <div className="py-4 font-bold text-2xl">{country.name.common}</div>
          <div className="pb-2">
            <span className="font-bold mr-2">Population:</span>
            <span className="font-thin">
              {country.population.toLocaleString("en-US")}
            </span>
          </div>
          <div className="pb-2">
            <span className="font-bold mr-2">Region:</span>
            <span className="font-thin">{country.region}</span>
          </div>
          <div className="pb-2">
            <span className="font-bold mr-2">Capital:</span>
            <span className="font-thin">{country.capital}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
