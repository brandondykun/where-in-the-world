import Link from "next/link";
import { CountryType } from "../../../types";
import { BsArrowLeft } from "react-icons/bs";
import { RiExternalLinkLine } from "react-icons/ri";
import Image from "next/image";
import unImage from "../../../public/un-emblem.svg";
import {
  getBorderCountries,
  getCountryByOfficialName,
} from "@/lib/restcountries";

const Country = async ({ params }: { params: { name: string } }) => {
  const { name } = params;

  let country: CountryType | null = null;
  let error: string | false = false;
  try {
    country = await getCountryByOfficialName(decodeURIComponent(name));
    if (!country) {
      error = "There was an error fetching that country. Please try again.";
    }
  } catch {
    error = "There was an error fetching that country. Please try again.";
  }

  let borderCountries: CountryType[] | { error: string } = [];
  if (country?.borders?.length && country.codes?.alpha_3) {
    try {
      borderCountries = await getBorderCountries(country.codes.alpha_3);
    } catch {
      borderCountries = { error: "Error fetching border countries." };
    }
  }

  const currencies =
    country?.currencies?.map((currency) => currency.name).filter(Boolean) ?? [];

  const languages: string[] = [];
  country?.languages?.forEach((language) => {
    if (language.name && !languages.includes(language.name)) {
      languages.push(language.name);
    }
  });

  const nativeNamesArr: string[] = [];
  if (country?.names?.native) {
    for (const value of Object.values(country.names.native)) {
      if (value.common && !nativeNamesArr.includes(value.common)) {
        nativeNamesArr.push(value.common);
      }
    }
  }

  const capitals = country?.capitals
    ?.map((capital) => capital.name)
    .filter(Boolean);
  const flagAlt = country?.flag.description
    ? country.flag.description
    : `${country?.names.common} flag.`;

  return (
    <main className="bg-very-light-gray dark:bg-very-dark-blue-bg flex flex-col flex-1 p-8 lg:p-16 gap-16 lg:gap-20">
      <Link href="/" className="w-[107px] mt-2">
        <button className="px-8 py-2 bg-white dark:bg-dark-blue  flex items-center gap-2 rounded shadow-lg hover:scale-105 transition-transform duration-300">
          <BsArrowLeft />
          Back
        </button>
      </Link>
      {country ? (
        <div className="grid lg:grid-cols-2 items-center content-center">
          <Image
            src={country.flag.url_png || unImage}
            alt={flagAlt}
            className="w-full max-w-[350px] md:max-w-[400px] xl:max-w-[450px] 2xl:max-w-[550px] max-h-[500px] justify-self-center mb-10 lg:mb-0 lg:mr-8"
            width={550}
            height={550}
            priority
          />
          <div className="sm:justify-self-center lg:justify-self-start">
            <div className="font-bold text-3xl pb-6 pt-12 lg:pt-0">
              {country.names?.common}
            </div>
            <div className="text-sm font-light text-neutral-600 dark:text-neutral-400">
              Official Name
            </div>
            <div className="pb-8 text-xl">{country.names?.official}</div>
            <div className="flex flex-col gap-12 md:flex-row">
              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-bold mr-2 whitespace-nowrap">
                    {nativeNamesArr.length > 1
                      ? "Native Names:"
                      : "Native Name:"}
                  </span>
                  <span className="font-thin">
                    {nativeNamesArr.length
                      ? nativeNamesArr.join(",  ")
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
                  <span className="font-bold mr-2 whitespace-nowrap">
                    Sub Region:
                  </span>
                  <span className="font-thin">
                    {country.subregion ? country.subregion : "None"}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Capital:</span>
                  <span className="font-thin">
                    {capitals?.length ? capitals.join(", ") : "None"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {country.area?.kilometers ? (
                  <div>
                    <span className="font-bold mr-2">Area:</span>
                    <span className="font-thin">
                      {country.area.kilometers.toLocaleString("en-US")} km²
                    </span>
                  </div>
                ) : null}
                <div>
                  <span className="font-bold mr-2 whitespace-nowrap">
                    Top Level Domain:
                  </span>
                  <span className="font-thin">
                    {country.tlds?.length ? country.tlds.join(", ") : "None"}
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
            {country.classification?.un_member ? (
              <div className="pt-12 flex items-center gap-2">
                <Image src={unImage} alt="UN Emblem" height={25} width={25} />
                <span className="font-light">UN Member State</span>
              </div>
            ) : null}
            {country.links?.google_maps ? (
              <div className="pt-12">
                <Link
                  href={country.links.google_maps}
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
                          href={`/${c.names.official}`}
                          key={c.names.common}
                        >
                          <button className="bg-white shadow-md px-6 py-1 rounded dark:bg-dark-blue text-sm hover:scale-y-110 hover:scale-x-105 dark:hover:brightness-110 hover:brightness-90 transition-transform duration-300">
                            {c.names.common}
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
