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
// same origin (typeflow.github.io) at runtime, strip that back off.
function openCrossSiteLinksInSameTab(): void {
  for (const a of document.querySelectorAll<HTMLAnchorElement>(
    'a[target="_blank"]',
  )) {
    if (a.hostname === location.hostname) {
      a.removeAttribute('target');
      a.removeAttribute('rel');
    }
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
      const previous = router.onAfterRouteChanged;
      router.onAfterRouteChanged = async (to) => {
        await previous?.(to);
        // Wait two frames so the sidebar has re-rendered its `has-active`
        // state before deciding which groups are stale, and so any
        // freshly-mounted hero/nav links exist before we patch them.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            // Accordion sidebar: on navigation, collapse any open group that
            // doesn't contain the new page. VitePress already auto-opens the
            // group holding the active link (`has-active`), so only the
            // stale ones are closed.
            const stale = document.querySelectorAll<HTMLElement>(
              '.VPSidebarItem.level-1.collapsible:not(.collapsed):not(.has-active)',
            );
            for (const group of stale) {
              group
                .querySelector<HTMLElement>(':scope > .item > .caret')
                ?.click();
            }
            openCrossSiteLinksInSameTab();
          }),
        );
      };
      requestAnimationFrame(openCrossSiteLinksInSameTab);
    }
  },
} satisfies Theme;
