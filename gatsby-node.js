exports.createPages = async ({ graphql, actions }) => {
  const postsPerPage = parseInt(process.env.GATSBY_POSTS_PER_PAGE) || 10;
  // template paths
  const singleBlogTemplate = require.resolve(
    './src/templates/single-blog-post.js'
  );
  const blogsListTemplate = require.resolve('./src/templates/blog-posts-list.js')
  const { createPage } = actions;

  const result = await graphql(`
    {
      allSanityBlog {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;
  const blogs = result.data.allSanityBlog.nodes;

  // single blog pages
  blogs.forEach((blog) => {
    createPage({
      path: `/posts/${blog.slug.current}`,
      component: singleBlogTemplate,
      context: { id: blog.id },
    });
  });

  // blog list pages
  const totalBlogListPages = Math.ceil(blogs.length / postsPerPage);
  Array.from({ length:  totalBlogListPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? '/posts' : `/posts/${index + 1}`,
      component: blogsListTemplate,
      context: {
        limit: postsPerPage,
        offset: index * postsPerPage,
        numberOfPages: totalBlogListPages,
        currentPage: index + 1,
      }
    })
  })
};