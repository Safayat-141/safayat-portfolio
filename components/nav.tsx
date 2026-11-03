export default function Nav() {
  return (
    <nav className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 mb-10 border-b border-slate-200 pb-4 bg-white/80 backdrop-blur sticky top-0 z-20">
      <a href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About</a>
      <a href="#education" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Education</a>
      <a href="#experience" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Experience</a>
      <a href="#skills" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Skills</a>
      <a href="#projects" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Projects</a>
      <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
    </nav>
  )
}
