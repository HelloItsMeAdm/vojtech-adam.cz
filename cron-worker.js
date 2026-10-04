// Cron pro solarsystem.vojtech-adam.cz
//
// Klic uz NENI v URL - jde v hlavicce X-Api-Key. Diky tomu se neobjevi
// v access logu hostingu. Hodnota je v Cloudflare jako Secret (ADMIN_KEY),
// takze neni ani ve zdrojaku workeru.
//
// Nastaveni tajneho klice:
//   wrangler secret put ADMIN_KEY
// nebo v dashboardu: Workers -> tvuj worker -> Settings -> Variables and Secrets
// -> Add -> typ "Secret", nazev ADMIN_KEY

const BASE = "https://solarsystem.vojtech-adam.cz/api";

const TASKS = {
  night: [
    `${BASE}/cron/sqlcleaner.php`,
    `${BASE}/cron/sqlcharged.php`,
    `${BASE}/cron/updatechargetimes.php`,
  ],
  afternoon: [
    `${BASE}/switcher/setswitchtime.php`,
  ],
};

function getPragueHour() {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Prague",
      hour12: false,
      hour: "numeric",
    }).format(new Date())
  );
}

function pickTasks(hour) {
  // Rozsahy hodin pokryvaji posun letniho a zimniho casu, aby se cron
  // trefil i po prechodu.
  if (hour === 15 || hour === 16) return { urls: TASKS.afternoon, label: "Afternoon" };
  if (hour === 23 || hour === 0 || hour === 1) return { urls: TASKS.night, label: "Night" };
  return { urls: [], label: "" };
}

async function runCron(env) {
  if (!env.ADMIN_KEY) {
    console.error("ADMIN_KEY neni nastaveny - cron se neprovedl.");
    return;
  }

  const hour = getPragueHour();
  const { urls, label } = pickTasks(hour);
  if (urls.length === 0) return;

  for (const url of urls) {
    const name = url.split("/").pop();
    try {
      const res = await fetch(url, {
        headers: { "X-Api-Key": env.ADMIN_KEY },
      });

      // Endpointy vraci JSON, takze pri chybe je videt i duvod.
      if (res.ok) {
        console.log(`[${label}] ${name}: ${res.status}`);
      } else {
        const body = await res.text();
        console.error(`[${label}] ${name}: ${res.status} - ${body.slice(0, 300)}`);
      }
    } catch (e) {
      console.error(`[${label}] ${name}: fetch selhal - ${e.message}`);
    }
  }
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runCron(env));
  },
};
