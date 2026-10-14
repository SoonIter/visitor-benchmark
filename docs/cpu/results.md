# CPU simulation results

Lower is better. Ranks are local to the input track and exact AST family. Native AST results are not an ESTree walker ranking.

## Styled-components

### dense

**ESTree**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| direct-ast | 9361.927 | 22086.482 | 0.343 | 1 / 1 / 1 |
| acorn-recursive | 20733.836 | 49850.770 | 0.717 | 2 / 2 / 3 |
| acorn-full | 34382.669 | 80833.662 | 1.094 | 4 / 3 / 4 |
| acorn-simple | 34498.106 | 82775.658 | 1.215 | 5 / 4 / 5 |
| esrecurse | 33564.560 | 85277.694 | 1.440 | 3 / 5 / 6 |
| swc-next | 41227.282 | 106166.372 | 1.664 | 6 / 6 / 7 |
| typescript-eslint | 52710.122 | 129636.922 | 2.138 | 7 / 7 / 8 |
| oxc-visitor | 53412.634 | 138220.734 | 0.589 | 8 / 8 / 2 |
| yuku-ast | 60283.492 | 154874.559 | 2.175 | 9 / 9 / 9 |
| estree-walker | 65548.467 | 164384.875 | 2.419 | 10 / 10 / 10 |
| oxc-walker | 67850.890 | 171473.891 | 2.615 | 11 / 11 / 11 |
| zimmerframe | 93139.897 | 223264.645 | 3.168 | 13 / 12 / 12 |
| estraverse | 90158.777 | 230634.037 | 3.193 | 12 / 13 / 14 |
| esquery | 126668.133 | 317292.332 | 3.189 | 14 / 14 / 13 |
| estree-toolkit | 207680.812 | 517729.700 | 6.124 | 15 / 15 / 15 |
| estree-util-visit | 234582.105 | 549200.696 | 7.065 | 16 / 16 / 16 |
| estree-toolkit-scope | 428608.636 | 1069075.170 | 10.844 | 17 / 17 / 17 |
| ast-types | 662431.419 | 1640915.841 | 12.381 | 18 / 18 / 18 |
| jscodeshift | 679127.539 | 1685255.186 | 13.482 | 19 / 19 / 19 |

**Babel AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast | 37707.272 | 94351.980 | 0.663 | 1 / 1 / 1 |
| babel-types-traverse | 45762.306 | 113820.474 | 0.721 | 2 / 2 / 2 |
| babel-traverse-no-scope | 273952.933 | 710001.943 | 8.698 | 3 / 3 / 3 |
| babel-traverse | 588653.679 | 1529318.913 | 15.295 | 4 / 4 / 4 |

**SWC AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| swc-visitor | 27317.567 | 66268.443 | 1.491 | 1 / 1 / 1 |

**TypeScript 6 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| typescript | 97190.669 | 232876.483 | 1.513 | 1 / 1 / 1 |
| tsquery | 1336176.269 | 3141417.398 | 22.683 | 2 / 2 / 2 |

**TypeScript AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| ts-morph | 1062602.399 | 2490458.931 | 15.141 | 1 / 1 / 1 |

### sparse

