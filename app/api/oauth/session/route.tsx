import { defaultSession, SessionData, sessionOptions } from "@/lib/session/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (session) {
    return Response.json(defaultSession);
  }
  return Response.json(session);
}