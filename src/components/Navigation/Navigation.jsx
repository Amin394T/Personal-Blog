import "./Navigation.css";
import { startTransition } from "react";

function Navigation({ setSearchWord }) {

  let handleSearch = (searchWord) =>
    startTransition(() => setSearchWord(searchWord.toLowerCase()));

  return (
    <div className="header">
      <img className="header-logo" src="/images/.logo.png" onClick={() => handleSearch(" ")} />
      <input
        className="header-search" type="text" placeholder="🔍  Search ..."
        onChange={(event) => handleSearch(event.target.value)} autoFocus
      />
    </div>
  );
}

export default Navigation;
