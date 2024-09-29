import useSWR from "swr";
import { SessionData, defaultSession } from "./session";
import useSWRMutation from "swr/mutation";

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

function doLogin(url: string) {
  return fetchJson<SessionData>(url, {
    method: "GET",
  });
}

function doLogout(url: string) {
  return fetchJson<SessionData>(url, {
    method: "GET",
  });
}

export default function useSession() {
  const { data: session, isLoading } = useSWR(
    '/api/oauth/session',
    fetchJson<SessionData>,
    {
      fallbackData: defaultSession,
    },
  );

  const { trigger: login } = useSWRMutation('/api/oauth/login', doLogin);
  const { trigger: logout } = useSWRMutation('/api/oauth/logout', doLogout);

  return { session, logout, login, isLoading };
}