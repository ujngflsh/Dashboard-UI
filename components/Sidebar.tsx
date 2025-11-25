import React from 'react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { id: 'order', icon: 'ri-shopping-cart-line', label: 'Order' },
    { id: 'statistic', icon: 'ri-bar-chart-line', label: 'Statistic' },
    { id: 'product', icon: 'ri-shopping-bag-line', label: 'Product' },
    { id: 'stock', icon: 'ri-archive-line', label: 'Stock' },
    { id: 'offer', icon: 'ri-price-tag-3-line', label: 'Offer' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[70px] md:w-[250px] bg-primary text-white z-50 shadow-2xl transition-all duration-300 flex flex-col">
      {/* Logo */}
      <div className="px-0 md:px-6 py-6 border-b border-white/10 flex justify-center md:justify-start items-center h-[80px]">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 bg-white text-primary rounded-lg flex items-center justify-center font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform">
            eP
          </div>
          <h2 className="hidden md:block font-bold text-xl tracking-tight transition-all group-hover:text-white/90">
            eProduct
          </h2>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 overflow-y-auto scrollbar-hide">
        <ul className="list-none flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <li key={item.id} className="px-3">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className={`
                    relative flex items-center py-3 px-3 md:px-4 rounded-xl transition-all duration-300
                    group overflow-hidden
                    justify-center md:justify-start
                    ${isActive 
                      ? 'bg-white text-primary shadow-lg translate-x-1' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1'
                    }
                  `}
                >
                  {/* Icon */}
                  <i className={`${item.icon} text-xl md:mr-3 relative z-10 transition-transform duration-300 group-hover:scale-110`}></i>
                  
                  {/* Text */}
                  <span className={`hidden md:inline relative z-10 font-medium ${isActive ? 'font-bold' : ''}`}>
                    {item.label}
                  </span>

                  {/* Active Indicator Dot (Desktop) */}
                  {isActive && (
                    <div className="hidden md:block absolute right-3 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Bottom User Info (Optional) */}
      <div className="p-4 border-t border-white/10 mt-auto hidden md:block">
        <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm">
           <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
             <i className="ri-user-line text-sm"></i>
           </div>
           <div className="flex-1 overflow-hidden">
             <p className="text-xs font-medium truncate">Admin Account</p>
             <p className="text-[10px] text-white/60 truncate">View Profile</p>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;