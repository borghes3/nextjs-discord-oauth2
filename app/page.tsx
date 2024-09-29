import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionData, sessionOptions } from "@/lib/session/session";
import { getIronSession } from "iron-session";
import { LogIn, LogOut, TriangleAlert } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (!session.loggedIn) {
    return (
      <main className="flex items-center justify-center h-screen">
        <div className="flex-col">
          <Card className="mx-auto max-w-96 text-center flex flex-col justify-center items-center">
            <CardHeader>
              <div className="flex items-center">
                <TriangleAlert color="red" size={24} className="mr-2" />
                <CardTitle className="text-center">Discord OAuth2 Login</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>You&apos;re not logged in, log in using Discord&apos;s OAuth2 by clicking the button below!</p>
            </CardContent>
            <CardFooter>
              <Button variant={'outline'} asChild>
                <Link href={'/api/oauth/login'}>
                  <LogIn size={18} className="mr-2" />
                  <p className="text-md">Log In</p>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    )
  } else {
    return (
      <main className="flex items-center justify-center h-screen">
        <div className="flex-col">
          <Card className="mx-auto text-center flex flex-col justify-center items-center">
            <CardHeader>
              <div className="flex items-center">
                <Image src={`https://cdn.discordapp.com/avatars/${session.id}/${session.avatar}.webp`} alt="PP" width={'64'} height={'64'} className="rounded-full mr-4 border-2 border-black" />
                <CardTitle className="text-center text-xl">{session.username}, you&apos;re logged in!</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Card className="flex justify-between p-4"><p>ID:</p><span>{session.id}</span></Card>
              <Card className="flex justify-between p-4 mt-2"><p>Username:</p><span>{session.username}</span></Card>
              <Card className="flex justify-between p-4 mt-2"><p>Avatar:</p><span>{session.avatar}</span></Card>
              <Card className="flex flex-col text-center justify-center p-4 mt-2">
                <p>Token:</p>
                <Link
                  href={`https://jwt.io/#debugger-io?token=${session.token}`}
                  target="_blank"
                  className="text-blue-600 underline hover:cursor-pointer"
                >Decode it!</Link>
              </Card>
            </CardContent>
            <CardFooter>
              <Button variant={'link'} asChild>
                <Link href={'/api/oauth/logout'}>
                  <LogOut size={18} className="mr-2" />
                  <p>Logout</p>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    );
  }
}
