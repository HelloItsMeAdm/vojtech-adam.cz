import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UTM_CONFIGS: Record<string, string> = {
  ig: "?utm_source=instagram&utm_medium=social&utm_campaign=bio_link",
};

export default function UtmRedirect({ source }: { source?: string }) {
  const { search } = useLocation();

  useEffect(() => {
    const defaultUtm = UTM_CONFIGS[source ?? ""] || "?utm_source=direct";
    const targetSearch = search || defaultUtm;

    // Persist UTM params to sessionStorage so analytics code can read them
    try {
      const params = new URLSearchParams(targetSearch);
      const UTM_KEYS = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
      ];
      const utm: Record<string, string> = {};
      for (const key of UTM_KEYS) {
        const val = params.get(key);
        if (val) utm[key] = val;
      }
      if (Object.keys(utm).length > 0) {
        sessionStorage.setItem("utm_attribution", JSON.stringify(utm));
      }
    } catch (e) {
      // ignore storage errors
    }

    // Merge params into the base URL only if they don't exist, then redirect to '/'
    const target = new URL(window.location.href);
    const params = new URLSearchParams(targetSearch);
    params.forEach((value, key) => {
      if (!target.searchParams.has(key)) {
        target.searchParams.set(key, value);
      }
    });

    target.pathname = "/";
    // Use replace so the redirect doesn't create a history entry
    window.location.replace(target.toString());
  }, [source, search]);

  return (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );
}
