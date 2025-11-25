import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2.5 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-xl border border-border bg-white flex items-center justify-center text-text-light hover:text-primary hover:border-primary hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300 group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-primary scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl origin-center opacity-10" />
        <i className="ri-arrow-left-s-line text-xl relative z-10 group-hover:scale-125 transition-transform"></i>
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                w-10 h-10 rounded-xl border flex items-center justify-center font-medium transition-all duration-300 relative overflow-hidden group
                ${isActive 
                  ? 'bg-primary border-primary text-white scale-110 shadow-md shadow-primary/30' 
                  : 'bg-white border-border text-text hover:text-primary hover:border-primary hover:-translate-y-0.5 hover:shadow-md'
                }
              `}
            >
              {/* Active Glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[whiteGlow_2s_infinite]" />
              )}
              {/* Hover effect for inactive */}
              {!isActive && (
                 <div className="absolute inset-0 bg-primary scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl origin-center opacity-10" />
              )}
              <span className="relative z-10">{page}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-xl border border-border bg-white flex items-center justify-center text-text-light hover:text-primary hover:border-primary hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300 group overflow-hidden relative"
      >
         <div className="absolute inset-0 bg-primary scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl origin-center opacity-10" />
        <i className="ri-arrow-right-s-line text-xl relative z-10 group-hover:scale-125 transition-transform"></i>
      </button>
    </div>
  );
};

export default Pagination;
