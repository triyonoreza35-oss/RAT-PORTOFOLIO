"use client";

import { 
  Home, 
  User, 
  Code2, 
  Briefcase, 
  Award, 
  Mail 
} from "lucide-react";

const menuIcons = {
  home: Home,
  about: User,
  skills: Code2,
  projects: Briefcase,
  certificates: Award,
  contact: Mail,
};

const MENUS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Certificates",
  "Contact",
];

export default function Navbar({ active, scrolled }) {
  return (
    <nav
      className={`
        fixed top-0 w-full z-50
        transition-all duration-300
        ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3"
            : "bg-transparent py-4"
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-2 bg-[#A78BFA]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src="/image/logo.jpeg"
              alt="Logo RAT"
              className="
                relative h-9 sm:h-10 w-auto object-contain rounded-xl
                transition-all duration-500
                animate-logo-pulse
                group-hover:animate-none
                group-hover:brightness-110
                group-hover:contrast-125
              "
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-slate-900/80 border border-slate-800/90 backdrop-blur-md shadow-xl shadow-black/30">
          {MENUS.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;
            const Icon = menuIcons[id] || Home;

            return (
              <li key={item} className="relative">
                <a
                  href={`#${id}`}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                    transition-all duration-300 ease-out select-none
                    ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }
                  `}
                >
                  <Icon
                    size={15}
                    className={`transition-all duration-300 ${
                      isActive ? "scale-110 text-cyan-400" : "opacity-70"
                    }`}
                  />
                  <span className="tracking-wide">{item}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}