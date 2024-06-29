import "./Navigation.css";

function Navigation({ setDisplay }) {
  return (
    <div className="header">
      <img className="header-logo" src="src/assets/images/.logo.png" onClick={() => setDisplay(false)} />

      <div className="header-topics">
        <span>Topic 1</span>
        <span>Topic 2</span>
        <span>Topic 3</span>
        <span>Topic 4</span>
        <span>Topic 5</span>
        <span>Topic 6</span>
      </div>

      <input className="header-search" type="text" placeholder=" 🔍  Search ..." />
    </div>
  );
}

export default Navigation;
