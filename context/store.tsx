// @ts-nocheck
"use client";
import { createContext, useState } from "react";
export const PostsContext = createContext({
	posts: [],
	setPosts: () => {},
	isLoading: false,
	setIsLoading: () => {},
});

export const ContextProvider = ({ children }: { children: any }) => {
	const [posts, setPosts] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<PostsContext.Provider value={{ posts, setPosts, setIsLoading, isLoading }}>
			{children}
		</PostsContext.Provider>
	);
};
