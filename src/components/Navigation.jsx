import "../styles/Navigation.css";

function Navigation({ searchWord, handleSearch }) {
  return (
    <div className="navigation">
      <img className="navigation-logo" src="./images/_logo.png" onClick={() => handleSearch("")} />
      <input
        className="navigation-search" value={searchWord} placeholder="🔍  Search ..."
        onChange={(event) => handleSearch(event.target.value)}
      />
      {/* <div className="navigation-auth-form">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button> Register </button>
      </div> */}
    </div>
  );
}

export default Navigation;
