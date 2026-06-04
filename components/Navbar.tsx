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

      <svg className="nav-bottom-svg" viewBox="0 0 1440 22" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="navLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="10%"  stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="50%"  stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="90%"  stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="navGlow" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <polyline
          points="0,1 430,1 510,21 930,21 1010,1 1440,1"
          fill="none"
          stroke="url(#navLineGrad)"
          strokeWidth="1.5"
          filter="url(#navGlow)"
        />
      </svg>
    </nav>
  );
}