**ESTree**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| direct-ast | 2645.462 | 6470.486 | 0.109 | 1 / 1 / 1 |
| acorn-recursive | 27871.851 | 67864.605 | 0.831 | 2 / 2 / 3 |
| acorn-full | 57232.414 | 134286.217 | 1.525 | 4 / 3 / 4 |
| esrecurse | 52796.687 | 137159.490 | 2.160 | 3 / 4 / 6 |
| acorn-simple | 57998.987 | 139801.048 | 1.771 | 5 / 5 / 5 |
| swc-next | 65171.547 | 170568.031 | 2.941 | 6 / 6 / 7 |
| typescript-eslint | 100284.951 | 247402.502 | 3.089 | 8 / 7 / 8 |
| oxc-visitor | 98802.025 | 259870.403 | 0.664 | 7 / 8 / 2 |
| yuku-ast | 108868.207 | 282212.565 | 3.592 | 9 / 9 / 12 |
| estree-walker | 114468.535 | 288879.760 | 3.393 | 10 / 10 / 9 |
| oxc-walker | 120257.648 | 306234.383 | 3.500 | 11 / 11 / 11 |
| zimmerframe | 122195.022 | 307621.667 | 3.414 | 12 / 12 / 10 |
| estraverse | 165413.490 | 425811.551 | 6.054 | 13 / 13 / 14 |
| esquery | 241363.433 | 607345.484 | 5.104 | 14 / 14 / 13 |
| estree-toolkit | 346960.542 | 873590.781 | 7.813 | 15 / 15 / 15 |
| estree-util-visit | 450723.906 | 1054693.399 | 12.457 | 16 / 16 / 16 |
| estree-toolkit-scope | 761551.701 | 1914988.288 | 18.737 | 17 / 17 / 17 |
| ast-types | 1574436.710 | 3905190.688 | 22.928 | 18 / 18 / 19 |
| jscodeshift | 1591120.330 | 3948046.625 | 22.872 | 19 / 19 / 18 |

**Babel AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast | 68504.477 | 173704.731 | 0.970 | 1 / 1 / 1 |
| babel-types-traverse | 86848.026 | 217750.833 | 1.050 | 2 / 2 / 2 |
| babel-traverse-no-scope | 585454.269 | 1510435.030 | 12.587 | 3 / 3 / 3 |
| babel-traverse | 1270203.084 | 3309340.126 | 27.149 | 4 / 4 / 4 |

**SWC AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| swc-visitor | 46021.323 | 112600.252 | 2.824 | 1 / 1 / 1 |

**TypeScript 6 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| typescript | 103815.881 | 240985.238 | 1.720 | 1 / 1 / 1 |
| tsquery | 2804389.508 | 6559793.704 | 41.741 | 2 / 2 / 2 |

**TypeScript AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| ts-morph | 1278519.182 | 2966062.458 | 11.857 | 1 / 1 / 1 |

## Remove debugger

### dense

**ESTree**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| acorn-recursive | 10699.769 | 26111.787 | 0.405 | 1 / 1 / 2 |
| esrecurse | 15648.046 | 40385.728 | 0.895 | 2 / 2 / 5 |
| acorn-simple | 19774.453 | 47817.295 | 0.694 | 3 / 3 / 3 |
| swc-next | 21386.828 | 56121.780 | 1.470 | 4 / 4 / 8 |
| acorn-full | 24425.872 | 58253.172 | 0.707 | 5 / 5 / 4 |
| oxc-visitor | 24905.819 | 65076.853 | 0.264 | 6 / 6 / 1 |
| typescript-eslint | 28125.265 | 69207.773 | 1.528 | 7 / 7 / 9 |
| estree-walker | 28205.912 | 72505.206 | 1.201 | 9 / 8 / 7 |
| yuku-ast | 28185.024 | 72748.688 | 1.736 | 8 / 9 / 10 |
| oxc-walker | 29348.548 | 75762.104 | 1.055 | 10 / 10 / 6 |
| direct-ast | 46167.197 | 114752.981 | 1.900 | 11 / 11 / 11 |
| estraverse | 52188.828 | 137113.880 | 2.230 | 12 / 12 / 12 |
| zimmerframe | 65842.350 | 153036.281 | 2.728 | 13 / 13 / 13 |
| estree-toolkit | 83151.906 | 207735.316 | 4.391 | 14 / 14 / 16 |
| estree-util-visit | 96774.373 | 227416.676 | 3.623 | 15 / 15 / 14 |
| esquery | 131954.571 | 318291.750 | 4.117 | 16 / 16 / 15 |
| estree-toolkit-scope | 199260.847 | 492194.856 | 7.525 | 17 / 17 / 17 |
| ast-types | 288258.454 | 702167.052 | 8.285 | 18 / 18 / 18 |
| jscodeshift | 333934.952 | 821722.626 | 8.728 | 19 / 19 / 19 |

