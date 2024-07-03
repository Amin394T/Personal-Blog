import "./Navigation.css";
import { topics } from "../../assets/topics.js";

function Navigation({ setBlogDisplay, setSelectedTopic, selectedTopic }) {
  let handleSelectTopic = (topic) => {
    selectedTopic == topic ? setSelectedTopic("") : setSelectedTopic(topic);
    setBlogDisplay(false);
  };

  return (
    <div className="header">
      <img className="header-logo" src="src/assets/images/.logo.png" onClick={() => handleSelectTopic("")} />

      <div className="header-topics">
        {topics.map((topic, index) => (
          <span className={selectedTopic == topic ? "selected-topic" : ""} key={index} onClick={() => handleSelectTopic(topic)} >
            {topic}
          </span>
        ))}
      </div>

      <input className="header-search" type="text" placeholder=" 🔍  Search ..." />
    </div>
  );
}

export default Navigation;
