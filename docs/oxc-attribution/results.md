# Oxc attribution: full results

Positive deltas mean slower. Intervals are descriptive paired-round bootstrap intervals, not guarantees across corpora or machines.

## Controls

### Fresh parser output

| Workload | Variant | Median ms | Process min–max |
|---|---|---:|---:|
| debugger-dense | walker-stock | 0.2507 | 0.2447–0.2590 |
| debugger-dense | walker-clone | 0.2543 | 0.2470–0.2590 |
| debugger-dense | visitor-stock | 0.1641 | 0.1539–0.2022 |
| debugger-dense | visitor-clone | 0.1640 | 0.1537–0.2131 |
| debugger-dense | visitor-keys | 0.2398 | 0.2275–0.2784 |
| debugger-dense | visitor-generic | 0.2153 | 0.2096–0.2639 |
| debugger-dense | walker-keys | 0.3797 | 0.3724–0.3970 |
| debugger-dense | walker-no-meta-skip | 0.2645 | 0.2612–0.2754 |
| debugger-dense | walker-fresh-context | 0.2552 | 0.2498–0.2773 |
| debugger-dense | walker-parent-exit | 0.3116 | 0.3044–0.3348 |
| debugger-dense | direct-stock | 0.5906 | 0.5811–0.6336 |
| debugger-dense | direct-for-in | 0.4629 | 0.4517–0.4987 |
| debugger-dense | direct-guarded | 0.2972 | 0.2794–0.3153 |
| debugger-sparse | walker-stock | 0.5607 | 0.5526–0.5996 |
| debugger-sparse | walker-clone | 0.5672 | 0.5606–0.6015 |
| debugger-sparse | visitor-stock | 0.3118 | 0.2873–0.4917 |
| debugger-sparse | visitor-clone | 0.3061 | 0.2913–0.5377 |
| debugger-sparse | visitor-keys | 0.4758 | 0.4579–0.5829 |
| debugger-sparse | visitor-generic | 0.4242 | 0.4004–0.5904 |
| debugger-sparse | walker-keys | 0.9173 | 0.9015–0.9827 |
| debugger-sparse | walker-no-meta-skip | 0.5945 | 0.5861–0.6388 |
| debugger-sparse | walker-fresh-context | 0.5738 | 0.5525–0.6012 |
| debugger-sparse | walker-parent-exit | 0.6308 | 0.6131–0.6759 |
| debugger-sparse | direct-stock | 1.6234 | 1.5653–1.6789 |
| debugger-sparse | direct-for-in | 1.2500 | 1.2230–1.3105 |
| debugger-sparse | direct-guarded | 0.7699 | 0.7319–0.7996 |
| styled-dense | walker-stock | 0.6774 | 0.6343–0.7508 |
| styled-dense | walker-clone | 0.6842 | 0.6255–0.7643 |
| styled-dense | visitor-stock | 0.4165 | 0.3963–0.5138 |
| styled-dense | visitor-clone | 0.3995 | 0.3911–0.5138 |
| styled-dense | visitor-keys | 0.5644 | 0.5252–0.6270 |
| styled-dense | visitor-generic | 0.4729 | 0.4486–0.6108 |
| styled-sparse | walker-stock | 1.0455 | 1.0010–1.1104 |
| styled-sparse | walker-clone | 1.0456 | 1.0159–1.0693 |
| styled-sparse | visitor-stock | 0.7398 | 0.5993–0.7919 |
| styled-sparse | visitor-clone | 0.6922 | 0.5998–0.8629 |
| styled-sparse | visitor-keys | 0.9566 | 0.8963–1.0818 |
| styled-sparse | visitor-generic | 0.7309 | 0.6928–0.8860 |
| i18n-javascript | walker-stock | 1.3820 | 1.3414–1.5307 |
| i18n-javascript | walker-clone | 1.4323 | 1.3119–1.5204 |
| i18n-javascript | visitor-stock | 0.6616 | 0.6194–0.8512 |
| i18n-javascript | visitor-clone | 0.7243 | 0.6062–0.8589 |
| i18n-javascript | visitor-keys | 0.9029 | 0.8591–1.1635 |
| i18n-javascript | visitor-generic | 0.7729 | 0.7328–0.9370 |
| i18n-javascript | walker-keys | 1.5683 | 1.4964–1.7761 |
| i18n-javascript | walker-no-meta-skip | 1.7091 | 1.6185–1.7891 |
| i18n-javascript | walker-fresh-context | 1.4290 | 1.3630–1.5180 |
| i18n-javascript | walker-readonly | 1.3058 | 1.2781–1.4536 |
| i18n-original | walker-stock | 1.1080 | 1.0356–1.1738 |
| i18n-original | walker-clone | 1.0952 | 1.0305–1.1528 |
| i18n-original | visitor-stock | 1.3657 | 1.2976–1.4744 |
| i18n-original | visitor-clone | 1.3812 | 1.3165–1.5156 |
| i18n-original | visitor-keys | 1.6153 | 1.5577–1.7359 |
| i18n-original | visitor-generic | 1.5293 | 1.4592–1.6206 |
| i18n-original | walker-keys | 1.6661 | 1.5872–1.7090 |
| i18n-original | walker-no-meta-skip | 1.1795 | 1.1064–1.2544 |
| i18n-original | walker-fresh-context | 1.1479 | 1.0430–1.1977 |
| i18n-original | walker-readonly | 1.0708 | 0.9983–1.1119 |
| i18n-javascript-compact | walker-stock | 1.0043 | 0.8958–1.0550 |
| i18n-javascript-compact | visitor-stock | 0.5727 | 0.5393–0.6939 |

