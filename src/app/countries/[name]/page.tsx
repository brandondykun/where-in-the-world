import Link from "next/link";
import { CountryType } from "../../../../types";
import { BsArrowLeft } from "react-icons/bs";
import { RiExternalLinkLine } from "react-icons/ri";
import Image from "next/image";
import unImage from "../../../../public/un-emblem.svg";

const getCountry = async (
  name: string
): Promise<
  { country: CountryType; error: boolean } | { country: null; error: string }
> => {
  try {
    const data = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const countryData = await data.json();
    return { country: countryData[0], error: false };
  } catch (error) {
    return {
      error: "There was an error fetching that country. Please try again.",
      country: null,
    };
  }
};

const getBorderCountries = async (
  arr: string[]
): Promise<CountryType[] | { error: string }> => {
  if (!arr) return [];
  try {
    const data = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${arr.join(",")}`
    );
    return await data.json();
  } catch (error) {
    return {
      error: "Error fetching border countries.",
    };
  }
};

const Country = async ({ params }: { params: { name: string } }) => {
  const { name } = params;

  const { country, error } = await getCountry(name);

  const borderCountries = await getBorderCountries(
    country ? country.borders : []
  );

  // get array of currencies
  const currencies = [];
  if (country?.currencies) {
    for (const [key, value] of Object.entries(country.currencies)) {
      currencies.push(country.currencies[key]?.name);
    }
  }

  // get array of languages
  const languages: string[] = [];
  if (country?.languages) {
    for (const [key, value] of Object.entries(country.languages)) {
      languages.push(country.languages[key]);
    }
  }

  // get array of native names
  const nativeNames: string[] = [];
  if (country?.name?.nativeName) {
    for (const [key, value] of Object.entries(country.name.nativeName)) {
      nativeNames.push(key);
    }
  }
  // the last native name is in the local language and the one we want
  const nativeName = nativeNames[nativeNames.length - 1];

  return (
    <main className="bg-very-light-gray dark:bg-very-dark-blue-bg flex flex-col flex-1 p-8 lg:p-16 gap-16 lg:gap-20">
      <Link href="/countries" className="w-[107px] mt-2">
        <button className="px-8 py-2 bg-white dark:bg-dark-blue  flex items-center gap-2 rounded shadow-lg hover:scale-105 transition-transform duration-300">
          <BsArrowLeft />
          Back
        </button>
      </Link>
      {country ? (
        <div className="grid lg:grid-cols-2 items-center content-center">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            className="w-full max-w-[350px] md:max-w-[400px] xl:max-w-[450px] 2xl:max-w-[550px] max-h-[500px] justify-self-center mb-10 lg:mb-0 lg:mr-8"
            width={550}
            height={550}
            priority
          />
          <div className="justify-self-center lg:justify-self-start">
            <div className="font-bold text-3xl pb-6 pt-12 lg:pt-0">
              {country.name?.common}
            </div>
            <div className="text-sm font-light text-neutral-600 dark:text-neutral-400">
              Official Name
            </div>
            <div className="pb-8 text-xl">{country.name?.official}</div>
            <div className="flex flex-col gap-12 md:flex-row">
              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-bold mr-2">Native Name:</span>
                  <span className="font-thin">
                    {nativeName
                      ? country.name.nativeName[nativeName].common
                      : "None"}
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
                  <span className="font-thin">
                    {country.subregion ? country.subregion : "None"}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Capital:</span>
                  <span className="font-thin">
                    {country.capital ? country.capital.join(", ") : "None"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-bold mr-2">Top Level Domain:</span>
                  <span className="font-thin">
                    {country.tld ? country.tld.join(", ") : "None"}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Currencies:</span>
                  <span className="font-thin">
                    {currencies.length ? currencies.join(", ") : "None"}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Languages:</span>
                  <span className="font-thin">
                    {languages.length ? languages.join(", ") : "None"}
                  </span>
                </div>
              </div>
            </div>
            {country.unMember ? (
              <div className="pt-12 flex items-center gap-2">
                <Image src={unImage} alt="UN Emblem" height={25} width={25} />
                <span className="font-light">UN Member State</span>
              </div>
            ) : null}
            {country.maps.googleMaps ? (
              <div className="pt-12">
                <Link
                  href={country.maps.googleMaps}
                  className="w-fit flex gap-4 items-center text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  <div>View in Google Maps</div> <RiExternalLinkLine />
                </Link>
              </div>
            ) : null}
            <div className="pt-12">
              <div className="flex gap-2 flex-wrap items-center max-w-xl">
                <div className="font-bold text-lg">Border Countries: </div>
                {Array.isArray(borderCountries) ? (
                  borderCountries.length ? (
                    borderCountries.map((c) => {
                      return (
                        <Link
                          href={`/countries/${c.name.official}`}
                          key={c.name.common}
                        >
                          <button className="bg-white shadow-md px-6 py-1 rounded dark:bg-dark-blue text-sm hover:scale-y-110 hover:scale-x-105 dark:hover:brightness-110 hover:brightness-90 transition-transform duration-300">
                            {c.name.common}
                          </button>
                        </Link>
                      );
                    })
                  ) : (
                    <span className="font-thin">N/A</span>
                  )
                ) : (
                  <div>{borderCountries.error}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-2xl mx-auto pt-24">{error}</div>
      )}
    </main>
  );
};

export default Country;
