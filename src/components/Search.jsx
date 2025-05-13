const Search = ({ query, setQuery }) => {
    return (
      <div>
        <input
          name="search"
          value={query}
          placeholder="Search movies..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    );
  };
  export default Search;
