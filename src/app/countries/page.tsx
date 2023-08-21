import CountryCard from "../components/CountryCard";
import { CountryType } from "../../../types";

const getCountries = async (): Promise<CountryType[]> => {
  const data = await fetch("https://restcountries.com/v3.1/all");
  const formatted = await data.json();
  return formatted;
};

const Countries = async () => {
  const countries: CountryType[] = await getCountries();

  return (
    <main className="flex-1 flex flex-col bg-very-light-gray dark:bg-very-dark-blue-bg">
      <div className="flex flex-wrap gap-8 justify-center">
        {countries.map((c) => {
          return <CountryCard country={c} />;
        })}
      </div>
    </main>
  );
};

export default Countries;