**Babel AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast | 22521.013 | 56373.982 | 0.356 | 1 / 1 / 1 |
| babel-types-traverse | 26234.371 | 65338.699 | 0.376 | 2 / 2 / 2 |
| babel-traverse-no-scope | 159930.649 | 412406.741 | 7.205 | 3 / 3 / 3 |
| babel-traverse | 348983.227 | 900980.411 | 12.626 | 4 / 4 / 4 |

**SWC AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| swc-visitor | 10865.886 | 26234.458 | 0.712 | 1 / 1 / 1 |

**TypeScript 6 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| typescript | 42139.329 | 101351.830 | 0.940 | 1 / 1 / 1 |
| tsquery | 690786.716 | 1623640.474 | 12.029 | 2 / 2 / 2 |

**TypeScript AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| ts-morph | 481371.693 | 1128421.123 | 10.810 | 1 / 1 / 1 |

### sparse

**ESTree**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| acorn-recursive | 18435.097 | 44139.317 | 0.601 | 1 / 1 / 2 |
| esrecurse | 31517.084 | 81259.478 | 1.442 | 2 / 2 / 5 |
| acorn-simple | 35886.107 | 85821.046 | 1.128 | 3 / 3 / 4 |
| swc-next | 36342.793 | 95345.242 | 1.783 | 4 / 4 / 6 |
| acorn-full | 46941.620 | 110875.568 | 1.111 | 5 / 5 / 3 |
| oxc-visitor | 54552.092 | 143070.822 | 0.418 | 6 / 6 / 1 |
| yuku-ast | 60333.729 | 156639.742 | 2.200 | 7 / 7 / 7 |
| estree-walker | 66539.565 | 169813.307 | 2.475 | 8 / 8 / 9 |
| typescript-eslint | 71784.258 | 174896.889 | 2.520 | 10 / 9 / 10 |
| oxc-walker | 70762.869 | 182065.163 | 2.429 | 9 / 10 / 8 |
| zimmerframe | 74135.815 | 184821.285 | 2.571 | 11 / 11 / 11 |
| estraverse | 93379.619 | 240763.438 | 4.682 | 12 / 12 / 13 |
| direct-ast | 129170.768 | 320241.525 | 3.655 | 13 / 13 / 12 |
| estree-toolkit | 159312.743 | 398737.635 | 5.454 | 14 / 14 / 14 |
| estree-util-visit | 252992.154 | 593204.274 | 7.658 | 15 / 15 / 16 |
| esquery | 291968.593 | 705816.281 | 5.524 | 16 / 16 / 15 |
| estree-toolkit-scope | 425298.954 | 1060542.151 | 12.170 | 17 / 17 / 17 |
| ast-types | 844016.290 | 2102258.357 | 14.769 | 18 / 18 / 18 |
| jscodeshift | 852147.380 | 2120862.036 | 16.447 | 19 / 19 / 19 |

**Babel AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast | 55493.532 | 138341.354 | 0.851 | 1 / 1 / 1 |
| babel-types-traverse | 66027.665 | 163670.861 | 0.908 | 2 / 2 / 2 |
| babel-traverse-no-scope | 305575.722 | 795859.360 | 8.965 | 3 / 3 / 3 |
| babel-traverse | 721533.499 | 1875355.419 | 19.086 | 4 / 4 / 4 |

**SWC AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| swc-visitor | 26977.620 | 65911.637 | 1.669 | 1 / 1 / 1 |

**TypeScript 6 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| typescript | 57678.687 | 134413.233 | 1.196 | 1 / 1 / 1 |
| tsquery | 1571344.819 | 3675838.328 | 24.548 | 2 / 2 / 2 |

**TypeScript AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| ts-morph | 1245561.916 | 2899720.162 | 20.261 | 1 / 1 / 1 |

