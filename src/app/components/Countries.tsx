"use client";

import { useState } from "react";
import CountryCard from "./CountryCard";
import { CountryType } from "../../../types";
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

const Countries = ({ countries }: { countries: CountryType[] }) => {
  const [filtered, setFiltered] = useState<CountryType[]>(countries);
  const [regionFilter, setRegionFilter] = useState<string>("All");

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setFiltered(countries);
      return;
    }
    const next = countries.filter((c) => {
      return (
        c.names.common
          .toLocaleLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        c.names.official.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFiltered(next);
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
  countries.forEach((c) => {
    if (c.region && !regions.includes(c.region)) {
      regions.push(c.region);
    }
  });

  return (
    <main className="flex-1 flex flex-col bg-very-light-gray dark:bg-very-dark-blue-bg px-8 py-8 md:py-12">
      <div className="flex flex-col gap-10 pb-12 md:flex-row md:justify-between md:items-center md:pb-16">
        <div className="relative max-w-[400px] md:w-96 shadow-md rounded">
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
            {doubleFiltered.length} / {countries.length}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-16 place-items-stretch [@media(min-width:2400px)]:w-[1000px] [@media(min-width:2400px)]:mx-auto">
        {doubleFiltered.length > 0 &&
          doubleFiltered.map((c) => {
            return <CountryCard country={c} key={c.names.official} />;
          })}
      </div>
      {doubleFiltered.length === 0 ? (
        <div className="text-3xl pt-20 mx-auto">No Countries Found</div>
      ) : null}
    </main>
  );
};

export default Countries;
