import { NextResponse } from 'next/server';
import { Secret, sign } from 'jsonwebtoken';
import urlcat from 'urlcat';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session/session';
import { cookies } from 'next/headers';

const scope = ['identify'].join(' ');

const OAUTH_URL = urlcat('https://discord.com/api/oauth2/authorize', {
  client_id: process.env.CLIENT_ID,
  redirect_uri: process.env.REDIRECT_URI,
  response_type: 'code',
  scope,
});

async function exchangeCode(code: string) {
  const tokenReq = await fetch("https://discord.com/api/oauth2/token", {
    method: 'POST',
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID as string,
      client_secret: process.env.CLIENT_SECRET as string,
      grant_type: "authorization_code",
      redirect_uri: process.env.REDIRECT_URI as string,
      code: code,
      scope: scope as string
    }).toString() as string
  });
  const auth = await tokenReq.json();
  const userReq = await fetch("https://discord.com/api/users/@me", {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${auth.access_token}`
    }
  })
  const user = await userReq.json()
  return { user, auth };
}

export const GET = async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code');
  if (typeof code !== 'string') {
    return NextResponse.redirect(OAUTH_URL);
  }
  const { user } = await exchangeCode(code);
  const token = sign(user, process.env.JWT_SECRET as Secret, { expiresIn: '24h' });
  //Se è confermato che c'è il token, creo la sessione con iron-session
  if (token) {
    // Creo sessione
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    // Aggiungo qui eventuale interazione con db
    session.id = user.id;
    session.username = user.username;
    session.avatar = user.avatar;
    session.token = token;
    session.loggedIn = true;
    //Salvo la sessione
    await session.save();
  }
  return NextResponse.redirect(process.env.APP_URI as string, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
};