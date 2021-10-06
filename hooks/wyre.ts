import axios from "axios";
import { useEffect, useState } from "react";

export function useCreateWalletOrder(accountId) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    axios
      .get("/api/createWalletOrder", {})
      .then((res: any) => {
        console.log("resres", res.data.data);

        setUrl(res.data.data);
      })
      .catch((err) => {
        console.log("Error at useCreateWalletOrder", err);
      });
  }, [accountId]);

  return url;
}
