import client from "./connectRedis.js"
import Post from "../models/Post.js";

export const getViewCount = async (postId) => {
  const viewCountKey = `posts:${postId}:views`;
  // get views from redis ?
  const cachedCount = await client.get(viewCountKey);

  if (cachedCount) return parseInt(cachedCount);

  // create view
  const post = await Post.findById(postId);
  const viewCount = post.views;

  await client.set(viewCountKey, viewCount, "ex", 300);

  await client.incr(viewCountKey);
  return viewCount;
};
