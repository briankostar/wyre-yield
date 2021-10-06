import axios from "axios";
import { useEffect, useState } from "react";

export function useCreateWalletOrder(accountId) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    axios
      .get("/api/createWalletOrder", {})
      .then((res: any) => {
        setUrl(res.data.data);
      })
      .catch((err) => {
        console.log("Error at useCreateWalletOrder", err);
      });
  }, [accountId]);

  return url;
}
