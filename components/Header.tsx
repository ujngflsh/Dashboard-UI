import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onSearch: (term: string) => void;
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, startDate, endDate, onDateChange }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setShowAccount(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <header className="flex flex-col gap-4 mb-8 relative z-40">
      
      {/* Top Row: Title + Mobile Actions (optional) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-text transition-transform hover:text-primary cursor-default">
            Order Management
          </h1>
          <p className="text-sm text-text-light mt-1">Manage and track your recent orders</p>
        </div>

        {/* Right Side Actions Container */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          
          {/* Date Filter - Stacks on mobile */}
          <div className="flex items-center bg-white border border-border rounded-xl px-3 py-2 shadow-sm hover:border-primary/50 transition-colors w-full sm:w-auto justify-between">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => onDateChange(e.target.value, endDate)}
              className="outline-none text-xs sm:text-sm text-text bg-transparent cursor-pointer font-medium uppercase text-center w-full"
            />
            <span className="mx-2 text-text-light">-</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => onDateChange(startDate, e.target.value)}
              className="outline-none text-xs sm:text-sm text-text bg-transparent cursor-pointer font-medium uppercase text-center w-full"
            />
          </div>

          {/* Icons Group */}
          <div className="flex items-center justify-end gap-3">
            
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className={`
                  group relative border border-border rounded-full w-10 h-10 sm:w-[45px] sm:h-[45px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all overflow-hidden
                  ${showSearch ? 'bg-primary border-primary' : 'bg-white'}
                `}
              >
                <i className={`ri-search-line text-lg sm:text-xl relative z-10 transition-colors ${showSearch ? 'text-white' : 'text-primary'}`}></i>
              </button>
              
              {/* Search Dropdown */}
              <div 
                className={`
                  absolute top-[120%] right-0 bg-white rounded-xl shadow-2xl border border-border w-[280px] sm:w-[320px] overflow-hidden transition-all duration-300 origin-top-right z-50
                  ${showSearch ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
                `}
              >
                <div className="p-3 bg-secondary/30 border-b border-border flex items-center gap-2">
                  <i className="ri-search-line text-text-light"></i>
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Search name or ID..." 
                    value={searchTerm}
                    onChange={handleSearchInput}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-text placeholder:text-text-light/70"
                  />
                  {searchTerm && (
                    <button onClick={() => { setSearchTerm(''); onSearch(''); }} className="text-text-light hover:text-red-500">
                      <i className="ri-close-circle-fill"></i>
                    </button>
                  )}
                </div>
                <div className="p-2 text-[11px] text-center text-text-light bg-gray-50">
                  Type to filter results automatically
                </div>
              </div>
            </div>

            {/* Notification */}
            <button className="group relative bg-white border border-border rounded-full w-10 h-10 sm:w-[45px] sm:h-[45px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
              <i className="ri-notification-3-line text-lg sm:text-xl text-primary relative z-10 group-hover:scale-110 transition-all"></i>
              <span className="absolute top-2 right-2.5 bg-[#ff4757] w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,71,87,0.6)]"></span>
            </button>

            {/* Account */}
            <div className="relative" ref={accountRef}>
              <button 
                onClick={() => setShowAccount(!showAccount)}
                className="group relative bg-white border border-border rounded-full w-10 h-10 sm:w-[45px] sm:h-[45px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                <i className="ri-user-3-line text-lg sm:text-xl text-primary relative z-10 group-hover:scale-110 transition-all"></i>
              </button>

              {showAccount && (
                <div className="absolute top-[120%] right-0 bg-white rounded-xl shadow-xl border border-border w-[200px] z-50 animate-fadeInUp overflow-hidden">
                  <div className="p-4 border-b border-border bg-secondary/20">
                    <p className="text-sm font-bold text-text">Admin User</p>
                    <p className="text-xs text-text-light">admin@eproduct.com</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-secondary hover:text-primary transition-colors text-left">
                      <i className="ri-settings-3-line"></i> Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-secondary hover:text-primary transition-colors text-left">
                      <i className="ri-logout-box-r-line"></i> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;