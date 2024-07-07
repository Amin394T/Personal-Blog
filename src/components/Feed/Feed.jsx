import "./Feed.css";
import blogs from "../../assets/markdown/.files_list";

function Feed({ setCurrentBlog, setBlogDisplay, selectedTag, blogDisplay }) {

  const filteredBlogs = selectedTag ? blogs.filter((blog) => blog.tags.some((tag) => tag.includes(selectedTag))) : blogs;
  const reducedBlogs = blogDisplay ? filteredBlogs.slice(0, 6) : filteredBlogs;
  const sortedBlogs = reducedBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="feed">
      {sortedBlogs.map((blog) => (
          <div className="feed-blog" onClick={() => {setCurrentBlog(blog.id); setBlogDisplay(true); }} key={blog.id}>
            <span className="feed-blog-tag">{blog.tags[0]}</span>
            <img className="feed-blog-thumbnail" src={"src/assets/images/" + (blog.path || ".placeholder") + ".png"} />
            <div className="feed-blog-title">{blog.title}</div>
          </div>
        ))}
    </div>
  );
}

export default Feed;
