const NAV_LINKS = [
  { href: "#profile", label: "Profile" },
  { href: "#activities", label: "Activities" },
  { href: "#skills", label: "Skills" },
  { href: "#works", label: "Works" },
];

const Header = () => (
  <header className="sticky top-0 z-10 border-b border-line bg-surface-alt/70 backdrop-blur-md">
    <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4 sm:px-8">
      <a href="#profile" className="text-[1.0625rem] font-bold text-foreground">
        中田 慎吾
      </a>
      <nav className="flex flex-wrap gap-5 sm:gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[0.9375rem] font-medium text-muted transition-colors hover:text-accent-text"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
