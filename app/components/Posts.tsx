// @ts-nocheck
"use client";
import Post from "./Post";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanityClient";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../context/store";
import Loading from "./loading";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
	return builder.image(source);
}
const Posts = () => {
	const ctx = useContext(PostsContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchPosts() {
			setIsLoading(true);
			const query = `
		*[_type == "post"] | order(_createdAt desc) {
		   title,
		   _id,
		   image {
			asset {
			  _ref
			}
		   },
		  "slug" : slug.current
		 }
		`;
			const posts = await client.fetch(query);
			setIsLoading(false);
			ctx.setPosts(posts);
		}
		fetchPosts();
	}, []);
	if (ctx.posts?.length === 0) {
		return <p> start adding some posts !</p>;
	}
	if (isLoading) {
		return <Loading />;
	}
	return (
		ctx.posts &&
		ctx.posts.map((post: any) => (
			<Post
				key={post._id}
				title={post.title}
				imageUrl={urlFor(post.image.asset["_ref"]).quality(100).url()}
				id={post._id}
			/>
		))
	);
};

export default Posts;
