import React, { useState, useEffect } from 'react';
import { Order, SortColumn, SortDirection } from '../types';

interface OrdersTableProps {
  orders: Order[];
  sortConfig: { key: SortColumn; direction: SortDirection };
  onSort: (key: SortColumn) => void;
  onDelete: (id: string) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, sortConfig, onSort, onDelete }) => {
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  const toggleAction = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveActionId(activeActionId === id ? null : id);
  };

  useEffect(() => {
    const closeDropdown = () => setActiveActionId(null);
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-orange-50 text-orange-600 border border-orange-200';
      case 'dispatch': return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'completed': return 'bg-green-50 text-green-600 border border-green-200';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    // Note: Removed overflow-hidden from the outer card to allow action dropdowns to pop out visibly
    <div className="bg-white rounded-xl shadow-sm border border-border transition-all duration-300 hover:shadow-md animate-fadeInUp relative z-0">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-background border-b border-border">
              {['id', 'name', 'address', 'date', 'price', 'status'].map((col) => (
                <th 
                  key={col}
                  onClick={() => onSort(col as SortColumn)}
                  className="p-4 text-left font-semibold text-xs text-text-light uppercase tracking-wider cursor-pointer group select-none hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {col}
                    <div className="flex flex-col text-[10px] leading-[8px] text-gray-400">
                      <i className={`ri-arrow-up-s-fill ${sortConfig.key === col && sortConfig.direction === 'asc' ? 'text-primary' : ''}`}></i>
                      <i className={`ri-arrow-down-s-fill ${sortConfig.key === col && sortConfig.direction === 'desc' ? 'text-primary' : ''}`}></i>
                    </div>
                  </div>
                </th>
              ))}
              <th className="p-4 text-center font-semibold text-xs text-text-light uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                className="border-b border-border last:border-0 hover:bg-primary/[0.02] transition-colors duration-200"
              >
                <td className="p-4 text-sm font-medium text-primary">
                  {order.id}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={order.avatar} 
                      alt={order.name} 
                      className="w-10 h-10 rounded-full object-cover border border-border shadow-sm"
                      loading="lazy" 
                    />
                    <span className="font-medium text-sm text-text">{order.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-text-light max-w-[200px] truncate" title={order.address}>
                  {order.address}
                </td>
                <td className="p-4 text-sm text-text">
                  {order.date}
                </td>
                <td className="p-4 text-sm font-bold text-text">
                  {order.price}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 relative text-center">
                  <button 
                    onClick={(e) => toggleAction(order.id, e)}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                      ${activeActionId === order.id ? 'bg-primary text-white shadow-md' : 'text-text-light hover:bg-secondary hover:text-primary'}
                    `}
                  >
                    <i className="ri-more-2-fill"></i>
                  </button>

                  {/* Dropdown Menu - Positioned Absolute */}
                  {activeActionId === order.id && (
                    <div 
                      className="absolute right-10 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl border border-border w-[140px] z-50 animate-fadeInUp overflow-hidden origin-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button 
                        onClick={() => { alert(`Viewing ${order.id}`); setActiveActionId(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-text hover:bg-secondary hover:text-primary transition-colors text-left"
                      >
                        <i className="ri-eye-line text-sm"></i> View Details
                      </button>
                      <button 
                        onClick={() => { alert(`Editing ${order.id}`); setActiveActionId(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-text hover:bg-secondary hover:text-primary transition-colors text-left"
                      >
                        <i className="ri-edit-line text-sm"></i> Edit Order
                      </button>
                      <div className="h-[1px] bg-border my-1"></div>
                      <button 
                        onClick={() => { onDelete(order.id); setActiveActionId(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors text-left"
                      >
                        <i className="ri-delete-bin-line text-sm"></i> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Empty State */}
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
             <div className="bg-secondary/50 p-4 rounded-full mb-3">
               <i className="ri-search-2-line text-3xl text-primary/50"></i>
             </div>
             <h3 className="text-text font-semibold mb-1">No Orders Found</h3>
             <p className="text-text-light text-sm">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;