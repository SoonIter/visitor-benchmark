import { registerHooks } from 'node:module';
import { pathToFileURL } from 'node:url';
const entry = process.env.SWC_NEXT_WALKER_ENTRY;
if (entry) registerHooks({
  resolve(specifier, context, nextResolve) {
    const result = nextResolve(specifier, context);
    if (result.url.endsWith('/vendor/swc-next/ast.js')) return { ...result, url: pathToFileURL(entry).href };
    return result;
  },
});
