import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Access your API key as an environment variable.
// console.log("lol");

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY));

export async function POST(req: NextRequest) {
	// console.log("bef try");
	try {
		// console.log("enter");
		const { userId } = auth();
		const body = await req.json();
		const { messages } = body;
		// console.log(messages);

		if (!userId) {
			return new NextResponse("Unautharized", { status: 401 });
		}

		if (!genAI.apiKey) {
			return new NextResponse("Gemini API key not configured", { status: 500 });
		}

		if (!messages) {
			return new NextResponse("Messages are required", { status: 400 });
		}
		// console.log("auth done");

		// Choose a model that's appropriate for your use case.
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

		// console.log("before req");

		const result = await model.generateContent(
			messages[messages.length - 1].content
		);
		const response = result.response;
		// console.log("after req");
		// console.log("response", response);
		const text = response.text();
		// console.log("text", text);

		return NextResponse.json(text);
	} catch (error) {
		console.log("[CONVERSATION_ERROR", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
// ----------------------------------------------------------------------------

// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import OpenAI from "openai"

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(
//     req: Request
// ) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages } = body;

//     if(!userId) {
//       return new NextResponse("Unautharized", {status: 401});
//     }

//     if(!openai.apiKey) {
//       return new NextResponse("OpenAI API key not configured", {status: 500});
//     }

//     if(!messages) {
//       return new NextResponse("Messages are required", {status: 400});
//     }

//     const response = await openai.chat.completions.create({
//       model:"gpt-3.5-turbo",
//       messages,
//     })

//     return NextResponse.json(response.choices[0].message);
//   }
//   catch (error) {
//     console.log("[CONVERSATION_ERROR", error);
//     return new NextResponse("Internal error", {status: 500});
//   }
// }
