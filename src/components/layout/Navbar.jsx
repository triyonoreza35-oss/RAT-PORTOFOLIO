"use client";

import { useMemo } from "react";
import {
  Home,
  User,
  Code2,
  Briefcase,
  Award,
  Mail,
} from "lucide-react";
import { useScrollSpy } from "../../hooks/useScrollSpy";

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

export default function Navbar() {
  const menuIds = useMemo(
    () => MENUS.map((menu) => menu.toLowerCase()),
    []
  );

  const { active, scrolled } = useScrollSpy(menuIds, 120, 20);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 w-full z-[100]
        transition-all duration-300 ease-out
        ${
          scrolled
            ? `
              bg-slate-950/90
              backdrop-blur-xl
              border-b border-slate-800/80
              shadow-lg shadow-black/40
              py-2.5
            `
            : `
              bg-transparent
              py-3
            `
        }
      `}
    >
      <div
        className="
          w-full max-w-6xl
          mx-auto
          px-4 xs:px-5 sm:px-6
          flex items-center justify-between
          min-w-0
        "
      >
        {/* =========================
            LOGO
        ========================== */}
        <a
          href="#home"
          aria-label="Go to Home"
          className="
            relative flex-shrink-0
            flex items-center
            group
            select-none
            outline-none
          "
        >
          <div className="relative">
            {/* Glow */}
            <div
              className="
                absolute
                -inset-2
                bg-[#A78BFA]/20
                blur-xl
                rounded-full
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-500
                pointer-events-none
              "
            />

            <img
              src="/image/logo.jpeg"
              alt="Logo RAT"
              className="
                relative
                block
                h-8 xs:h-9 sm:h-10
                w-auto
                max-w-[90px] xs:max-w-[100px]
                object-contain
                rounded-xl
                transition-all duration-300
                animate-logo-pulse
                group-hover:animate-none
                group-hover:brightness-110
                group-hover:contrast-125
              "
            />
          </div>
        </a>

        {/* =========================
            DESKTOP MENU
            Hanya muncul mulai md (768px)
        ========================== */}
        <ul
          className="
            hidden md:flex
            items-center
            gap-1
            p-1.5
            rounded-full
            bg-slate-900/80
            border border-slate-800/90
            backdrop-blur-xl
            shadow-xl shadow-black/30
          "
        >
          {MENUS.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;
            const Icon = menuIcons[id] || Home;

            return (
              <li
                key={item}
                className="relative flex-shrink-0"
              >
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative
                    flex items-center justify-center
                    gap-2
                    px-3 lg:px-4
                    py-2
                    rounded-full
                    text-xs
                    font-semibold
                    whitespace-nowrap
                    select-none
                    transition-all duration-300 ease-out

                    ${
                      isActive
                        ? `
                          bg-cyan-500/15
                          text-cyan-300
                          border border-cyan-500/30
                          shadow-[0_0_15px_rgba(34,211,238,0.25)]
                        `
                        : `
                          text-slate-400
                          border border-transparent
                          hover:text-slate-200
                          hover:bg-slate-800/50
                        `
                    }
                  `}
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    className={`
                      flex-shrink-0
                      transition-all duration-300
                      ${
                        isActive
                          ? "scale-110 text-cyan-400"
                          : "opacity-70"
                      }
                    `}
                  />

                  <span className="tracking-wide">
                    {item}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}