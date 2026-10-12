# Source attribution

The generated Yuku variants derive from `yuku-ast@0.18.0`, published by the [Yuku project](https://github.com/yuku-toolchain/yuku). Its MIT license is retained in [YUKU-LICENSE](YUKU-LICENSE). The generated child-field functions derive from that package's `CHILD_KEYS` schema.

The Acorn experiments call the installed `acorn-walk@8.3.5` API. They do not vendor or modify its package. Original source hashes, generated source hashes, dependency versions and measured input hashes accompany the results.

These read-only experimental variants intentionally support a narrower callback contract than the public Yuku API. They are not proposed production replacements.

The historical Acorn overrides are frozen in `acorn-base-historical.mjs` from benchmark commit `8e6cf8a`. The main i18n suite now fixes static destructuring-key collection; the historical study continues to use its measured behavior.
