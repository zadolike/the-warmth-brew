import React from 'react';
import { APP_TITLE, APP_SUBTITLE } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo Icon imitation */}
          <div className="w-10 h-10 rounded-full bg-sb-green flex items-center justify-center text-white font-bold text-xl shadow-md">
            谦
          </div>
          <div className="flex flex-col">
            <h1 className="text-sb-dark font-bold text-lg tracking-tight leading-none">{APP_TITLE}</h1>
            <span className="text-xs text-sb-green tracking-widest uppercase font-semibold">{APP_SUBTITLE}</span>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-bold text-sb-dark uppercase tracking-wide">
          <span className="cursor-pointer hover:text-sb-green transition-colors">MENU</span>
          <span className="cursor-pointer hover:text-sb-green transition-colors">REWARDS</span>
          <span className="cursor-pointer hover:text-sb-green transition-colors">GIFT CARDS</span>
        </nav>
        <div className="md:hidden text-sb-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;