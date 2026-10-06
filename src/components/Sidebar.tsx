import { NavLink } from "react-router-dom";
import { FileText, Home, Users, Landmark } from "lucide-react";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-zinc-200 font-medium text-zinc-900"
        : "text-zinc-100 hover:bg-zinc-700"
    }`;

  return (
    <aside className="min-h-screen w-64 bg-zinc-800 px-4 py-6 text-white">
      <div className="mb-10 flex items-center gap-4 px-2">
        <img src={logo} alt="OPORA" className="h-24 w-24 object-contain" />

        <div>
          <h1 className="text-3xl font-bold tracking-wider">OPORA</h1>

          <p className="text-m text-zinc-400">система обліку</p>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink to="/" end className={linkStyles}>
              <Home size={20} />
              <span>Головна</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/soldiers" className={linkStyles}>
              <Users size={20} />
              <span>Військовослужбовці</span>
            </NavLink>
          </li>

          <li>
            <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-100">
              <FileText size={20} />
              <span>Документи</span>
            </div>
          </li>
          <li>
            <NavLink to="/requisites" className={linkStyles}>
              <Landmark size={20} />
              <span>Реквізити</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
