export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 backdrop-blur">
    <div className="max-w-6xl mx-auto px-4 py-6 pb-20 md:pb-6 text-center">  
      <p className="text-xs text-slate-500">
  © {new Date().getFullYear()}{" "}
  <span className="text-slate-300 font-medium">
    Reza Aditya Triyono
  </span>
  . Built with care.
</p>
      </div>
    </footer>
  );
}
