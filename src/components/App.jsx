import "../styles/App.css";
import Navigation from "./Navigation";
import Article from "./Article";
import Feed from "./Feed";
import Comments from "./Comments";
import useFetch from "../utilities/useFetch";
import { startTransition, useState } from "react";

function App() {
  const [currentBlog, setCurrentBlog] = useState(new URLSearchParams(window.location.search).get("blog"));
  const [searchWord, setSearchWord] = useState(new URLSearchParams(window.location.search).get("search") ?? "");
  
  window.onpopstate = () => {
    setCurrentBlog(new URLSearchParams(window.location.search).get("blog"));
    setSearchWord(new URLSearchParams(window.location.search).get("search") ?? "");
  };

  const { data, status } = useFetch("./markdown/_files_list.json");
  const home = JSON.parse(useFetch("./markdown/_home_page.json").data);
  
  if (status == "loading" || !home)
    return (<div className="spinner"> <div></div> </div>);
  if (status == "error" || !data)
    return (<div className="error"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  const blogsList = JSON.parse(data);
  const blogData = blogsList.find((blog) => blog.path == currentBlog);

  if (!searchWord && !currentBlog)
    document.title = home.name;

  let handleSearch = (query) => {
    query = query.toLowerCase();
    startTransition(() => setSearchWord(query));
    setCurrentBlog(null);
    window.scrollTo(0, 0);
    (searchWord && query) || (!currentBlog && !searchWord && !query)
      ? history.replaceState({ query }, "", `?search=${query}`)
      : history.pushState({ query }, "", `?search=${query}`);
  };

  let handleSelection = (name) => {
    setCurrentBlog(name);
    setSearchWord("");
    window.scrollTo(0, 0);
    history.pushState({ name }, "", `?blog=${name}`);
  };

  return (
    <>
      <Navigation {...{ searchWord, handleSearch }} />

      { !currentBlog && !searchWord &&
        <div className="article">
          <h1> {home.heading} </h1>
          { Object.keys(home)
              .filter(key => key.startsWith("line_"))
              .map(key => <p key={key}>{home[key]}</p>)
          }
        </div>
      }
      { currentBlog
        ? <>
            <Article {...{ blogData, handleSearch }} />
            <Comments {...{ parent: blogData?.path }} />
          </>
        : <Feed {...{ blogsList, handleSelection, searchWord }} />
      }
    </>
  );
}

export default App;
// allow dynamic number of _weclome lines
