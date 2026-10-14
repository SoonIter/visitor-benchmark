import { registerHooks } from 'node:module';
// Diagnostic only: use the same mutation helpers and hook positions as Oxc Visitor.
// The original adapters and main leaderboard are never rewritten.
if (process.env.SWC_OPERATIONS === 'matched') registerHooks({
  resolve(specifier, context, nextResolve) {
    const result = nextResolve(specifier, context);
    const match = result.url.match(/\/src\/(styled-components|rstest-coverage|remove-debugger)\/plugins\/swc-next.mjs$/);
    if (match) return { ...result, url: new URL(`./${match[1]}.mjs`, import.meta.url).href };
    return result;
  },
});
