import Countries from "./components/Countries";
import { listCountries } from "@/lib/restcountries";

export default async function Home() {
  try {
    const countries = await listCountries();
    return <Countries countries={countries} />;
  } catch {
    return (
      <main className="flex-1 flex flex-col bg-very-light-gray dark:bg-very-dark-blue-bg px-8 py-8 md:py-12">
        <div className="text-2xl mx-auto pt-24">
          There was an error fetching the countries. Please try again.
        </div>
      </main>
    );
  }
}
