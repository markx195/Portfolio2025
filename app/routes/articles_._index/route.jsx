import { Articles } from './articles';
import { getPosts } from './posts.server';
import { json } from '@remix-run/node';
import { useRouteError } from '@remix-run/react';
import { Error } from '~/layouts/error';

export async function loader() {
  const posts = await getPosts();
  const featured = posts.find(post => post.frontmatter.featured);
  const regularPosts = posts.filter(post => !post.frontmatter.featured);
  
  return json({ posts: regularPosts, featured });
}

export function ErrorBoundary() {
  const error = useRouteError();
  return <Error error={error} />;
}

export default Articles;
