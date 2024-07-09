import "./Navigation.css";

function Navigation({ setBlogDisplay, setSearchWord }) {
  
  let handleSearch = (searchWord) => {
    setSearchWord(searchWord.toLowerCase());
    setBlogDisplay(false);
  };

  return (
    <div className="header">
      <img className="header-logo" src="/images/.logo.png" onClick={() => handleSearch("")} />
      <input className="header-search" type="text" placeholder="🔍  Search ..." onChange={(e) => handleSearch(e.target.value)} autoFocus />
    </div>
  );
}

export default Navigation;
