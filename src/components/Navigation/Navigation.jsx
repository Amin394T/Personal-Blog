import "./Navigation.css";
import { startTransition } from "react";

function Navigation({ searchWord, setSearchWord }) {

  let handleSearch = (query) =>
    startTransition(() => setSearchWord(query.toLowerCase()));

  return (
    <div className="header">
      <img className="header-logo" src="./images/_logo.png" onClick={() => handleSearch(" ")} />
      <input
        className="header-search" value={searchWord} type="text" placeholder="🔍  Search ..."
        onChange={(event) => handleSearch(event.target.value)} autoFocus
      />
    </div>
  );
}

export default Navigation;
