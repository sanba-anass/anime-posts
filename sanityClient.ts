import { createClient } from "next-sanity";

export const clientConfig = {
	projectId: "mgj58rtv",
	dataset: "production",
	useCdn: false,
	apiVersion: "2023-05-03",
	token:
		"skyLa2zSeWJ8lg2XDC8eOQlQng9At44csmWeyfxxxjpL1VOAxEEj2cti4iC3Clr00VdIawdduCQosDQ5N7SFXKtjxNULgbWxvGQjuGuRqN84P7OHWJA1xRcHyNCC2bYAvlAiZxgut3gkuIaIdocmuvH0DTpLit9hMAdvYM2OzN5PlOyQbKmt",
};
export const client = createClient(clientConfig);
