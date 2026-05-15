import { Candidate } from "@/src/entities/user";
import { verifyUser } from "@/src/entities/user/server/auth";
import { setSession } from "@/src/entities/user/server/session";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {

	let body: Candidate;

	try {
		body = await req.json()
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, {status: 400})
	}

	const user = await verifyUser(body);

	if (!user) {
    return NextResponse.json({ error: "Invalid data" }, { status: 401 });
	}

	await setSession(user);

	return NextResponse.json(user, { status: 200 });
}