## Normalize coverage branches

### runtime

**ESTree**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| acorn-recursive | 6831.905 | 16632.162 | 0.379 | 1 / 1 / 2 |
| acorn-full | 13638.630 | 32122.735 | 0.615 | 3 / 2 / 3 |
| acorn-simple | 13788.910 | 33286.357 | 0.627 | 4 / 3 / 4 |
| esrecurse | 13396.253 | 34670.751 | 0.986 | 2 / 4 / 5 |
| swc-next | 16905.841 | 43660.613 | 1.155 | 5 / 5 / 6 |
| typescript-eslint | 23828.733 | 58355.799 | 1.430 | 6 / 6 / 7 |
| oxc-visitor | 26288.987 | 68893.735 | 0.259 | 7 / 7 / 1 |
| yuku-ast | 27124.066 | 70107.879 | 1.621 | 8 / 8 / 10 |
| estree-walker | 29958.900 | 76280.538 | 1.557 | 9 / 9 / 9 |
| zimmerframe | 30730.664 | 76935.161 | 1.655 | 10 / 10 / 11 |
| oxc-walker | 31228.316 | 79976.396 | 1.481 | 11 / 11 / 8 |
| estraverse | 41468.572 | 106557.630 | 2.371 | 12 / 12 / 13 |
| direct-ast | 48668.132 | 117455.375 | 1.831 | 13 / 13 / 12 |
| estree-toolkit | 66376.931 | 165575.435 | 3.466 | 14 / 14 / 15 |
| esquery | 66905.900 | 169233.681 | 2.945 | 15 / 15 / 14 |
| estree-util-visit | 115817.728 | 272642.916 | 4.616 | 16 / 16 / 16 |
| estree-toolkit-scope | 160855.181 | 397370.405 | 5.932 | 17 / 17 / 17 |
| ast-types | 329394.042 | 819145.771 | 7.512 | 18 / 18 / 18 |
| jscodeshift | 333326.644 | 826686.200 | 9.112 | 19 / 19 / 19 |

**Babel AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast | 16572.332 | 41913.657 | 0.322 | 1 / 1 / 1 |
| babel-types-traverse | 21285.044 | 53226.905 | 0.346 | 2 / 2 / 2 |
| babel-traverse-no-scope | 122926.606 | 318083.632 | 5.489 | 3 / 3 / 3 |
| babel-traverse | 311423.687 | 808189.683 | 10.796 | 4 / 4 / 4 |

**SWC AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| swc-visitor | 11231.424 | 27415.489 | 0.839 | 1 / 1 / 1 |

**TypeScript 6 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| typescript | 22496.467 | 51797.034 | 0.682 | 1 / 1 / 1 |
| tsquery | 747106.620 | 1761977.948 | 13.000 | 2 / 2 / 2 |

**TypeScript AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| ts-morph | 325093.975 | 746480.281 | 4.352 | 1 / 1 / 1 |

### tooling

