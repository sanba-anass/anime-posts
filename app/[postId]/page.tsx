import { client } from "../../sanityClient";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Counter from "../components/Counter";
import { groq } from "next-sanity";
const query = `*[_type == 'post'  &&  _id == $id][0]`;

async function getSinglePost(id: any) {
	const res = await client.fetch(query, { id });
	return res;
}
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
	return builder.image(source);
}

async function DetailsPostPage({ params }: { params: any }) {
	const post = await getSinglePost(params.postId);
	console.log(post);

	return (
		<div>
			<Counter id={params.postId} />
			<h1>{post.title}</h1>
			<Image
				src={urlFor(post.image.asset["_ref"]).url()}
				className="post-image"
				alt="Picture of the post"
				style={{ objectFit: "cover" }}
				width={800}
				quality={100}
				height={800}
			/>
			<p>{post.body[0].children[0].text}</p>
		</div>
	);
}

export default DetailsPostPage;

export async function generateStaticParams() {
	const query = groq`
   *[_type == "post"] {
     _id,
   }
  `;
	const posts = await client.fetch(query);
	console.log(
		posts.map((post: any) => {
			return { postId: post._id };
		})
	);
	return posts.map((post: any) => {
		return { postId: post._id };
	});
}
