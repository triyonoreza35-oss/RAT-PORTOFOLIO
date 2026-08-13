import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollSpy(ids = [], offset = 120, scrollThreshold = null) {
  const [active, setActive] = useState(() => ids[0]?.toLowerCase() || "home");
  const [scrolled, setScrolled] = useState(false);

  const idsRef = useRef(ids);
  const offsetRef = useRef(offset);
  const thresholdRef = useRef(scrollThreshold);
  const sectionsCacheRef = useRef([]);
  const tickingRef = useRef(false);
  const rafIdRef = useRef(null);

  useEffect(() => {
    idsRef.current = ids;
    offsetRef.current = offset;
    thresholdRef.current = scrollThreshold;
  }, [ids, offset, scrollThreshold]);

  const recalculateSections = useCallback(() => {
    const cached = [];
    const currentIds = idsRef.current;

    for (let i = 0; i < currentIds.length; i++) {
      const id = currentIds[i].toLowerCase();
      const element = document.getElementById(id);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;
        cached.push({
          id,
          top,
          bottom: top + height,
        });
      }
    }
    sectionsCacheRef.current = cached;
  }, []);

  const updateScrollState = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollPos = scrollY + offsetRef.current;
    const cachedSections = sectionsCacheRef.current;

    let currentActive = "";
    for (let i = 0; i < cachedSections.length; i++) {
      const section = cachedSections[i];
      if (scrollPos >= section.top && scrollPos < section.bottom) {
        currentActive = section.id;
        break;
      }
    }

    if (
      !currentActive &&
      cachedSections.length > 0 &&
      window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50
    ) {
      currentActive = cachedSections[cachedSections.length - 1].id;
    }

    if (currentActive) {
      setActive((prev) => (prev === currentActive ? prev : currentActive));
    }

    if (thresholdRef.current !== null) {
      const isScrolled = scrollY > thresholdRef.current;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
    }
  }, []);

  useEffect(() => {
    recalculateSections();
    updateScrollState();

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        rafIdRef.current = requestAnimationFrame(() => {
          updateScrollState();
          tickingRef.current = false;
        });
      }
    };

    let resizeRafId = null;
    const onResize = () => {
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        recalculateSections();
        updateScrollState();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    window.addEventListener("hashchange", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("hashchange", onScroll);

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
    };
  }, [recalculateSections, updateScrollState]);

  return { active, scrolled };
}

export default useScrollSpy;