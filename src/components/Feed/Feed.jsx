import "./Feed.css";

function Feed({ blogs, handleSelection, searchWord }) {

  const filteredBlogs = blogs.filter((blog) => 
      (blog.tags.some(tag => tag.toLowerCase().includes(searchWord))) ||
      (blog.title.toLowerCase().includes(searchWord))
  );
  const sortedBlogs = filteredBlogs.sort((blog1, blog2) => new Date(blog1.date) - new Date(blog2.date));

  return (
    <div className="feed">
      { sortedBlogs.map((blog) => (

        <div className="feed-blog" onClick={() => handleSelection(blog.path)} key={blog.path}>
          <span className="feed-blog-tag">{blog.tags[0]}</span>
          <img className="feed-blog-thumbnail" src={`./images/${blog.image || "_placeholder.png"}`} />
          <div className="feed-blog-title">{blog.title}</div>
        </div>
      
      )) }
    </div>
  );
}

export default Feed;
