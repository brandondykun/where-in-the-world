import { CountryType } from "../../types";

const BASE_URL = "https://api.restcountries.com/countries/v5";
const PAGE_SIZE = 100;

type CountriesResponse = {
  data?: {
    objects?: CountryType[];
    meta?: {
      more?: boolean;
      count?: number;
    };
  };
  errors?: {
    message?: string;
  }[];
};

function authHeaders(): HeadersInit {
  const apiKey = process.env.REST_COUNTRIES_API_KEY;
  if (!apiKey) {
    throw new Error("REST_COUNTRIES_API_KEY is not set");
  }
  return { Authorization: `Bearer ${apiKey}` };
}

async function getCountriesResponse(url: string): Promise<CountriesResponse> {
  const response = await fetch(url, {
    headers: authHeaders(),
    next: { revalidate: 60 * 60 * 24 },
  });
  const body = (await response.json()) as CountriesResponse;
  if (!response.ok) {
    throw new Error(
      body.errors?.[0]?.message ?? `Request failed (${response.status})`,
    );
  }
  return body;
}

export async function listCountries(): Promise<CountryType[]> {
  const fields = [
    "names.common",
    "names.official",
    "population",
    "region",
    "capitals",
    "flag.description",
    "flag.url_png",
  ].join(",");

  const countries: CountryType[] = [];
  let offset = 0;

  while (true) {
    const url = `${BASE_URL}?limit=${PAGE_SIZE}&offset=${offset}&response_fields=${fields}`;
    const body = await getCountriesResponse(url);
    const objects = body.data?.objects ?? [];
    countries.push(...objects);
    if (!body.data?.meta?.more || objects.length === 0) break;
    offset += body.data.meta.count ?? objects.length;
  }

  return countries.sort((a, b) => a.names.common.localeCompare(b.names.common));
}

export async function getCountryByOfficialName(
  name: string,
): Promise<CountryType | null> {
  const omit = [
    "names.translations",
    "leaders",
    "flag.colors",
    "assets",
    "descriptions",
  ].join(",");
  const url = `${BASE_URL}/names.official/${encodeURIComponent(name)}?response_fields_omit=${omit}`;
  const body = await getCountriesResponse(url);
  return body.data?.objects?.[0] ?? null;
}

export async function getBorderCountries(
  alpha3: string,
): Promise<CountryType[]> {
  const url = `${BASE_URL}/borders/${encodeURIComponent(alpha3)}?limit=50&response_fields=names.common,names.official`;
  const body = await getCountriesResponse(url);
  const countries = body.data?.objects ?? [];
  return countries.sort((a, b) =>
    a.names.common.localeCompare(b.names.common),
  );
}
