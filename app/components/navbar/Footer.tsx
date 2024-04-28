'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Home from "@/app/page";
import { IoHomeOutline } from "react-icons/io5";
function Footer() {
  return (
    <footer className="bg-white-900 text-gray-600 border-t-2 py-8">
      <div className="container mx-auto px-4">
        {/* Logo */}
       
        {/* Menu items */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex items-center gap-3 justify-center mb-8">
        <IoHomeOutline className=" text-green-500" size={24}/>
    <Link href="/" className="text-green-500 text-2xl font-bold">Calabar</Link>
        </div>
          {/* First row of menu items */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="list-none">
              <li><a href="#" className="hover:text-gray-300">Properties</a></li>
              <li><a href="#" className="hover:text-gray-300">Destinations</a></li>
              <li><a href="#" className="hover:text-gray-300">Experiences</a></li>
            </ul>
          </div>
          {/* Second row of menu items */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help & Support</h4>
            <ul className="list-none">
              <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
            </ul>
          </div>
          {/* Third row of menu items */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="list-none">
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
              <li><a href="#" className="hover:text-gray-300">Social Media</a></li>
            </ul>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center mt-12">
          <p className="text-sm">&copy; 2024 Your Property Booking Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
