const NAV_LINKS = [
  { href: "#profile", label: "Profile" },
  { href: "#activities", label: "Activities" },
  { href: "#skills", label: "Skills" },
  { href: "#works", label: "Works" },
];

const Header = () => (
  <header className="sticky top-0 z-10 border-b border-white/8 bg-background/70 backdrop-blur-md">
    <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4 sm:px-8">
      <a href="#profile" className="text-[1.0625rem] font-extrabold tracking-[-0.02em] text-foreground">
        Shingo<span className="text-accent">.</span>
      </a>
      <nav className="flex flex-wrap gap-5 sm:gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-gray-400 transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
