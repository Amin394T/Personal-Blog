import "./Navigation.css";
import { startTransition } from "react";

function Navigation({ setCurrentBlog, searchWord, setSearchWord }) {

  let handleSearch = (query) => {
    startTransition(() => setSearchWord(query.toLowerCase()));
    setCurrentBlog(0);
    window.scrollTo(0, 0);
    history.pushState({}, '', window.location.pathname);
  };
  
  return (
    <div className="header">
      <img className="header-logo" src="./images/_logo.png" onClick={() => handleSearch("")} />
      <input
        className="header-search" value={searchWord} type="text" placeholder="🔍  بحث المقالات ..."
        onChange={(event) => handleSearch(event.target.value)} autoFocus
      />
    </div>
  );
}

export default Navigation;