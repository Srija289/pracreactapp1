import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">React App</Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/register">Registration</Link></li>
          <li><Link to="/admin">Admin Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;