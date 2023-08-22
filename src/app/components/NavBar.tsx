import Themechanger from "./ThemeChanger";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-8 py-6 bg-white dark:bg-dark-blue shadow-md z-10">
      <div className="font-bold sm:text-2xl">Where in the World?</div>
      <Themechanger />
    </div>
  );
};

export default NavBar;
