import './tokens.css';
import './custom.css';
import Benchmark from './Benchmark.vue';
import DefaultTheme from 'vitepress/theme';
import FnIndex from './FnIndex.vue';
import FnSignature from './FnSignature.vue';
import HomeStats from './HomeStats.vue';
import MiniPlayground from './MiniPlayground.vue';
import { type Theme } from 'vitepress';

// Links to typeflow/playground are full URLs (see PLAYGROUND_SITE in
// config.mts — a bare path would get base-prefixed to '/docs/playground/'
// by VitePress's own link normalizer). Being a full URL makes VitePress
// treat it as external and add target="_blank"; since it's actually the
// same origin (typeflow.github.io) at runtime, open it in the same tab
// instead. Intercepted at click time (capture phase, before the browser
// acts on target="_blank") rather than patched on mount/navigation, so it
// doesn't race Vue's hydration or lazy-loaded route components.
function openCrossSiteLinksInSameTab(e: MouseEvent): void {
  const a = (e.target as HTMLElement | null)?.closest?.(
    'a[target="_blank"]',
  ) as HTMLAnchorElement | null;
  if (a && a.hostname === location.hostname) {
    a.removeAttribute('target');
    a.removeAttribute('rel');
  }
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('MiniPlayground', MiniPlayground);
    app.component('Benchmark', Benchmark);
    app.component('FnIndex', FnIndex);
    app.component('FnSignature', FnSignature);
    app.component('HomeStats', HomeStats);

    if (typeof window !== 'undefined') {
      document.addEventListener('click', openCrossSiteLinksInSameTab, true);

      // Accordion sidebar: on navigation, collapse any open group that
      // doesn't contain the new page. VitePress already auto-opens the
      // group holding the active link (`has-active`), so only the
      // stale ones are closed.
      const previous = router.onAfterRouteChanged;
      router.onAfterRouteChanged = async (to) => {
        await previous?.(to);
        // Wait two frames so the sidebar has re-rendered its `has-active`
        // state before deciding which groups are stale.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const stale = document.querySelectorAll<HTMLElement>(
              '.VPSidebarItem.level-1.collapsible:not(.collapsed):not(.has-active)',
            );
            for (const group of stale) {
              group
                .querySelector<HTMLElement>(':scope > .item > .caret')
                ?.click();
            }
          }),
        );
      };
    }
  },
} satisfies Theme;
