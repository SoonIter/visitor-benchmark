# Targeted JIT control

Shared ESTree, three isolated processes per cell, eight warmups and twenty samples per process; medians of process medians. Both modes use fixed hash/random seeds. The only changed process flags are `--no-opt --no-maglev`. Cases were selected after observing the first primary round: the styled-components Oxc reversal and the original-i18n track with weak rank correlation. This is a targeted diagnostic, not a comprehensive JIT comparison. All outputs match the primary run.

## styled-components/dense

| Implementation | Normal JIT (ms) | Optimizing JIT disabled (ms) | Slowdown |
| :-- | --: | --: | --: |
| oxc-visitor | 0.609 | 3.310 | 5.44× |
| oxc-walker | 2.594 | 5.407 | 2.08× |
| swc-next | 1.645 | 2.853 | 1.73× |
| yuku-ast | 2.230 | 4.069 | 1.82× |
| acorn-recursive | 0.769 | 1.500 | 1.95× |

## i18n/original

| Implementation | Normal JIT (ms) | Optimizing JIT disabled (ms) | Slowdown |
| :-- | --: | --: | --: |
| oxc-visitor | 1.610 | 7.834 | 4.87× |
| oxc-walker | 2.644 | 6.468 | 2.45× |
| swc-next | 3.997 | 6.286 | 1.57× |
| yuku-ast | 4.322 | 7.980 | 1.85× |
| estree-walker | 2.799 | 5.795 | 2.07× |

This can test whether disabling optimizing JIT changes the ordering of these implementations. It does not isolate individual V8 optimizations, and does not test Ct's instruction weights or cache behavior. [Raw samples](../../results/cpu/jit-control.json).