| Workload | Change | Time delta [95% interval] |
|---|---|---:|
| debugger-dense | Unmodified walker clone | +0.7% [-0.8, +2.3] |
| debugger-dense | Unmodified visitor clone | +0.7% [-2.1, +3.3] |
| debugger-dense | Direct child fields to key loop | +45.0% [+39.3, +49.9] |
| debugger-dense | Typed callbacks to callback for every node | +31.6% [+28.4, +34.4] |
| debugger-dense | for-in to Object.keys | +51.1% [+49.5, +52.9] |
| debugger-dense | Stop skipping type/start/end | +5.1% [+3.9, +6.5] |
| debugger-dense | Create callback position object per node | +2.0% [+0.0, +4.6] |
| debugger-dense | Use parent-exit deletion strategy | +24.2% [+22.2, +26.5] |
| debugger-dense | Same parent-exit strategy: walker to visitor | -45.9% [-48.4, -43.2] |
| debugger-dense | Direct baseline: Object.keys to for-in | -22.6% [-23.9, -21.4] |
| debugger-dense | Direct baseline: add metadata/object guards | -36.3% [-37.8, -34.9] |
| debugger-sparse | Unmodified walker clone | +0.8% [-0.1, +1.7] |
| debugger-sparse | Unmodified visitor clone | +0.0% [-4.6, +5.1] |
| debugger-sparse | Direct child fields to key loop | +43.4% [+23.5, +57.0] |
| debugger-sparse | Typed callbacks to callback for every node | +32.3% [+23.1, +39.9] |
| debugger-sparse | for-in to Object.keys | +62.3% [+60.5, +64.1] |
| debugger-sparse | Stop skipping type/start/end | +5.1% [+4.2, +5.9] |
| debugger-sparse | Create callback position object per node | +0.2% [-0.7, +1.1] |
| debugger-sparse | Use parent-exit deletion strategy | +12.6% [+10.9, +15.0] |
| debugger-sparse | Same parent-exit strategy: walker to visitor | -46.4% [-52.0, -38.8] |
| debugger-sparse | Direct baseline: Object.keys to for-in | -22.2% [-24.0, -19.9] |
| debugger-sparse | Direct baseline: add metadata/object guards | -38.5% [-39.9, -37.3] |
| styled-dense | Unmodified walker clone | -0.1% [-5.6, +5.2] |
| styled-dense | Unmodified visitor clone | -3.2% [-5.7, -1.1] |
| styled-dense | Direct child fields to key loop | +35.2% [+30.2, +39.7] |
| styled-dense | Typed callbacks to callback for every node | +20.1% [+15.2, +28.0] |
| styled-sparse | Unmodified walker clone | -1.1% [-3.5, +1.2] |
| styled-sparse | Unmodified visitor clone | +0.9% [-6.2, +8.0] |
| styled-sparse | Direct child fields to key loop | +36.4% [+24.4, +46.2] |
| styled-sparse | Typed callbacks to callback for every node | +6.7% [+0.6, +12.0] |
| i18n-javascript | Unmodified walker clone | +1.1% [-1.4, +4.0] |
| i18n-javascript | Unmodified visitor clone | +5.2% [-0.7, +13.9] |
| i18n-javascript | Direct child fields to key loop | +33.2% [+28.3, +38.0] |
| i18n-javascript | Typed callbacks to callback for every node | +11.9% [+7.6, +16.3] |
| i18n-javascript | for-in to Object.keys | +12.4% [+8.7, +16.3] |
| i18n-javascript | Stop skipping type/start/end | +19.6% [+17.0, +21.9] |
| i18n-javascript | Create callback position object per node | +0.8% [-2.1, +4.0] |
| i18n-javascript | Remove unused edit flag handling (read-only only) | -5.5% [-8.1, -3.0] |
| i18n-original | Unmodified walker clone | -0.8% [-1.8, +0.0] |
| i18n-original | Unmodified visitor clone | +1.8% [-1.7, +6.9] |
| i18n-original | Direct child fields to key loop | +16.8% [+12.6, +20.3] |
| i18n-original | Typed callbacks to callback for every node | +10.2% [+7.7, +12.8] |
| i18n-original | for-in to Object.keys | +50.7% [+48.0, +54.7] |
| i18n-original | Stop skipping type/start/end | +8.4% [+6.1, +10.8] |
| i18n-original | Create callback position object per node | +3.1% [+0.7, +6.2] |
| i18n-original | Remove unused edit flag handling (read-only only) | -3.4% [-5.4, -0.8] |
| i18n-javascript | Parse same JS without loc/range | -30.8% [-33.1, -28.0] |
| i18n-javascript | Parse same JS without loc/range | -13.7% [-19.2, -7.6] |

