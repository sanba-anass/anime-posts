import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./app/schemas";
export const config = {
	projectId: "mgj58rtv",
	dataset: "production",
	title: "animeApp",
	apiVersion: "2023-05-03",
	basePath: "/admin",
	plugins: [deskTool()],
	schema: {
		types: schemaTypes,
	},
};
export default defineConfig(config);
