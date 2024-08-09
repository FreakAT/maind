import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "replicate.delivery",
			},
		],
	},
};

export default nextConfig;
