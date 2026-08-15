"use client";

import { Home, User, Brain, Folder, Mail, Award } from "lucide-react";
import { memo } from "react";

const MENUS = [
  { name: "Home", icon: Home },
  { name: "About", icon: User },
  { name: "Skills", icon: Brain },
  { name: "Projects", icon: Folder },
  { name: "Certificates", icon: Award },
  { name: "Contact", icon: Mail },
];

// Hapus 'export default' di sini
function BottomNav({ active }) {
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50 md:hidden">
      <div className="bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] px-2 py-1.5">
        <ul className="flex items-center justify-between">
          {MENUS.map((item) => {
            const Icon = item.icon;
            const id = item.name.toLowerCase();
            const isActive = active === id;

            return (
              <li key={item.name} className="flex-1">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl
                    transition-all duration-300 ease-out select-none
                    ${
                      isActive
                        ? "text-cyan-300 font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }
                    active:scale-90
                  `}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-t from-cyan-500/15 to-purple-500/15 rounded-xl border border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.2)] -z-10" />
                  )}

                  <span
                    className={`
                      absolute -top-0.5 h-1 w-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]
                      transition-all duration-300
                      ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                    `}
                  />

                  <Icon
                    size={18}
                    className={`
                      transition-all duration-300
                      ${isActive ? "scale-110 text-cyan-400 -translate-y-0.5" : "opacity-75"}
                    `}
                  />

                  <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5">
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

// Satu-satunya export default di file ini
export default memo(BottomNav);