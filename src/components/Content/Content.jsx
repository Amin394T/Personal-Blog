import "./Content.css";
import useFetch from "../../utilities/hooks/useFetch";
import Markdown from "react-markdown";
import { useEffect } from "react";

function Content({ blogData }) {
  
  const { data, loading, error } = useFetch(`./markdown/${blogData.path}.md`);

  useEffect(() => {
    document.title = blogData.title;
  }, [blogData.title]); 

  if (loading)
    return (<div className="spinner blog"> <div> </div> </div>);
  if (error)
    return (<div className="error blog"> <div> &#x2716; </div> Oops! Something went wrong. </div>);

  return (
    <div className="blog">
      <div className="blog-info">
        <h1 className="blog-info-title">{blogData.title}</h1>
        <span>{"📘 " + blogData.tags[0]}</span>
        <span>{"🖊️ " + blogData.author}</span>
        <span>{"🕓 " + blogData.date}</span>
      </div>

      <div className="blog-text"> <Markdown>{data}</Markdown> </div>

      <span className="blog-tags">
        { blogData.tags.map((tag) => <span key={tag}>{"# " + tag}</span>) }
      </span>
    </div>
  );
}

export default Content;