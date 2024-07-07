import "./Navigation.css";

function Navigation({ setBlogDisplay, setSearchWord }) {
  let handleSearch = (tag) => {
    setSearchWord(tag);
    setBlogDisplay(false);
  };

  return (
    <div className="header">
      <img className="header-logo" src="src/assets/images/.logo.png" onClick={() => handleSearch("")} />
      <input className="header-search" type="text" placeholder=" 🔍  Search ..." onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
}

export default Navigation;