**ESTree**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| acorn-recursive | 5672.485 | 13801.133 | 0.333 | 1 / 1 / 2 |
| acorn-full | 11185.854 | 26348.353 | 0.552 | 2 / 2 / 3 |
| acorn-simple | 11320.338 | 27328.120 | 0.573 | 4 / 3 / 4 |
| esrecurse | 11264.744 | 29118.280 | 0.840 | 3 / 4 / 5 |
| swc-next | 13815.579 | 35912.687 | 1.020 | 5 / 5 / 6 |
| typescript-eslint | 19940.595 | 48822.905 | 1.562 | 6 / 6 / 10 |
| oxc-visitor | 22096.643 | 57816.974 | 0.246 | 7 / 7 / 1 |
| yuku-ast | 22825.843 | 58962.474 | 1.433 | 8 / 8 / 9 |
| estree-walker | 25310.805 | 64416.243 | 1.347 | 9 / 9 / 8 |
| oxc-walker | 26415.296 | 67641.362 | 1.096 | 10 / 10 / 7 |
| zimmerframe | 27783.183 | 68833.070 | 1.566 | 11 / 11 / 11 |
| estraverse | 34855.463 | 89542.092 | 1.984 | 12 / 12 / 13 |
| direct-ast | 40443.976 | 97676.055 | 1.623 | 13 / 13 / 12 |
| estree-toolkit | 54322.920 | 135570.581 | 2.610 | 14 / 14 / 15 |
| esquery | 59069.580 | 149815.063 | 2.398 | 15 / 15 / 14 |
| estree-util-visit | 100769.816 | 237703.044 | 4.270 | 16 / 16 / 16 |
| estree-toolkit-scope | 148068.912 | 366386.951 | 6.368 | 17 / 17 / 17 |
| ast-types | 273714.982 | 676811.334 | 6.527 | 18 / 18 / 18 |
| jscodeshift | 277452.650 | 686976.644 | 6.916 | 19 / 19 / 19 |

**Babel AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast | 13757.190 | 34790.632 | 0.296 | 1 / 1 / 1 |
| babel-types-traverse | 17806.381 | 44492.067 | 0.308 | 2 / 2 / 2 |
| babel-traverse-no-scope | 105060.938 | 271882.501 | 4.953 | 3 / 3 / 3 |
| babel-traverse | 289567.225 | 752651.690 | 9.937 | 4 / 4 / 4 |

**SWC AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| swc-visitor | 9611.233 | 23455.611 | 0.749 | 1 / 1 / 1 |

**TypeScript 6 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| typescript | 19158.102 | 44102.937 | 0.633 | 1 / 1 / 1 |
| tsquery | 578978.726 | 1364863.463 | 11.378 | 2 / 2 / 2 |

**TypeScript AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| ts-morph | 284749.633 | 657813.592 | 5.266 | 1 / 1 / 1 |

## Collect i18n strings

### original

**ESTree**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| direct-ast | 51152.833 | 123971.482 | 1.831 | 1 / 1 / 2 |
| estree-walker | 79797.838 | 208712.869 | 2.779 | 2 / 2 / 4 |
| zimmerframe | 90819.803 | 224408.699 | 2.926 | 4 / 3 / 5 |
| oxc-walker | 88310.961 | 231440.955 | 2.486 | 3 / 4 / 3 |
| swc-next | 91268.161 | 232346.156 | 3.726 | 5 / 5 / 6 |
| yuku-ast | 124443.805 | 316193.377 | 4.393 | 6 / 6 / 7 |
| oxc-visitor | 124857.120 | 326366.135 | 1.496 | 7 / 7 / 1 |
| estree-util-visit | 277902.193 | 662749.832 | 7.750 | 8 / 8 / 8 |
| acorn-simple | Unsupported | — | — | — |
| acorn-recursive | Unsupported | — | — | — |
| acorn-full | Unsupported | — | — | — |
| estraverse | Unsupported | — | — | — |
| esrecurse | Unsupported | — | — | — |
| estree-toolkit | Unsupported | — | — | — |
| estree-toolkit-scope | Unsupported | — | — | — |
| ast-types | Unsupported | — | — | — |
| jscodeshift | Unsupported | — | — | — |
| esquery | Unsupported | — | — | — |
| typescript-eslint | Unsupported | — | — | — |

**Babel AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast-v8 | 61975.831 | 156675.888 | 1.137 | 1 / 1 / 1 |
| babel-types-traverse-v8 | 80843.706 | 201850.454 | 1.263 | 2 / 2 / 2 |
| babel-traverse-no-scope-v8 | 524918.536 | 1367016.619 | 10.226 | 3 / 3 / 3 |
| babel-traverse-v8 | 1139571.428 | 2961704.038 | 23.869 | 4 / 4 / 4 |

**SWC AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| swc-visitor | Unsupported | — | — | — |

