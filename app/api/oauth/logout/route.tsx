import { SessionData, sessionOptions } from "@/lib/session/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.destroy();
  return redirect(process.env.APP_URI as string)
}