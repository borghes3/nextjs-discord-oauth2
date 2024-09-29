This repo is simple-straightforward NextJS template that integrates Discord’s OAuth2 without relying on heavyweight and closed-source libraries. Completely customisable and scalable.

## Installation

Just clone the repo, will publish this to vercel soon!

## Configuration

1. Create a new (or use an existing) Discord app through the [Developer Portal](https://discord.com/developers/applications)
2. Add your REDIRECT_URI to your application's redirects (remeber to change it when in production)
3. Copy your app's CLIENT_ID, CLIENT_SECRET and paste them in the enviroment file
4. Generate a secure password to encrypt the cookies storing the session, you can use any password manager of your choice, aim for 20+ characters passwords
5. Generate a JWT secret
6. Add both the JWT secret and the password to your enviroment file
7. That's it, you can now serve it locally! 🎉

## How it works

- I decided to create this repo to share my solution to all the ambiguity on the web about OAuth2 and NextJS.
90% of the answers refer to closed-source libraries such as NextAuth (Authjs) or Lucia.
- Although Lucia is a way better option (and I actually suggest you to use it) there may be some cases where you'd like to have COMPLETE control over your code, that's why the repo.
- This works basically by manually exchaning code and token with the Discord's API and creating a session using Iron Session.
You can completely customize the sessiond data in the session.ts file (/lib/session/session.ts) and add data from different sources such as a DB in the login route of the local API (/app/api/oauth/login).