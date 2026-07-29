# Typeflow docs

Documentation for [Typeflow](https://github.com/typeflow/typeflow), built
with VitePress. Deployed to
[typeflow.github.io/docs](https://typeflow.github.io/docs/).

The full interactive playground lives in its own repo/deploy —
[`typeflow/playground`](https://github.com/typeflow/playground),
[typeflow.github.io/playground](https://typeflow.github.io/playground/) —
linked to from the nav and every doc page's inline `MiniPlayground`
("Playground ↗"). This repo keeps its own `MiniPlayground` component for
those inline `::: playground` examples, sharing `CodeEditor.vue`,
`highlight.ts`, `share.ts`, `demo-functions.ts` with the standalone
playground repo (kept in sync by hand).

Reference pages (`operators/`, `functions/`, `reference/diagnostics.md`,
and their `fr/` counterparts) are generated, not hand-written — see
`scripts/generate-docs.ts`. Nothing under those directories should be
edited directly; regenerate with `bun run gen`.

## Development

```console
$ bun install
$ bun run dev     # VitePress dev server
$ bun run build   # generate reference pages + build the static site
$ bun run preview # preview a production build
```

`MiniPlayground` and `Benchmark`, and `scripts/generate-docs.ts`'s
diagnostic-code consistency check, depend on `typeflowjs` as a real npm
package (including its `src/` for that check — see the package's `files`
field) rather than reaching into the compiler's monorepo directly, since
this repo has no source of its own beyond the docs site.

## Layout

| Path                    | Role                                                     |
| ----------------------- | --------------------------------------------------------- |
| `*.md`, `fr/*.md`       | Hand-written pages (guide, home, benchmark)             |
| `.vitepress/`           | VitePress config and theme (MiniPlayground, Benchmark, …) |
| `scripts/generate-docs.ts` | Generates `operators/`, `functions/`, `reference/` from typeflowjs's builtins and diagnostics |
| `scripts/doc-pages/`    | Hand-written operator docs + French translations, consumed by the generator |
| `scripts/bench-scenarios.ts` | Scenarios shown on the `/benchmark` page (kept in sync with the same file in the main repo) |
