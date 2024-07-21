Click here for a demo : https://amin394t.github.io/Personal-Blog/

## FUNCTIONAL SPECIFICATION

This is a simplistic blog website template that displays a list of blogs, allows searching blogs, and displays the content of a selected blog. It is adapted for both computer, tablet, and smartphone views.

The default view shows a welcome message, followed by the list of all blogs sorted by date, you can return to this view from anywhere by clicking on the website logo located in the navigation bar, while the search bar on its right allows filtering blogs by title and by tags.

The content section displays the current blog's title, main tags, author, and date, followed by the blog's content, and at the very bottom a list of all tags associated to this blog, which are clickable and work as search shortcuts.

The feed section displays all blogs when no blog is currently selected, and only those with the same main tag when a blog is displayed, with a maximum of 6. The feed is always sorted by date, and is affected by the search feature. It contains blog cards that display a blog's thumbnail, main tag, and title.


## TECHNICAL SPECIFICATION

This is a lightweight React client-side rendered single page application, where the source of data is static markdown files. It is created with Vite, no TypeScript used, the only extra library is React-Markdown for the purpose of handling Markdown conversion to HTML.

The application is divided into 3 components (described previously), there is no real navigation, hence the abscence of a router, the feed component that displays the list of blogs in the home view also serves as the feed side-bar when a blog is displayed, this is handled through states and flex-box.

There are 2 state variables, one holding the ID of the currently selected blog, and the other holding the search keywords, which is also used to determine whether the blog component is visible or not. They are both present at the root component for easier state sharing between components, no state manager was used since there are only 2 levels in the component tree and only 2 states.


## USAGE INSTRUCTIONS

Get the version found in the build branch. Blogs can be added to the /markdown folder as markdown files, to make it appear in the application an entry containing the blog's metadata should be added in the _files_list.json file present in the same folder (copy and modify an existing entry). In the same folder you can also modify the welcome message (_welcome.md), you can delete the mock-up blogs and remove their entries from _files_list.json.

Thumbnail images can be added in the /images folder, it should preferably have a 3:2 aspect ratio or close. In the same folder you can also modify the header logo (_logo.png), tab icon (_head.png), and placeholder image (_placeholder.png), you can delete the mock-up images.

Do not remove any file starting with an underscore, be it in /markdown or /images, or modify/remove any file outside these 2 folders, except if you know what you're doing. You can use versions from other branches if you're a developer.