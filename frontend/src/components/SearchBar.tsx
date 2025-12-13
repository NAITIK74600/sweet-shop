import React, { useState } from 'react';
import { SearchParams } from '../api/sweets';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onReset }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    name: '',
    category: '',
    minPrice: undefined,
    maxPrice: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: SearchParams = {};
    if (searchParams.name) params.name = searchParams.name;
    if (searchParams.category) params.category = searchParams.category;
    if (searchParams.minPrice) params.minPrice = searchParams.minPrice;
    if (searchParams.maxPrice) params.maxPrice = searchParams.maxPrice;
    onSearch(params);
  };

  const handleReset = () => {
    setSearchParams({
      name: '',
      category: '',
      minPrice: undefined,
      maxPrice: undefined
    });
    onReset();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-fields">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchParams.name}
            onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Category..."
            value={searchParams.category}
            onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
            className="search-input"
          />
          <input
            type="number"
            placeholder="Min price"
            value={searchParams.minPrice || ''}
            onChange={(e) =>
              setSearchParams({ ...searchParams, minPrice: parseFloat(e.target.value) || undefined })
            }
            step="0.01"
            className="search-input price-input"
          />
          <input
            type="number"
            placeholder="Max price"
            value={searchParams.maxPrice || ''}
            onChange={(e) =>
              setSearchParams({ ...searchParams, maxPrice: parseFloat(e.target.value) || undefined })
            }
            step="0.01"
            className="search-input price-input"
          />
        </div>
        <div className="search-actions">
          <button type="submit" className="search-button">
            🔍 Search
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            ↻ Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
