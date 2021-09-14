import styled from "styled-components";

const SearchBar = (props) => {
  return (
    <div>
      <Input
        className="searchBar"
        type="text"
        placeholder="Search here..."
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  );
};

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  padding: 13px;
  background-color: inherit;
`;

export default SearchBar;