### Cloned parser output

| Workload | Variant | Median ms | Process min–max |
|---|---|---:|---:|
| debugger-dense | walker-stock | 0.2834 | 0.2763–0.3205 |
| debugger-dense | walker-clone | 0.2848 | 0.2806–0.3294 |
| debugger-dense | visitor-stock | 0.3848 | 0.3599–0.4837 |
| debugger-dense | visitor-clone | 0.3839 | 0.3640–0.4784 |
| debugger-dense | visitor-keys | 0.4541 | 0.4340–0.5731 |
| debugger-dense | visitor-generic | 0.5032 | 0.4944–0.5821 |
| debugger-dense | walker-keys | 0.4047 | 0.4020–0.4368 |
| debugger-dense | walker-no-meta-skip | 0.2924 | 0.2892–0.3143 |
| debugger-dense | walker-fresh-context | 0.2873 | 0.2827–0.3126 |
| debugger-dense | walker-parent-exit | 0.4554 | 0.4406–0.4669 |
| debugger-dense | direct-stock | 0.6270 | 0.6180–0.6637 |
| debugger-dense | direct-for-in | 0.4850 | 0.4650–0.5143 |
| debugger-dense | direct-guarded | 0.3194 | 0.3146–0.3431 |
| debugger-sparse | walker-stock | 0.6673 | 0.6444–0.6950 |
| debugger-sparse | walker-clone | 0.6651 | 0.6522–0.6901 |
| debugger-sparse | visitor-stock | 0.7357 | 0.7119–0.7851 |
| debugger-sparse | visitor-clone | 0.7324 | 0.7073–0.7753 |
| debugger-sparse | visitor-keys | 0.8734 | 0.8606–0.9227 |
| debugger-sparse | visitor-generic | 1.0088 | 0.9620–1.0292 |
| debugger-sparse | walker-keys | 1.0120 | 0.9959–1.0230 |
| debugger-sparse | walker-no-meta-skip | 0.6934 | 0.6813–0.7125 |
| debugger-sparse | walker-fresh-context | 0.6813 | 0.6652–0.6941 |
| debugger-sparse | walker-parent-exit | 0.9784 | 0.9588–1.0098 |
| debugger-sparse | direct-stock | 1.6971 | 1.6429–1.7836 |
| debugger-sparse | direct-for-in | 1.3180 | 1.2541–1.3634 |
| debugger-sparse | direct-guarded | 0.8441 | 0.8195–0.8692 |
| styled-dense | walker-stock | 0.7418 | 0.7320–0.7630 |
| styled-dense | walker-clone | 0.7470 | 0.7284–0.7868 |
| styled-dense | visitor-stock | 0.9142 | 0.8751–1.0580 |
| styled-dense | visitor-clone | 0.9138 | 0.8870–0.9523 |
| styled-dense | visitor-keys | 1.0152 | 0.9984–1.1418 |
| styled-dense | visitor-generic | 0.9724 | 0.9469–1.0458 |
| styled-sparse | walker-stock | 1.2400 | 1.2307–1.2531 |
| styled-sparse | walker-clone | 1.2402 | 1.2139–1.2912 |
| styled-sparse | visitor-stock | 1.2443 | 1.2132–1.3266 |
| styled-sparse | visitor-clone | 1.2472 | 1.2288–1.4190 |
| styled-sparse | visitor-keys | 1.5141 | 1.4726–1.8013 |
| styled-sparse | visitor-generic | 1.3544 | 1.3289–1.4928 |
| i18n-javascript | walker-stock | 1.1470 | 1.1204–1.2528 |
| i18n-javascript | visitor-stock | 1.2892 | 1.2610–1.4042 |

