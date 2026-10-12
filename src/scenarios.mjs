// Scenario identities are the extension boundary. Every scenario owns its
// workload, registry and plugins; the mutation runner only knows their contract.
export const scenarios = [
  { id: 'styled-components', title: 'Styled-components', runner: 'mutation' },
  { id: 'remove-debugger', title: 'Remove debugger', runner: 'mutation' },
  { id: 'rstest-coverage', title: 'Normalize coverage branches', runner: 'mutation' },
  { id: 'i18n', title: 'Collect i18n strings', runner: 'readonly' },
];
