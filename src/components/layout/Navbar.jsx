import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menus = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Certificates",
    "Contact",
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo Wrapper */}
        <div className="flex items-center group cursor-pointer">
          <div className="relative">
            {/* Glow di belakang yang ikut berkedip halus */}
            <div className="absolute -inset-2 bg-[#A78BFA]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <img
              src="/image/logo.jpeg"
              alt="Logo RAT"
              className="relative h-9 w-auto sm:h-11 object-contain 
                 rounded-xl transition-all duration-700
                 [mix-blend-mode:screen]
                 /* State normal: Berkedip & Redup */
                 animate-logo-pulse
                 /* State Hover: Berhenti berkedip, terang, & berwarna */
                 group-hover:animate-none
                 group-hover:brightness-110 
                 group-hover:contrast-125
                 group-hover:grayscale-0"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          {menus.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-primary transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