**TypeScript 6 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| typescript | 41205.695 | 92603.197 | 1.503 | 1 / 1 / 1 |
| tsquery | 600125.410 | 1429097.338 | 10.302 | 2 / 2 / 2 |

**TypeScript AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| ts-morph | 650167.399 | 1528385.549 | 19.023 | 1 / 1 / 1 |

**Babel 7 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast-v7 | 66636.151 | 167061.737 | 1.218 | 1 / 1 / 1 |
| babel-traverse-no-scope-v7 | 462022.487 | 1175708.814 | 11.068 | 2 / 2 / 2 |
| babel-traverse-v7 | 1543154.220 | 3958422.207 | 27.862 | 3 / 3 / 3 |

### javascript

**ESTree**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| acorn-recursive | 19436.269 | 47742.879 | 0.932 | 1 / 1 / 2 |
| acorn-full | 39926.057 | 94124.509 | 1.394 | 2 / 2 / 3 |
| acorn-simple | 40247.505 | 97314.558 | 1.651 | 4 / 3 / 4 |
| esrecurse | 40110.037 | 104246.730 | 2.130 | 3 / 4 / 5 |
| swc-next | 52943.735 | 138321.188 | 2.586 | 5 / 5 / 6 |
| typescript-eslint | 75047.218 | 185668.326 | 3.147 | 6 / 6 / 7 |
| direct-ast | 81188.670 | 195536.157 | 3.364 | 7 / 7 / 10 |
| oxc-visitor | 81972.573 | 214759.346 | 0.820 | 8 / 8 / 1 |
| zimmerframe | 85269.537 | 216483.464 | 3.255 | 9 / 9 / 8 |
| yuku-ast | 86491.567 | 223602.050 | 3.427 | 10 / 10 / 11 |
| estree-walker | 94442.307 | 240884.044 | 3.567 | 11 / 11 / 12 |
| oxc-walker | 98873.990 | 253740.428 | 3.299 | 12 / 12 / 9 |
| estraverse | 172836.451 | 448033.202 | 4.205 | 13 / 13 / 13 |
| estree-toolkit | 210038.001 | 522901.529 | 5.941 | 14 / 14 / 15 |
| esquery | 218709.909 | 552592.072 | 5.148 | 15 / 15 / 14 |
| estree-util-visit | 371134.476 | 873316.951 | 12.356 | 16 / 16 / 16 |
| estree-toolkit-scope | 490959.249 | 1210870.636 | 14.150 | 17 / 17 / 17 |
| ast-types | Unsupported | — | — | — |
| jscodeshift | Unsupported | — | — | — |

**Babel AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast-v8 | 50405.881 | 127639.887 | 0.961 | 1 / 1 / 1 |
| babel-types-traverse-v8 | 65876.584 | 164724.914 | 1.032 | 2 / 2 / 2 |
| babel-traverse-no-scope-v8 | 441457.506 | 1136885.708 | 8.172 | 3 / 3 / 3 |
| babel-traverse-v8 | 960330.486 | 2493843.593 | 20.930 | 4 / 4 / 4 |

**SWC AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| swc-visitor | Unsupported | — | — | — |

**TypeScript 6 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| typescript | 34850.919 | 78399.350 | 1.206 | 1 / 1 / 1 |
| tsquery | 502354.516 | 1198057.296 | 8.651 | 2 / 2 / 2 |

**TypeScript AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| ts-morph | 531356.811 | 1249070.350 | 14.727 | 1 / 1 / 1 |

**Babel 7 AST (not ESTree)**

| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |
| :-- | --: | --: | --: | :-- |
| babel-types-traverse-fast-v7 | 54220.252 | 136195.493 | 0.987 | 1 / 1 / 1 |
| babel-traverse-no-scope-v7 | 354228.327 | 902661.020 | 8.320 | 2 / 2 / 2 |
| babel-traverse-v7 | 1319606.431 | 3384163.540 | 25.217 | 3 / 3 / 3 |
