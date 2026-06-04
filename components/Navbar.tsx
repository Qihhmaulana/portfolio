export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-logo">maulanafaqih<span>.dev</span></div>
        <div className="nav-links">
          <a href="#about">about</a>
          <a href="#tools">tools</a>
          <a href="#experience">experience</a>
          <a href="#projects">projects</a>
          <a href="#contact">contact</a>
          <button className="nav-btn">hire me</button>
        </div>
      </div>
    </nav>
  );
}
