const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const STORAGE_KEY = "utm_params";

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function getUtmFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const result: UtmParams = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) result[key] = value;
  });
  return result;
}

export function getUtmQueryString(params: UtmParams): string {
  const entries = Object.entries(params).filter(([, v]) => v);
  if (entries.length === 0) return "";
  return "?" + new URLSearchParams(entries as [string, string][]).toString();
}

export function saveUtmToStorage(params: UtmParams): void {
  if (typeof window === "undefined" || Object.keys(params).length === 0) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {}
}

export function loadUtmFromStorage(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UtmParams;
    return UTM_KEYS.reduce<UtmParams>((acc, key) => {
      if (parsed[key]) acc[key] = parsed[key];
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export function mergeUtmFromUrlAndStorage(urlSearch: string): UtmParams {
  const fromUrl = getUtmFromSearch(urlSearch);
  const fromStorage = loadUtmFromStorage();
  return { ...fromStorage, ...fromUrl };
}
