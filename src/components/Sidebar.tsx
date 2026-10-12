import { NavLink } from "react-router-dom";
import {
  CalendarDays,
  FileText,
  Files,
  Home,
  Users,
  ShieldCheck,
  Settings,
} from "lucide-react";
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
      <NavLink
        to="/"
        className="mb-10 flex cursor-pointer items-center gap-4 px-2"
        aria-label="Перейти на головну"
      >
        <img src={logo} alt="OPORA" className="h-24 w-24 object-contain" />

        <div>
          <h1 className="text-3xl font-bold tracking-wider">OPORA</h1>

          <p className="text-m text-zinc-400">система обліку</p>
        </div>
      </NavLink>

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
            <NavLink to="/documents" className={linkStyles}>
              <FileText size={20} />
              <span>Документи</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/templates" className={linkStyles}>
              <Files size={20} />
              <span>Шаблони</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/command-staff" className={linkStyles}>
              <ShieldCheck size={20} />
              <span>Командний склад</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/calendar" className={linkStyles}>
              <CalendarDays size={20} />
              <span>Календар</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className={linkStyles}>
              <Settings size={20} />
              <span>Налаштування</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
