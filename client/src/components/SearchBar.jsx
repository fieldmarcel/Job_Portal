import React, { useState } from 'react';
import { Search, TrendingUp, Clock } from 'lucide-react';

const SearchBar = ({ onSearch, searchHistory, onClearHistory, topKeywords }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSuggestionClick = (term) => {
    setQuery(term);
    onSearch(term);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for jobs (e.g., React Developer, Data Scientist, Product Manager)"
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (searchHistory.length > 0 || topKeywords.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          
          {/* Top Keywords Section */}
          {topKeywords.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-600">Trending Searches</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {topKeywords.slice(0, 6).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(item.keyword)}
                    className="text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-150 flex items-center justify-between group"
                  >
                    <span className="text-gray-700 text-sm">{item.keyword}</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-500">
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches Section */}
          {searchHistory.length > 0 && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600">Recent Searches</span>
                </div>
                <button
                  onClick={() => {
                    onClearHistory();
                    setShowSuggestions(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-sm"
                >
                  Clear
                </button>
              </div>
              {searchHistory.slice(0, 5).map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(term)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-150 text-gray-700 text-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;