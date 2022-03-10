import { AdopterSearchResult } from ':cds-website/components/AdoptionTracker/types';

export function getResultsByType(results: AdopterSearchResult[]): {
  props: AdopterSearchResult[];
  components: AdopterSearchResult[];
} {
  const componentSearchResults: AdopterSearchResult[] = [];
  const propSearchResults: AdopterSearchResult[] = [];
  for (const result of results) {
    const { type: resultType } = result;
    if (resultType === 'component') {
      componentSearchResults.push(result);
    }
    if (resultType === 'prop') {
      propSearchResults.push(result);
    }
  }

  return {
    props: propSearchResults,
    components: componentSearchResults,
  };
}

export function isMatch(result: AdopterSearchResult, fields: string[]) {
  let { val } = result;

  // free text search
  let regex;
  if (val.startsWith('"')) {
    val = val.replaceAll('"', '');
    regex = new RegExp(val, 'ig');
  }

  for (const field of fields) {
    if (regex) {
      if (field.match(regex) !== null) {
        return true;
      }
    } else if (val === field) {
      return true;
    }
  }

  return false;
}
