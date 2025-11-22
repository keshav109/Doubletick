import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import TableHeader from './components/TableHeader';
import CustomerRow from './components/CustomerRow';
import Pagination from './components/Pagination';
import { generateCustomers } from './utils/dataGenerator';
import { getAllCustomers, saveCustomers } from './utils/indexedDb';
import { useDebounce } from './hooks/useDebounce';
import './styles/App.css';

function App() {
  // Customers are loaded from IndexedDB; fall back to generating a smaller dataset for dev
  const [allCustomers, setAllCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const ROWS_PER_PAGE = 30;
  
  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  // Load persisted customers once on mount (or generate & persist a dev dataset)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const persisted = await getAllCustomers();
        if (!mounted) return;
        if (persisted && persisted.length > 0) {
          setAllCustomers(persisted);
        } else {
          // Generate a large default dataset per user request
          const GENERATED_COUNT = 1000000;
          const generated = generateCustomers(GENERATED_COUNT);

          // Persisting 1,000,000 records to IndexedDB in a single transaction
          // may block or fail in the browser. We avoid saving very large datasets
          // to keep the dev workflow responsive. If you want persistence for
          // large datasets, consider chunked background saves or server-side storage.
          const PERSIST_THRESHOLD = 100000; // don't persist when count is bigger
          if (generated.length <= PERSIST_THRESHOLD) {
            await saveCustomers(generated);
          } else {
            // console.warn(`Generated ${generated.length} customers; skipping immediate IndexedDB persistence to avoid blocking the browser.`);
          }

          setAllCustomers(generated);
        }
      } catch (err) {
        // If IndexedDB fails, fall back to generating customers in-memory
        console.error('IndexedDB load error:', err);
        const generated = generateCustomers(1000);
        setAllCustomers(generated);
      } finally {
        if (mounted) setIsLoadingCustomers(false);
      }
    })();

    return () => { mounted = false; };
  }, []);
  
  // Filter customers (no global sort) — we'll sort only the visible page
  const filteredCustomers = useMemo(() => {
    let result = [...allCustomers];

    // Apply search filter
    if (debouncedSearchTerm) {
      const lowerSearch = debouncedSearchTerm.toLowerCase();
      result = result.filter(customer =>
        customer.name.toLowerCase().includes(lowerSearch) ||
        customer.email.toLowerCase().includes(lowerSearch) ||
        customer.phone.includes(lowerSearch)
      );
    }

    return result;
  }, [allCustomers, debouncedSearchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / ROWS_PER_PAGE);

  // Visible customers: slice page, then apply sort only to that page
  const visibleCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const page = filteredCustomers.slice(startIndex, endIndex);

    if (!sortConfig.key) return page;

    const sortedPage = [...page].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      // Handle undefined/null
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // Numeric compare when both are numbers
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // Date compare for ISO date strings
      const isDateKey = sortConfig.key === 'lastMessageAt';
      if (isDateKey) {
        const aDate = new Date(aVal).getTime();
        const bDate = new Date(bVal).getTime();
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

      // String compare (case-insensitive)
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedPage;
  }, [filteredCustomers, currentPage, sortConfig]);
  
  // Handlers
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);
  
  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);
  
  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);
  
  return (
    <div className="app-container">
      <Header />
      
      <div className="content">
        {/* Title Section */}
        <div className="title-section">
          <h1 className="title">All Customers</h1>
          <span className="count">{filteredCustomers.length}</span>
        </div>
        
        {/* Controls */}
        <div className="controls">
          <SearchBar 
            onSearchChange={handleSearchChange}
          />
          <FilterDropdown 
            showFilters={showFilters}
            toggleFilters={toggleFilters}
          />
        </div>
        
        {/* Table */}
        <div className="table-wrapper">
          <table className="customers-table">
            <TableHeader 
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <tbody>
              {visibleCustomers.map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
