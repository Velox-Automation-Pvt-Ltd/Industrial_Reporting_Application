import { useTheme } from 'src/context/ThemeContext';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

const SearchBar = ({ query, setQuery, onClear, placeholder }: SearchBarProps) => {
  const isDarkMode = false;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
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
        } px-8 py-3 border-2  border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 ${
          isDarkMode && 'bg-gray-800 text-white border-gray-700'
        } 
        } transition-all duration-300 shadow-sm bg-auto`}
        placeholder={placeholder || 'Search...'}
        required
        onChange={handleSearch}
        value={query}
        type="text"
      />
      <button
        type="reset"
        onClick={onClear}
        className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}"`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
