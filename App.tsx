import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import OrdersTable from './components/OrdersTable';
import Pagination from './components/Pagination';
import { MOCK_ORDERS } from './constants';
import { SortColumn, SortDirection, FilterState } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('order'); // For Sidebar Nav
  const [tablePage, setTablePage] = useState(1);
  const itemsPerPage = 10;
  
  const [sortConfig, setSortConfig] = useState<{ key: SortColumn; direction: SortDirection }>({
    key: 'date', // Default sort by date
    direction: 'desc'
  });

  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    search: '',
    startDate: '', // Default empty to show all
    endDate: '',
  });

  const [orders, setOrders] = useState(MOCK_ORDERS);

  // Reset pagination when filters change
  useEffect(() => {
    setTablePage(1);
  }, [filters]);

  const handleDelete = (id: string) => {
    if (window.confirm(`Are you sure you want to delete order ${id}?`)) {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  // Processing Data
  const filteredOrders = useMemo(() => {
    let data = [...orders];

    // 1. Search (Case insensitive, checks Name or ID)
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase().trim();
      data = data.filter(order => 
        order.name.toLowerCase().includes(lowerSearch) || 
        order.id.toLowerCase().includes(lowerSearch)
      );
    }

    // 2. Status Filter
    if (filters.status !== 'all') {
      data = data.filter(order => order.status.toLowerCase() === filters.status.toLowerCase());
    }

    // 3. Date Filter
    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      start.setHours(0,0,0,0);
      end.setHours(23,59,59,999);

      data = data.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= start && orderDate <= end;
      });
    }

    // 4. Sorting
    data.sort((a, b) => {
      let aVal: string | number = a[sortConfig.key];
      let bVal: string | number = b[sortConfig.key];

      // Handle Price Sorting (remove $ sign)
      if (sortConfig.key === 'price') {
        aVal = parseFloat(String(aVal).replace(/[^0-9.-]+/g, ""));
        bVal = parseFloat(String(bVal).replace(/[^0-9.-]+/g, ""));
      }
      
      // Handle Date Sorting
      if (sortConfig.key === 'date') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [orders, filters, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (tablePage - 1) * itemsPerPage,
    tablePage * itemsPerPage
  );

  // Handlers
  const handleSort = (key: SortColumn) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="flex min-h-screen bg-background font-sans text-text overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
      />

      {/* Main Content */}
      <main className="flex-1 ml-[70px] md:ml-[250px] p-4 md:p-8 transition-all duration-300 w-[calc(100%-70px)] md:w-[calc(100%-250px)]">
        <Header 
          onSearch={(term) => {
            setFilters(prev => ({ ...prev, search: term }));
          }}
          startDate={filters.startDate}
          endDate={filters.endDate}
          onDateChange={(start, end) => {
            setFilters(prev => ({ ...prev, startDate: start, endDate: end }));
          }}
        />

        <div className="flex flex-col gap-6 animate-fadeInUp">
          <FilterBar 
            activeFilter={filters.status}
            onFilterChange={(status) => {
              setFilters(prev => ({ ...prev, status }));
            }}
            resultCount={filteredOrders.length}
          />

          <OrdersTable 
            orders={paginatedOrders}
            sortConfig={sortConfig}
            onSort={handleSort}
            onDelete={handleDelete}
          />

          <Pagination 
            currentPage={tablePage}
            totalPages={totalPages}
            onPageChange={setTablePage}
          />
        </div>
      </main>
    </div>
  );
};

export default App;