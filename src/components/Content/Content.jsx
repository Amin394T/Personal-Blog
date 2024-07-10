import "./Content.css";
import useFetch from "../../utilities/hooks/useFetch";
import Markdown from "react-markdown";
import { useEffect } from "react";

function Content({ blogData }) {
  
  const { data, loading } = useFetch("./markdown/" + blogData.path + ".md");

  useEffect(() => {
    document.title = blogData.title;
  }, []); 

  if (loading)
    return (<div className="spinner-container blog"> <div className="spinner"> </div> </div>);

  return (
    <div className="blog">
      <div className="blog-info">
        <h1 className="blog-info-title">{blogData.title}</h1>
        <span>{"📘 " + blogData.tags[0]}</span>
        <span>{"🖊️ " + blogData.author}</span>
        <span>{"🕓 " + blogData.date}</span>
      </div>

      <div className="blog-text"> <Markdown>{data}</Markdown> </div>

      <span className="blog-info-tags">
        { blogData.tags.map((tag) => <span key={tag}>{"# " + tag}</span>) }
      </span>
    </div>
  );
}

export default Content;