import { useEffect, useRef, useState } from "react";

/**
 * Custom hook untuk mendeteksi section yang sedang aktif di viewport saat scroll.
 * Optimasi:
 * - Menggunakan 1 event listener passive
 * - Throttle via requestAnimationFrame
 * - Guard condition untuk mencegah re-render jika active section tidak berubah
 */
export default function useScrollSpy(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");
  const ticking = useRef(false);

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + offset;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection((prev) => (prev === id ? prev : id));
            break;
          }
        }
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    // Jalankan sekali saat mount untuk set initial active state
    updateActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return activeSection;
}