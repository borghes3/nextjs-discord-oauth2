import { SessionOptions } from "iron-session";

export interface SessionData {
  id: string;
  username: string;
  avatar: string;
  token: string;
  loggedIn: boolean;
}

export const defaultSession: SessionData = {
  id: '',
  username: '',
  avatar: '',
  token: '',
  loggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_ENCRYPT_PASSWORD as string,
  cookieName: "user",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}