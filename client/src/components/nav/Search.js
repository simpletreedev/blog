import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Search = ({ setShowSearch }) => {
  const { searchValue, setSearchValue } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/posts/search?title=${searchValue}`);
  };

  return (
    <form className="navigationSearch" onSubmit={handleSearch}>
      <input
        autoFocus
        type="text"
        placeholder="Search here..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        maxLength={80}
      />
    </form>
  );
};

export default Search;
