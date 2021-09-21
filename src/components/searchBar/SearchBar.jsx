const SearchBar = (props) => {
  return (
    <div>
      <input
        style={{ width: "25rem" }}
        type="text"
        placeholder="Search here..."
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
