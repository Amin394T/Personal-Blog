import "./Navigation.css";

function Navigation({ searchWord, handleSearch }) {
  
  return (
    <div className="navigation">
      <img className="navigation-logo" src="./images/_logo.png" onClick={() => handleSearch("")} />
      <input
        className="navigation-search" value={searchWord} placeholder="🔍  بحث المقالات ..."
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
}

export default Navigation;