"use client";

import { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import { CountryType } from "../../types";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const getCountries = async (): Promise<CountryType[]> => {
  const data = await fetch("https://restcountries.com/v3.1/all");
  const formatted = await data.json();
  return formatted;
};

const Countries = () => {
  const [countries, setCountries] = useState<CountryType[] | null>(null);
  const [filtered, setFiltered] = useState<CountryType[]>([]);
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setFetchError(false);
    getCountries()
      .then((res) => {
        setCountries(
          res.sort((a, b) => {
            return a.name.common.localeCompare(b.name.common);
          })
        );
        setFiltered(res);
      })
      .catch((error) => {
        setFetchError(true);
      });
  }, []);

  // filter visible countires based on search input
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setFiltered(countries!);
      return;
    }
    const filtered = countries?.filter((c) => {
      return (
        c.name.common
          .toLocaleLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        c.name.official.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFiltered(filtered!);
  };

  const handleRegionFilter = (region: string) => {
    setRegionFilter(region);
  };

  const doubleFiltered =
    regionFilter === "All"
      ? filtered
      : filtered.filter((country) => {
          return country.region === regionFilter;
        });

  const regions: string[] = [];
  countries?.forEach((c) => {
    if (!regions.includes(c.region)) {
      regions.push(c.region);
    }
  });

  return (
    <main className="flex-1 flex flex-col bg-very-light-gray dark:bg-very-dark-blue-bg px-8 py-8 md:py-12">
      <div className="flex flex-col gap-10 pb-12 md:flex-row md:justify-between md:items-center md:pb-16">
        <div className="relative max-w-[400px] md:w-96">
          <AiOutlineSearch size={25} className="absolute top-3 left-5" />
          <Input
            type="text"
            onChange={handleFilter}
            className="w-full p-6 pl-16"
            placeholder="Search for a country..."
          />
        </div>
        <div className="flex gap-8 items-center">
          <span className="hidden md:block text-neutral-600 dark:text-neutral-400 font-light pt-[4px]">
            {doubleFiltered.length} /{" "}
            {countries?.length ? countries.length : "250"}
          </span>
          <Select onValueChange={handleRegionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                {regions.map((region) => {
                  return (
                    <SelectItem value={region} key={region}>
                      {region}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-16 place-items-stretch max-w-[2400px] mx-auto">
        {doubleFiltered.length > 0 &&
          doubleFiltered.map((c) => {
            return <CountryCard country={c} key={c.name.official} />;
          })}
      </div>
      {doubleFiltered.length === 0 && countries !== null ? (
        <div className="text-3xl pt-20 mx-auto">No Countries Found</div>
      ) : null}
      {countries === null && !fetchError ? (
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-16 [@media(min-width:2400px)]:w-[1000px] [@media(min-width:2400px)]:mx-auto">
          {Array(200)
            .fill(0)
            .map((c, i) => {
              return (
                <div
                  className="rounded bg-white dark:bg-dark-blue shadow-md h-[414px] w-full max-w-sm md:m-0 m-auto"
                  key={i}
                ></div>
              );
            })}
        </div>
      ) : null}
      {fetchError ? (
        <div className="text-2xl mx-auto pt-24">
          There was an error fetching the countries. Please try again.
        </div>
      ) : null}
    </main>
  );
};

export default Countries;
