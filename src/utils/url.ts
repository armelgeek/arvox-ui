/**
 * Utilitaires pour la manipulation des URLs et des paramètres de requête
 */

export function buildUrl(baseUrl: string, params: Record<string, unknown>): string {
  const url = new URL(baseUrl);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => url.searchParams.append(key, String(v)));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  });
  
  return url.toString();
}

export function parseUrlParams(search: string): Record<string, string | string[]> {
  const params = new URLSearchParams(search);
  const result: Record<string, string | string[]> = {};
  
  for (const [key, value] of params.entries()) {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        (result[key] as string[]).push(value);
      } else {
        result[key] = [result[key] as string, value];
      }
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

export function removeUrlParams(url: string, paramsToRemove: string[]): string {
  const urlObj = new URL(url);
  
  paramsToRemove.forEach(param => {
    urlObj.searchParams.delete(param);
  });
  
  return urlObj.toString();
}

export function updateUrlParams(url: string, newParams: Record<string, unknown>): string {
  const urlObj = new URL(url);
  
  Object.entries(newParams).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      urlObj.searchParams.delete(key);
    } else {
      urlObj.searchParams.set(key, String(value));
    }
  });
  
  return urlObj.toString();
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}
