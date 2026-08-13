"use client";

import { useMemo } from "react";
import {
  Home,
  User,
  Brain,
  Folder,
  Mail,
  Award,
} from "lucide-react";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const MENUS = [
  { name: "Home", icon: Home },
  { name: "About", icon: User },
  { name: "Skills", icon: Brain },
  { name: "Projects", icon: Folder },
  { name: "Certificates", icon: Award },
  { name: "Contact", icon: Mail },
];

export default function BottomNav() {
  const menuIds = useMemo(
    () => MENUS.map((menu) => menu.name.toLowerCase()),
    []
  );

  const { active } = useScrollSpy(menuIds, 140);

  return (
    <nav
      aria-label="Mobile navigation"
      className="
        fixed
        bottom-3
        left-1/2
        -translate-x-1/2
        w-[calc(100%-24px)]
        max-w-md
        z-50
        md:hidden
      "
    >
      <div
        className="
          w-full
          overflow-hidden
          bg-slate-950/85
          backdrop-blur-xl
          border
          border-slate-800/90
          rounded-2xl
          shadow-[0_10px_30px_rgba(0,0,0,0.5)]
          px-2
          py-1.5
        "
      >
        <ul className="flex w-full items-center">
          {MENUS.map((item) => {
            const Icon = item.icon;
            const id = item.name.toLowerCase();
            const isActive = active === id;

            return (
              <li
                key={item.name}
                className="min-w-0 flex-1"
              >
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative
                    flex
                    min-w-0
                    w-full
                    flex-col
                    items-center
                    justify-center
                    py-1.5
                    px-0.5
                    rounded-xl
                    transition-all
                    duration-300
                    ease-out
                    select-none
                    active:scale-90
                    ${
                      isActive
                        ? "text-cyan-300 font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }
                  `}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-cyan-500/15
                        to-purple-500/15
                        rounded-xl
                        border
                        border-cyan-500/30
                        shadow-[0_0_12px_rgba(34,211,238,0.2)]
                        -z-10
                      "
                    />
                  )}

                  <span
                    aria-hidden="true"
                    className={`
                      absolute
                      -top-0.5
                      h-1
                      w-3
                      rounded-full
                      bg-cyan-400
                      shadow-[0_0_8px_rgba(34,211,238,0.8)]
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0"
                      }
                    `}
                  />

                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.4 : 2}
                    className={`
                      shrink-0
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "scale-110 text-cyan-400 -translate-y-0.5"
                          : "opacity-75"
                      }
                    `}
                  />

                  <span
                    className="
                      block
                      w-full
                      min-w-0
                      truncate
                      text-center
                      text-[9px]
                      sm:text-[10px]
                      tracking-tight
                      mt-0.5
                    "
                  >
                    {item.name}
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