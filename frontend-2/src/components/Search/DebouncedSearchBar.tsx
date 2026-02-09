import { useEffect, useState, useRef } from 'react';
import { useDebounce } from 'src/hooks/useDebounce';

interface DebouncedSearchBarProps {
  query: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  debounceDelay?: number;
}

const DebouncedSearchBar = ({
  query,
  onSearch,
  onClear,
  placeholder = 'Search...',
  debounceDelay = 500,
}: DebouncedSearchBarProps) => {
  const [inputValue, setInputValue] = useState(query);
  const debouncedValue = useDebounce(inputValue, debounceDelay);
  const isDarkMode = false;
  const isInitialMount = useRef(true);

  // Update input value when external query changes
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  // Call onSearch when debounced value changes
  useEffect(() => {
    // Skip the initial mount to avoid unnecessary API call
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Always call onSearch when debounced value changes
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    onClear?.();
  };

  return (
    <div className="form relative min-w-16 max-w-sm rounded-full shadow-md bg-slate-200 dark:bg-slate-800 transition-all duration-500">
      <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
        <svg
          width={18}
          height={16}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="search"
          className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}
        >
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <input
        className={`input rounded-full w-full ${
          !isDarkMode && 'bg-slate-200 text-gray-800 border-gray-300'
        } px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 ${
          isDarkMode && 'bg-gray-800 text-white border-gray-700'
        } transition-all duration-300 shadow-sm bg-auto`}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputValue}
        type="text"
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default DebouncedSearchBar;
