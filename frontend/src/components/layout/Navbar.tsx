import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { LuSun } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import UserModel from "./UserCreateModal";

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "nord");

  useEffect(() => {
    themeChange(false);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    const newTheme = theme === "nord" ? "sunset" : "nord";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="navbar bg-base-100 rounded-xl flex flex-row justify-between py-5">
      <a className=" text-xl font-medium">React + Flask 👻</a>

      <div className="gap-2">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={handleThemeChange}
            checked={theme === "sunset"}
          />
          <LuSun className="swap-on h-6 w-6 fill-current" />
          <IoMoonOutline className="swap-off h-6 w-6 fill-current" />
        </label>

        <UserModel />
      </div>
    </div>
  );
}

export default Navbar;