| Workload | Change | Time delta [95% interval] |
|---|---|---:|
| debugger-dense | Unmodified walker clone | +0.8% [-0.3, +2.0] |
| debugger-dense | Unmodified visitor clone | +0.6% [-0.8, +2.7] |
| debugger-dense | Direct child fields to key loop | +17.6% [+13.1, +21.0] |
| debugger-dense | Typed callbacks to callback for every node | +30.9% [+25.4, +34.7] |
| debugger-dense | for-in to Object.keys | +41.1% [+37.8, +43.6] |
| debugger-dense | Stop skipping type/start/end | +1.6% [-0.6, +3.1] |
| debugger-dense | Create callback position object per node | -0.1% [-2.1, +1.6] |
| debugger-dense | Use parent-exit deletion strategy | +57.3% [+52.7, +61.2] |
| debugger-dense | Same parent-exit strategy: walker to visitor | -12.9% [-17.6, -6.9] |
| debugger-dense | Direct baseline: Object.keys to for-in | -23.1% [-24.4, -21.7] |
| debugger-dense | Direct baseline: add metadata/object guards | -33.6% [-34.9, -32.4] |
| debugger-sparse | Unmodified walker clone | +0.3% [-1.5, +2.7] |
| debugger-sparse | Unmodified visitor clone | +0.0% [-1.0, +1.1] |
| debugger-sparse | Direct child fields to key loop | +19.4% [+17.5, +21.0] |
| debugger-sparse | Typed callbacks to callback for every node | +35.7% [+33.2, +38.1] |
| debugger-sparse | for-in to Object.keys | +50.5% [+47.7, +53.0] |
| debugger-sparse | Stop skipping type/start/end | +3.8% [+2.2, +5.0] |
| debugger-sparse | Create callback position object per node | +1.5% [-0.1, +2.7] |
| debugger-sparse | Use parent-exit deletion strategy | +46.7% [+45.1, +48.2] |
| debugger-sparse | Same parent-exit strategy: walker to visitor | -24.7% [-26.2, -23.3] |
| debugger-sparse | Direct baseline: Object.keys to for-in | -23.4% [-25.7, -21.5] |
| debugger-sparse | Direct baseline: add metadata/object guards | -35.5% [-37.1, -33.7] |
| styled-dense | Unmodified walker clone | +1.1% [-1.1, +3.6] |
| styled-dense | Unmodified visitor clone | -2.1% [-5.5, +0.9] |
| styled-dense | Direct child fields to key loop | +13.0% [+10.0, +16.8] |
| styled-dense | Typed callbacks to callback for every node | +6.6% [+4.9, +8.8] |
| styled-sparse | Unmodified walker clone | +0.1% [-1.0, +1.3] |
| styled-sparse | Unmodified visitor clone | +1.8% [+0.2, +3.7] |
| styled-sparse | Direct child fields to key loop | +22.4% [+16.3, +30.6] |
| styled-sparse | Typed callbacks to callback for every node | +8.1% [+6.7, +9.7] |

## String representation controls

