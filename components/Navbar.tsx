export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-links nav-links-left">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
        </div>

        <div className="nav-center">
          <div className="nav-center-logo">maulanafaqih</div>
        </div>

        <div className="nav-links nav-links-right">
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}
