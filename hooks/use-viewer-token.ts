import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type JwtPayload, jwtDecode } from "jwt-decode";

import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    let isCancelled = false;
    const createToken = async () => {
      try {
        if (!isCancelled) {
          const viewerToken = await createViewerToken(hostIdentity);
          setToken(viewerToken);
          const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
            name?: string;
          };
          const name = decodedToken?.name;
          const identity = decodedToken.jti || decodedToken.sub;

          if (identity) {
            setIdentity(identity);
          }

          if (name) {
            setName(name);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    createToken();

    return () => {
      isCancelled = true;
    };
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
