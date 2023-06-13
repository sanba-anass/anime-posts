"use client";
import { useContext, useState } from "react";
import { PostsContext } from "../../context/store";
import { client } from "../../sanityClient";
import axios from "axios";
async function getBase64(externalUrl) {
	const response = await axios.get(externalUrl, {
		responseType: "arraybuffer",
		timeout: 60000,
	});

	const arrayBuffer = response.data;
	console.log(response.status);
	console.log(response.statusText)
	const uint8Array = new Uint8Array(arrayBuffer);
	//
	const { _id } = await client.assets.upload(
		"image",
		new Blob([uint8Array.buffer])
	);

	return _id;
}
function Form() {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredUrl, setEnteredUrl] = useState("");
	const ctx = useContext(PostsContext);
	const createPost = async (event) => {
		event.preventDefault();

		if (enteredTitle.trim() === "") {
			return;
		}

		ctx.setIsLoading(true);

		const _id = await getBase64(enteredUrl);

		const createdAt = new Date(Date.now());
		const body = {
			_type: "post",
			_id: (Math.random() * 1000000).toString(),
			_updatedAt: "2023-06-10T11:55:24Z",
			slug: {
				current: enteredTitle,
				_type: "slug",
			},

			image: {
				_type: "image",
				asset: {
					_type: "reference",
					_ref: _id,
				},
			},
			_createdAt: createdAt.toISOString(),
			body: [
				{
					style: "normal",
					_key: "ca6bdff1388a",
					markDefs: [],
					children: [
						{
							_type: "span",
							marks: [],
							text: "Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
							_key: "e3e068ad8f5d0",
						},
					],
					_type: "block",
				},
			],
			title: enteredTitle,
			likes: 0,
		};
		await client.create(body);
		ctx.setPosts((prevPosts) => {
			return [body, ...prevPosts];
		});

		setEnteredTitle("");
		setEnteredUrl("");
		ctx.setIsLoading(false);

		//client.delete({query: '*[_type == "post"][0...999]'})
	};
	return (
		<form onSubmit={createPost}>
			<label htmlFor="post-name">Name</label>
			<input
				value={enteredTitle}
				onChange={(e) => setEnteredTitle(e.target.value)}
				className="text-input"
				type="text"
				id="post-name"
			/>
			<label htmlFor="url">Url</label>
			<input
				value={enteredUrl}
				onChange={(e) => setEnteredUrl(e.target.value)}
				className="text-input"
				type="text"
				id="url"
			/>
			<button disabled={ctx.isLoading} className="btn" type="submit">
				{ctx.isLoading ? "Posting..." : "Post"}
			</button>
		</form>
	);
}

export default Form;
