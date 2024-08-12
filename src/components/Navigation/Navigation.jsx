import "./Navigation.css";

function Navigation({ searchWord, handleSearch }) {
  
  return (
    <div className="header">
      <img className="header-logo" src="./images/_logo.png" onClick={() => handleSearch("")} />
      <input
        className="header-search" value={searchWord} placeholder="🔍  Search ..."
        onChange={(event) => handleSearch(event.target.value)} autoFocus
      />
    </div>
  );
}

export default Navigation;
