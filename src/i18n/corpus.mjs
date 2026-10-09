import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
export const digest = value => createHash('sha256').update(value).digest('hex');
export const cacheURL = new URL('../../.cache/i18n/corpus.json', import.meta.url);
export function loadCorpus() { return JSON.parse(readFileSync(cacheURL, 'utf8')); }
export const babelOptions = { sourceType: 'module', plugins: ['jsx', 'typescript', 'decorators-legacy'] };
