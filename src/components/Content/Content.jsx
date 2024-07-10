import "./Content.css";
import useFetch from "../../utilities/hooks/useFetch";
import Markdown from "react-markdown";

function Content({ blogData }) {
  
  const { data, loading } = useFetch("/markdown/" + blogData.path + ".md");
  if (loading)
    return (<div className="spinner-container blog"> <div className="spinner"> </div> </div>);

  return (
    <div className="blog">
      <div className="blog-info">
        <h1 className="blog-info-title">{blogData.title}</h1>
        <span className="blog-info-tag">{blogData.tags[0]}</span>
        <span className="blog-info-author">{blogData.author}</span>
        <span className="blog-info-date">{blogData.date}</span>
      </div>

      <div className="blog-text"> <Markdown>{data}</Markdown> </div>
    </div>
  );
}

export default Content;
