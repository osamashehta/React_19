"use client";

import { useQuery } from "@tanstack/react-query";
async function fetchSession() {
  const res = await fetch("/api/auth/auth-cookie", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch session");
  }

  return res.json();
}

export function useSession(){
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: Infinity, // never refetch automatically
    gcTime: Infinity, // keep cached forever (until page unload)
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    token: data?.token ?? null,
    guestId: data?.guestId ?? null,
  };
}
