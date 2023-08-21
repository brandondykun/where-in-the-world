import { CountryType } from "../../../types";
import Link from "next/link";

const CountryCard = ({ country }: { country: CountryType }) => {
  return (
    <Link href={`countries/${country.name.official}`}>
      <div className="my-4 rounded w-[300px] overflow-hidden bg-white dark:bg-dark-blue">
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          className="max-h-[230px] m-auto"
        />
        <div className="p-4 pb-8">
          <div className="py-4 font-bold text-xl">{country.name.official}</div>
          <div>Population: {country.population}</div>
          <div>Region: {country.region}</div>
          <div>Capital: {country.capital}</div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
