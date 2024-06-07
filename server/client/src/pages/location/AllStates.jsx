import React, { useEffect, useRef, useState } from "react";
import "./MenuBar.css";
import { FaSearch, FaTimes } from "react-icons/fa";
import { stateDistricts } from "../../assets/data";
import { Link } from "react-router-dom";

const AllState = ({ isMenuOpen, setIsMenuOpen }) => {
  const menuRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStates, setFilteredStates] = useState(
    Object.keys(stateDistricts)
  );
  const [openState, setOpenState] = useState(null); // To track which state submenu is open
  const [activeLink, setActiveLink] = useState(null); // To track the active link

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      setFilteredStates(Object.keys(stateDistricts));
    } else {
      const filtered = Object.keys(stateDistricts).filter(
        (state) =>
          state.toLowerCase().includes(term) ||
          stateDistricts[state].some(
            (district) =>
              district.hindi.includes(term) ||
              district.english.toLowerCase().includes(term)
          )
      );
      setFilteredStates(filtered);
    }
  };

  const toggleSubmenu = (state) => {
    if (openState === state) {
      setOpenState(null); // Close the submenu if it's already open
    } else {
      setOpenState(state); // Open the clicked submenu
    }
  };

  // const handleLinkClick = (state, district) => {
  //   setActiveLink(`${state}-${district}`);
  // };

  return (
    <div>
      <div
        className={`overlay ${isMenuOpen ? "overlay-open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div ref={menuRef} className={`menu ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="menu-header">
          <h3 className="text-2xl font-semibold">अपना शहर चुनें</h3>
          <FaTimes
            size={20}
            className="close-btn text-red"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
        <div className="menu-search">
          <input
            type="text"
            placeholder="खोज करें"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button>
            <FaSearch />
          </button>
        </div>
        <ul>
          {filteredStates.map((state, index) => (
            <li key={index}>
              <div onClick={() => toggleSubmenu(state)}>{state}</div>
              {stateDistricts[state] && (
                <ul
                  className={`submenu ${
                    openState === state ? "submenu-open" : ""
                  }`}
                >
                  {stateDistricts[state].map((district, idx) => (
                    <li key={idx}>
                      <Link
                        to={`/${state}/${district.english}`}
                        className={
                          activeLink === `${state}-${district.english}`
                            ? "active"
                            : ""
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {district.hindi}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllState;
