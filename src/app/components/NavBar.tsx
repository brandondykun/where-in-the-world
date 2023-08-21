import Themechanger from "./ThemeChanger";

const NavBar = () => {
  return (
    <section className="flex items-center justify-between px-4 sm:px-8 py-6 bg-white dark:bg-dark-blue">
      <div className="font-bold sm:text-2xl">Where in the World?</div>
      <Themechanger />
    </section>
  );
};

export default NavBar;
