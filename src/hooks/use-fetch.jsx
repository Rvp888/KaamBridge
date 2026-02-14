import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

function useFetch(apiFn, options = {}) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const data = await apiFn(supabaseAccessToken, options, ...args);
      setData(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { fn, data, loading, error };
}

export default useFetch;
