import "./Navigation.css";
import { tags } from "../../assets/tags.js";

function Navigation({ setBlogDisplay, setSelectedTag, selectedTag }) {
  let handleSelectTag = (tag) => {
    selectedTag == tag ? setSelectedTag("") : setSelectedTag(tag);
    setBlogDisplay(false);
  };

  return (
    <div className="header">
      <img className="header-logo" src="src/assets/images/.logo.png" onClick={() => handleSelectTag("")} />

      <div className="header-tags">
        {tags.map((tag, index) => (
          <span className={selectedTag == tag ? "selected-tag" : ""} key={index} onClick={() => handleSelectTag(tag)} >
            {tag}
          </span>
        ))}
      </div>

      <input className="header-search" type="text" placeholder=" 🔍  Search ..." />
    </div>
  );
}

export default Navigation;
