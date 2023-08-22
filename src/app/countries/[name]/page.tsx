import Link from "next/link";
import { CountryType } from "../../../../types";
import { BsArrowLeft } from "react-icons/bs";

const getCountry = async (name: string): Promise<CountryType[]> => {
  const data = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  return await data.json();
};

const getBorderCountries = async (arr: string[]): Promise<CountryType[]> => {
  if (!arr) return [];
  const data = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${arr.join(",")}`
  );
  return await data.json();
};

const Country = async ({ params }: { params: { name: string } }) => {
  const { name } = params;

  const [country] = await getCountry(name);

  const borderCountries = await getBorderCountries(country.borders);

  // get array of currencies
  const currencies = [];
  for (const [key, value] of Object.entries(country.currencies)) {
    currencies.push(country.currencies[key]?.name);
  }

  // get array of languages
  const languages: string[] = [];
  for (const [key, value] of Object.entries(country.languages)) {
    languages.push(country.languages[key]);
  }

  // get array of native names
  const nativeNames: string[] = [];
  for (const [key, value] of Object.entries(country.name.nativeName)) {
    nativeNames.push(key);
  }
  // the last native name is in the local language and the one we want
  const nativeName = nativeNames[nativeNames.length - 1];

  return (
    <main className="bg-very-light-gray dark:bg-very-dark-blue-bg flex flex-col flex-1 p-8 lg:p-16">
      <Link href="/countries" className="w-[107px] mt-2 mb-16">
        <button className="px-8 py-2 bg-white dark:bg-dark-blue  flex items-center gap-2 rounded shadow-[0px_0px_30px_-9px_rgba(0,0,0,0.75)]">
          <BsArrowLeft />
          Back
        </button>
      </Link>
      <div className="grid lg:grid-cols-2 items-center content-center">
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          className="max-w-[400px] xl:max-w-[450px] justify-self-center"
        />
        <div className="justify-self-center">
          <div className="font-bold text-3xl pb-8 pt-12 lg:pt-0">
            {country.name?.common}
          </div>
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-bold mr-2">Native Name:</span>
                <span className="font-thin">
                  {country.name.nativeName[nativeName].common}
                </span>
              </div>
              <div>
                <span className="font-bold mr-2">Population:</span>
                <span className="font-thin">
                  {country.population.toLocaleString("en-US")}
                </span>
              </div>
              <div>
                <span className="font-bold mr-2">Region:</span>
                <span className="font-thin">{country.region}</span>
              </div>
              <div>
                <span className="font-bold mr-2">Sub Region:</span>
                <span className="font-thin">{country.subregion}</span>
              </div>
              <div>
                <span className="font-bold mr-2">Capital:</span>
                <span className="font-thin">{country.capital}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-bold mr-2">Top Level Domain:</span>
                <span className="font-thin">{country.tld}</span>
              </div>
              <div>
                <span className="font-bold mr-2">Currencies:</span>
                <span className="font-thin">{currencies.join(", ")}</span>
              </div>
              <div>
                <span className="font-bold mr-2">Languages:</span>
                <span className="font-thin">{languages.join(", ")}</span>
              </div>
            </div>
          </div>
          <div className="pt-12">
            <div className="flex gap-2 flex-wrap items-center max-w-xl">
              <div className="font-bold text-lg">Border Countries: </div>
              {borderCountries.length
                ? borderCountries.map((c) => {
                    return (
                      <Link href={`/countries/${c.name.official}`}>
                        <button className="bg-white shadow-md px-6 py-1 rounded dark:bg-dark-blue text-sm">
                          {c.name.common}
                        </button>
                      </Link>
                    );
                  })
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Country;
