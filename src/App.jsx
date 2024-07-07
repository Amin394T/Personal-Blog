import "./App.css";
import blogs from "./assets/markdown/.files_list";
import Navigation from "./components/Navigation/Navigation";
import Content from "./components/Content/Content";
import Feed from "./components/Feed/Feed";
import { useState } from "react";

function App() {
  const [currentBlog, setCurrentBlog] = useState(0);
  const [blogDisplay, setBlogDisplay] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const blogData = blogs[currentBlog];
  
  return (
    <>
      <Navigation {...{ setBlogDisplay, setSelectedTag }} />
      <div className="separator">
        {blogDisplay && <Content {...{ blogData, currentBlog }} />}
        <Feed {...{ setCurrentBlog, setBlogDisplay, selectedTag, blogDisplay }} />
      </div>
    </>
  );
}

export default App;
