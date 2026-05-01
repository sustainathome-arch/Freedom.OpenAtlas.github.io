import { posts, getOtherPosts } from "/data/posts.js";
import { renderMorePosts } from "../components.js";
import { initReveal } from "../motion.js";

export function init() {
  const slug = document.body.dataset.slug;
  if (slug) renderMorePosts("[data-more-posts]", getOtherPosts(slug, 3));
  initReveal();
}
