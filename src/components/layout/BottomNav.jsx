"use client";

import { Home, User, Brain, Folder, Mail, Award } from "lucide-react";

export default function BottomNav() {
  const menus = [
    { name: "Home", icon: Home },
    { name: "About", icon: User },
    { name: "Skills", icon: Brain },
    { name: "Projects", icon: Folder },
    { name: "Certificates", icon: Award }, 
    { name: "Contact", icon: Mail },
  ];  

  return (
    <nav className="fixed bottom-0 w-full z-50 md:hidden bg-slate-950/95 backdrop-blur border-t border-slate-800">
      <ul className="flex justify-around py-2 px-1">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.name} className="flex-1">
              <a
                href={`#${item.name.toLowerCase()}`}
                className="flex flex-col items-center gap-1
                           text-[10px] xs:text-[11px]
                           text-slate-400
                           transition-all duration-200
                           hover:text-[#A78BFA]
                           active:scale-90"
              >
                <Icon size={19} className="xs:size-[20px]" />
                <span className="font-medium">{item.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}