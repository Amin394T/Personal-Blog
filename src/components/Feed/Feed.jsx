import "./Feed.css";
import blogs from "../../assets/markdown/.files_list";

function Feed({ setCurrentBlog, setBlogDisplay, searchWord, blogDisplay }) {

  const filteredByTag = searchWord ? blogs.filter((blog) => blog.tags.some((tag) => tag.includes(searchWord))) : blogs;
  const filteredByTitle = searchWord ? blogs.filter((blog) => blog.title.includes(searchWord)) : blogs;
  const filteredBlogs = [...new Set([...filteredByTag, ...filteredByTitle])];

  const reducedBlogs = blogDisplay ? filteredBlogs.slice(0, 6) : filteredBlogs;
  const sortedBlogs = reducedBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  let handleSelectBlog = (id) => {
    setCurrentBlog(id);
    setBlogDisplay(true);
  }

  return (
    <div className="feed">
      {sortedBlogs.map((blog) => (
          <div className="feed-blog" onClick={() => { handleSelectBlog(blog.id) }} key={blog.id}>
            <span className="feed-blog-tag">{blog.tags[0]}</span>
            <img className="feed-blog-thumbnail" src={"src/assets/images/" + (blog.path || ".placeholder") + ".png"} />
            <div className="feed-blog-title">{blog.title}</div>
          </div>
        ))}
    </div>
  );
}

export default Feed;
