"use client";
import React, { useEffect, useRef, useState } from "react";
import "./MenuBar.css";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { stateDistricts } from "@/assets/data";

const AllState = ({ isMenuOpen, setIsMenuOpen }) => {
  const menuRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const router = useRouter();

  // Handle clicks outside the menu to close it
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

  // Set up the initial state for all districts
  useEffect(() => {
    const allDistricts = Object.entries(stateDistricts).flatMap(
      ([state, districts]) =>
        districts.map((district) => ({ ...district, state }))
    );
    setFilteredDistricts(allDistricts);
  }, []);

  // Filter the districts based on the search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      const allDistricts = Object.entries(stateDistricts).flatMap(
        ([state, districts]) =>
          districts.map((district) => ({ ...district, state }))
      );
      setFilteredDistricts(allDistricts);
    } else {
      const filtered = Object.entries(stateDistricts)
        .flatMap(([state, districts]) =>
          districts.map((district) => ({ ...district, state }))
        )
        .filter(
          (district) =>
            district.hindi.includes(term) ||
            district.english.toLowerCase().includes(term)
        );
      setFilteredDistricts(filtered);
    }
  };

  return (
    <div>
      {/* Overlay */}
      <div
        className={`overlay ${isMenuOpen ? "overlay-open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Menu */}
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
          {filteredDistricts.map((district, index) => (
            <li
              key={index}
              className="capitalize w-full"
              onClick={() => {
                router.push(`state/${district.state}/${district.english}`);
                setIsMenuOpen(false);
              }}
            >
              {district.hindi}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllState;
