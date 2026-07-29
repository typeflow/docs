# Typeflow docs

Documentation and interactive playground for
[Typeflow](https://github.com/typeflow/typeflow), built with VitePress.
Deployed to [typeflow.github.io/docs](https://typeflow.github.io/docs/).

Reference pages (`operators/`, `functions/`, `reference/diagnostics.md`,
and their `fr/` counterparts) are generated, not hand-written — see
`scripts/generate-docs.ts`. Nothing under those directories should be
edited directly; regenerate with `bun run gen`.

## Development

```console
$ bun install
$ bun run dev     # docs + playground (VitePress dev server)
$ bun run build   # generate reference pages + build the static site
$ bun run preview # preview a production build
```

The Playground and Benchmark components, and `scripts/generate-docs.ts`'s
diagnostic-code consistency check, depend on `typeflowjs` as a real npm
package (including its `src/` for that check — see the package's `files`
field) rather than reaching into the compiler's monorepo directly, since
this repo has no source of its own beyond the docs site.

## Layout

| Path                    | Role                                                     |
| ----------------------- | --------------------------------------------------------- |
| `*.md`, `fr/*.md`       | Hand-written pages (guide, home, playground, benchmark) |
| `.vitepress/`           | VitePress config and theme (Playground, Benchmark, …)   |
| `scripts/generate-docs.ts` | Generates `operators/`, `functions/`, `reference/` from typeflowjs's builtins and diagnostics |
| `scripts/doc-pages/`    | Hand-written operator docs + French translations, consumed by the generator |
| `scripts/bench-scenarios.ts` | Scenarios shown on the `/benchmark` page (kept in sync with the same file in the main repo) |
