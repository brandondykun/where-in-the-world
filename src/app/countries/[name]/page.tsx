import Link from "next/link";
import { CountryType } from "../../../../types";
import { BsArrowLeft } from "react-icons/bs";

const getCountry = async (name: string): Promise<CountryType[]> => {
  const data = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  return await data.json();
};

const Country = async ({ params }: { params: { name: string } }) => {
  const { name } = params;

  const [country] = await getCountry(name);

  return (
    <main className="bg-very-light-gray dark:bg-very-dark-blue-bg flex flex-col flex-1 p-8">
      <Link href="/countries" className="w-[107px] mt-2 mb-16">
        <button className="px-8 py-2 bg-white dark:bg-dark-blue  flex items-center gap-2 rounded shadow-[0px_0px_30px_-9px_rgba(0,0,0,0.75)]">
          <BsArrowLeft />
          Back
        </button>
      </Link>
      <div>
        <img src={country.flags.svg} alt={country.flags.alt} />
        <div>
          <div className="font-bold text-2xl pb-8 pt-12">
            {country.name?.common}
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-bold">Native Name:</span>
              </div>
              <div>
                <span className="font-bold">Population:</span>{" "}
                {country.population}
              </div>
              <div>
                <span className="font-bold">Region:</span> {country.region}
              </div>
              <div>
                <span className="font-bold">Sub Region:</span>{" "}
                {country.subregion}
              </div>
              <div>
                <span className="font-bold">Capital:</span> {country.capital}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-bold">Top Level Domain:</span>{" "}
                {country.tld}
              </div>
              <div>
                <span className="font-bold">Currencies:</span>{" "}
              </div>
              <div>
                <span className="font-bold">Languages:</span>{" "}
              </div>
            </div>
          </div>
          <div className="pt-12">
            <div className="font-bold text-lg">Border Countries: </div>
            <div className="flex gap-4">
              {country.borders?.map((c) => {
                return (
                  <Link href={`countries/${c}`}>
                    <button>{c}</button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Country;
