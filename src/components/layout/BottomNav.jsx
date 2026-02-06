"use client";

import { Home, User, Brain, Folder, Mail, Award } from "lucide-react";
import { useEffect, useState } from "react";

export default function BottomNav() {
  const [active, setActive] = useState("home");

  const menus = [
    { name: "Home", icon: Home },
    { name: "About", icon: User },
    { name: "Skills", icon: Brain },
    { name: "Projects", icon: Folder },
    { name: "Certificates", icon: Award },
    { name: "Contact", icon: Mail },
  ];

  // Scroll spy (mobile)
  useEffect(() => {
    const sections = menus.map((m) =>
      document.getElementById(m.name.toLowerCase())
    );

    const onScroll = () => {
      const scrollPos = window.scrollY + 140;
      sections.forEach((section) => {
        if (
          section &&
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActive(section.id);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed bottom-0 w-full z-50 md:hidden bg-slate-950/95 backdrop-blur border-t border-slate-800">
      <ul className="flex justify-around py-2 px-1">
        {menus.map((item) => {
          const Icon = item.icon;
          const id = item.name.toLowerCase();
          const isActive = active === id;

          return (
            <li key={item.name} className="flex-1">
              <a
                href={`#${id}`}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative flex flex-col items-center gap-1
                  text-[10px] xs:text-[11px] font-medium
                  transition-all duration-200
                  ${isActive
                    ? "text-violet-400 -translate-y-0.5"
                    : "text-slate-400 hover:text-violet-300"}
                  active:scale-95
                `}
              >
                {/* Active indicator dot */}
                <span
                  className={`
                    absolute -top-1 h-1 w-1 rounded-full bg-violet-400
                    transition-all duration-200
                    ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                  `}
                />

                <Icon
                  size={19}
                  className={`
                    xs:size-[20px]
                    transition-transform duration-200
                    ${isActive ? "scale-110" : ""}
                  `}
                />
                <span>{item.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
