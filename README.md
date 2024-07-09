## FUNCTIONAL SPECIFICATION

This is a simplistic blog website template that displays a list of blogs, allows searching blogs, and displays the content of a selected blog. It is adapted for both computer and smartphone views.

The navigation bar allows returning to the default view (home page) that shows the list of all blogs, unfiltered, by clicking on the website logo, while the search bar allows filtering blogs by title and by tags.

The content section display the current blog's title, main tag (a blog has many tags, only one is shown), author, and date, followed by the blog's content.

The feed section displays all blogs when no blog is currently selected, and only 6 blogs when a blog is displayed, it is affected by the search feature however, regardless of whether a blog is being displayed or not. The feed contains blog cards that display a blog's thumbnail, main tag, and title, it is always sorted by date.

## TECHNICAL SPECIFICATION

This is a lightweight React client-side rendered single page application created with Vite, no TypeScript used, the only added library is React-Markdown for the purpose of handling Markdown conversion to HTML.

The application is divided into 3 components (described previously), there is no real navigation, hence the abscence of a router, the feed component that displays the list of blogs in the home view also serves as the feed side-bar when a blog is displayed, this is handled through states and flex-box.

There are 3 state variables, one holding the ID of the currently selected blog, one for whether the blog section is shown or not, and one holding the search keyword. They are all present at the root component for easier state sharing between components, no state manager was used since there are only 2 levels in the components tree, however, further optimization is needed to avoid unnecessary re-rendering of components.

The source of data is static markdown files, blogs can be added to the public/markdown folder, no special formatting required, to make it appear in the application an entry containing the blog's metadata should be added in the .files_list.json file present in the same folder (copy and modify an existing entry). Thumbnail images can be added in the public/images folder, bearing the same name as the path value indicated in the metadata file (the markdown file should also have that same name).