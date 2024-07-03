import "./App.css";
import blogs from "./assets/markdown/.files_list";
import Navigation from "./components/Navigation/Navigation";
import Content from "./components/Content/Content";
import Feed from "./components/Feed/Feed";
import { useState } from "react";

function App() {
  const [currentBlog, setCurrentBlog] = useState(0);
  const [blogDisplay, setBlogDisplay] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  return (
    <>
      <Navigation {...{ setBlogDisplay, setSelectedTopic, selectedTopic }} />
      <div className="separator">
        {blogDisplay && <Content blogData={blogs[currentBlog]} />}
        <Feed {...{ setCurrentBlog, setBlogDisplay, selectedTopic, blogDisplay }} />
      </div>
    </>
  );
}

export default App;
