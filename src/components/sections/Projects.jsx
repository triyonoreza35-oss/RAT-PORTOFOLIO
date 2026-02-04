  "use client";

  import { useEffect, useState } from "react";

  const projects = [
    {
      title: "Website Buku Tamu Digital",
      description:
        "Aplikasi buku tamu digital untuk mencatat data pengunjung secara online.",
      tech: "Laravel • Bootstrap • MySQL",
      images: ["/image/login1.jpeg", "/image/admin1.jpeg", "/image/user2.jpeg"],
    },
    {
      title: "Website Peminjaman Ruangan",
      description:
        "Sistem peminjaman ruangan berbasis web untuk melihat ketersediaan dan status.",
      tech: "Next.js • React • Tailwind CSS",
      images: ["/image/login2.jpeg", "/image/admin2.jpeg", "/image/user3.jpeg"],
    },
    {
      title: "Website Bengkel Digital",
      description:
        "Website bengkel untuk pendaftaran servis dan monitoring perbaikan.",
      tech: "PHP Native • MySQL • CSS",
      images: [
        "/image/bengkel1.jpeg",
        "/image/bengkel2.jpeg",
        "/image/bengkel3.jpeg",
      ],
    },
  ];

  export default function Projects() {
    return (
      <section
        id="projects"
        className="py-28 bg-gradient-to-b from-slate-950 to-slate-900"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-12">
            Projects
          </h2>

          <div className="grid gap-10 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  function ProjectCard({ project }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % project.images.length);
      }, 5000); // 5 detik per slide

      return () => clearInterval(timer);
    }, [project.images.length]);

    return (
      <div className="relative rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        {/* Image Slider */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {project.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={project.title}
                className="w-full h-full flex-shrink-0 object-cover object-top"
              />
            ))}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-slate-100 font-semibold mb-2">
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm mb-3">
            {project.description}
          </p>

          <p className="text-xs text-[#A78BFA] font-medium">
            {project.tech}
          </p>
        </div>
      </div>
    );
  }
