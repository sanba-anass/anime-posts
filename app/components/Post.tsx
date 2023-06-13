//@ts-nocheck
"use client";
import { PostsContext } from "@/context/store";
import Image from "next/image";
import { useContext, useState } from "react";
import { client } from "../../sanityClient";
import Link from "next/link";

function Post({ title, imageUrl, id }: { title: any; imageUrl: any; id: any }) {
	const query = `*[_type == 'post'  &&  !(_id == $id) ]`;
	const ctx = useContext(PostsContext);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editingTitle, setEditingTitle] = useState(title);

	const deletePost = async () => {
		setIsDeleting(true);
		const { _id } = await client.delete(id);
		const result = await client.fetch(query, { id });
		console.log(result);
		// (prevPosts) => {
		// 	// prevPosts.filter((post) => post._id !== id);
		// 	 result;
		// }

		ctx.setPosts(result);

		setIsDeleting(false);
	};

	const editingForm = (
		<form
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<input
				onChange={(e) => setEditingTitle(e.target.value)}
				className="editing-input"
				defaultValue={title}
				type="text"
				autoFocus
			/>
			<div className="btns">
				<button
					onClick={() => {
						client.patch(id).set({ title: editingTitle }).commit();
						setIsEditing(false);
					}}
				>
					Save
				</button>
				<button onClick={() => setIsEditing(false)}>Exit</button>
			</div>
		</form>
	);
	return (
		<div className="post-card">
			{isEditing ? editingForm : <h2 className="title">{editingTitle}</h2>}
			<div className="btns">
				<button onClick={deletePost}>
					{isDeleting ? "Deleting..." : "Delete"}
				</button>
				<button onClick={() => setIsEditing(true)}>Edit</button>
			</div>
			<Link href={id}>
				<Image
					src={imageUrl}
					className="post-image"
					alt="Picture of the post"
					style={{ objectFit: "cover" }}
					width={"350"}
					height={"500"}
					quality={100}
					
				/>
			</Link>
		</div>
	);
}

export default Post;
