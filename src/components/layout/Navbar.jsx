import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const menus = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Certificates",
    "Contact",
  ];

  // Detect scroll for navbar style
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Simple scroll spy
  useEffect(() => {
    const sections = menus.map((m) =>
      document.getElementById(m.toLowerCase())
    );

    const onScroll = () => {
      const scrollPos = window.scrollY + 120;
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
    <nav
      className={`
        fixed top-0 w-full z-50
        transition-all duration-300
        ${scrolled
          ? "bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-lg shadow-black/30"
          : "bg-slate-950/70 backdrop-blur border-b border-slate-800"}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-2 bg-[#A78BFA]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src="/image/logo.jpeg"
              alt="Logo RAT"
              className="
                relative h-9 sm:h-11 w-auto object-contain rounded-xl
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
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {menus.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;

            return (
              <li key={item} className="relative">
                <a
                  href={`#${id}`}
                  className={`
                    relative px-1 py-2
                    transition-all duration-200
                    ${isActive
                      ? "text-violet-400"
                      : "text-slate-300 hover:text-violet-300"}
                    hover:-translate-y-0.5
                  `}
                >
                  {item}

                  {/* underline indicator */}
                  <span
                    className={`
                      absolute left-0 -bottom-0.5 h-[2px] w-full
                      bg-violet-400 rounded-full
                      transition-all duration-300 origin-left
                      ${isActive ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
