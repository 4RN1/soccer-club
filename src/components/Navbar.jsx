import { useState } from 'react'
import { Link } from "react-router-dom";
import '../css/Navbar.css'

function Navbar() {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className='container'>
      <div className={`navbar ${show ? "show" : ""}`}>

        {/* logo + button */}
        <div className='upper-nav'>
          <Link to={'/'}><img src="/logo.png" alt="logo" className='logo' /></Link>

          <button
            className='toggle-menu'
            onClick={() => setShow(!show)}
          >
            {show ? '✖' : "☰"}
          </button>
        </div>

        {/* Navigation links */}
        <div className='nav-links-wrap'>
          <ul className={`nav-links ${show ? 'active' : ""}`}>

            <li><Link to="/">მთავარი</Link></li>
            <li><Link to="/about">ჩვენს შესახებ</Link></li>
            <li><Link to="/schedule">განრიგი / პროგრამები</Link></li>
            <li><Link to="/news">ახალი ამბები</Link></li>
            <li><Link to="/gallery">გალერეა</Link></li>
            <li><Link to="/registration">რეგისტრაცია</Link></li>

            {/* ================= DROPDOWN MENU ================= */}
            <li 
              className="dropdown"
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              onClick={() => setDropdown(!dropdown)} // mobile support
            >
              წესები ▾

              <ul className={`dropdown-menu ${dropdown ? 'open' : ''}`}>
                <li><Link to="/privacy">კონფიდენციალურობა</Link></li>
                <li><Link to="/note">შენიშვნა</Link></li>
              </ul>
            </li>
            {/* ================================================== */}

          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar;
