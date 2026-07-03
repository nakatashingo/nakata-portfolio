const NAV_LINKS = [
  { href: "#profile", label: "Profile" },
  { href: "#activities", label: "Activities" },
  { href: "#skills", label: "Skills" },
  { href: "#works", label: "Works" },
  { href: "#news", label: "News" },
];

const Header = () => (
  <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/8 bg-surface-alt px-8 py-4">
    <a href="#profile" className="text-[1.0625rem] font-extrabold tracking-[-0.02em] text-accent">
      Shingo Nakata
    </a>
    <nav className="flex flex-wrap gap-8">
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-gray-300 transition-colors hover:text-accent"
        >
          {link.label}
        </a>
      ))}
    </nav>
  </header>
);

export default Header;
