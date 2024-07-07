import "./Navigation.css";

function Navigation({ setBlogDisplay, setSelectedTag }) {
  let handleSelectTag = (tag) => {
    setSelectedTag(tag);
    setBlogDisplay(false);
  };

  return (
    <div className="header">
      <img className="header-logo" src="src/assets/images/.logo.png" onClick={() => handleSelectTag("")} />
      <input className="header-search" type="text" placeholder=" 🔍  Search ..." onChange={(e) => handleSelectTag(e.target.value)} />
    </div>
  );
}

export default Navigation;
