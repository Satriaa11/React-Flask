import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { LuSun } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import UserCreateModal from "./UserCreateModal";
import { Friends } from "../../types/user";

interface NavbarProps {
  onUserAdded: (newUser: Friends) => void;
}

function Navbar({ onUserAdded }: NavbarProps) {
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
    <div className="navbar bg-base-100 flex flex-row justify-between py-5">
      <h1 className=" text-xl font-medium">React + Flask 👻</h1>

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

        <UserCreateModal onUserAdded={onUserAdded} />
      </div>
    </div>
  );
}

export default Navbar;