| Workload | API | Preparation | Median ms | Process min–max |
|---|---|---|---:|---:|
| debugger-sparse | walker-stock | parsed | 0.5604 | 0.5517–0.5889 |
| debugger-sparse | walker-stock | cloned | 0.6051 | 0.5962–0.6554 |
| debugger-sparse | walker-stock | interned | 0.5844 | 0.5734–0.6432 |
| debugger-sparse | walker-stock | self-assigned | 0.6138 | 0.5855–0.6704 |
| debugger-sparse | visitor-stock | parsed | 0.3033 | 0.2886–0.3426 |
| debugger-sparse | visitor-stock | cloned | 0.6602 | 0.6417–0.8314 |
| debugger-sparse | visitor-stock | interned | 0.5838 | 0.5622–0.8461 |
| debugger-sparse | visitor-stock | self-assigned | 0.6755 | 0.6281–0.7397 |
| styled-sparse | walker-stock | parsed | 1.0325 | 1.0206–1.0871 |
| styled-sparse | walker-stock | cloned | 1.1575 | 1.1316–1.2015 |
| styled-sparse | walker-stock | interned | 1.1228 | 1.0778–1.2282 |
| styled-sparse | walker-stock | self-assigned | 1.1730 | 1.1091–1.2162 |
| styled-sparse | visitor-stock | parsed | 0.7258 | 0.6304–0.7659 |
| styled-sparse | visitor-stock | cloned | 1.1865 | 1.1309–1.3162 |
| styled-sparse | visitor-stock | interned | 1.4344 | 1.2633–1.5803 |
| styled-sparse | visitor-stock | self-assigned | 1.1789 | 1.1085–1.3539 |
| i18n-javascript | walker-stock | parsed | 1.4135 | 1.3723–1.5964 |
| i18n-javascript | walker-stock | cloned | 1.1459 | 1.1237–1.2183 |
| i18n-javascript | walker-stock | interned | 1.1325 | 1.0961–1.1870 |
| i18n-javascript | walker-stock | self-assigned | 1.1837 | 1.0808–1.2253 |
| i18n-javascript | visitor-stock | parsed | 0.7248 | 0.6597–0.9063 |
| i18n-javascript | visitor-stock | cloned | 1.3587 | 1.2817–1.5606 |
| i18n-javascript | visitor-stock | interned | 1.3585 | 1.2504–1.6113 |
| i18n-javascript | visitor-stock | self-assigned | 1.3259 | 1.2834–1.5716 |
| i18n-original | walker-stock | parsed | 1.1026 | 1.0331–1.1206 |
| i18n-original | walker-stock | cloned | 1.0520 | 0.9688–1.1128 |
| i18n-original | walker-stock | interned | 1.0646 | 0.9643–1.1122 |
| i18n-original | walker-stock | self-assigned | 1.0619 | 0.9619–1.1140 |
| i18n-original | visitor-stock | parsed | 1.3804 | 1.3186–1.4355 |
| i18n-original | visitor-stock | cloned | 1.2990 | 1.2784–1.4374 |
| i18n-original | visitor-stock | interned | 0.8065 | 0.7496–0.8582 |
| i18n-original | visitor-stock | self-assigned | 1.4210 | 1.2922–1.4626 |

| Workload | API | Change | Time delta [95% interval] |
|---|---|---|---:|
| debugger-sparse | walker-stock | parsed → cloned | +9.1% [+7.4, +10.9] |
| debugger-sparse | walker-stock | cloned → interned | -2.6% [-4.0, -0.7] |
| debugger-sparse | walker-stock | cloned → self-assigned | -0.2% [-3.3, +3.6] |
| debugger-sparse | visitor-stock | parsed → cloned | +125.9% [+115.5, +139.8] |
| debugger-sparse | visitor-stock | cloned → interned | -8.3% [-12.1, -3.8] |
| debugger-sparse | visitor-stock | cloned → self-assigned | -0.9% [-5.0, +2.6] |
| styled-sparse | walker-stock | parsed → cloned | +11.0% [+9.2, +13.2] |
| styled-sparse | walker-stock | cloned → interned | -1.8% [-4.7, +1.5] |
| styled-sparse | walker-stock | cloned → self-assigned | +0.6% [-1.8, +3.3] |
| styled-sparse | visitor-stock | parsed → cloned | +69.7% [+63.2, +76.2] |
| styled-sparse | visitor-stock | cloned → interned | +20.9% [+14.2, +28.1] |
| styled-sparse | visitor-stock | cloned → self-assigned | +1.3% [-5.1, +8.2] |
| i18n-javascript | walker-stock | parsed → cloned | -19.5% [-21.4, -17.7] |
| i18n-javascript | walker-stock | cloned → interned | -2.0% [-3.9, -0.1] |
| i18n-javascript | walker-stock | cloned → self-assigned | +0.8% [-2.8, +3.5] |
| i18n-javascript | visitor-stock | parsed → cloned | +86.1% [+69.7, +103.5] |
| i18n-javascript | visitor-stock | cloned → interned | -1.9% [-4.8, +0.9] |
| i18n-javascript | visitor-stock | cloned → self-assigned | -1.0% [-2.5, +0.5] |
| i18n-original | walker-stock | parsed → cloned | -4.4% [-5.7, -2.5] |
| i18n-original | walker-stock | cloned → interned | +1.7% [+0.6, +2.7] |
| i18n-original | walker-stock | cloned → self-assigned | +2.2% [+0.2, +4.0] |
| i18n-original | visitor-stock | parsed → cloned | -2.2% [-4.7, +0.3] |
| i18n-original | visitor-stock | cloned → interned | -39.8% [-41.7, -37.5] |
| i18n-original | visitor-stock | cloned → self-assigned | +2.8% [+0.8, +5.6] |
