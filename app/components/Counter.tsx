"use client";
import { useState, useEffect } from "react";
import React from "react";
import { client } from "../../sanityClient";

const query = "*[_type =='post' && _id == $id][0]";
const Counter = ({ id }: any) => {
	const [count, setCount] = useState(0);

	const updateLikes = async () => {
		setCount(count + 1);
		await client.patch(id).inc({ likes: 1 }).commit();
	};
	useEffect(() => {
		client.fetch(query, { id }).then((res) => {
			console.log(res);
			setCount(res.likes);
		});
	}, []);
	return <button onClick={updateLikes}>{count}</button>;
};

export default Counter;
