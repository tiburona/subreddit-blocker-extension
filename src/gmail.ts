import { isRedditLike, siblingsAreRedditLike, doSkip } from './utils';

(async function () {
  const { blockedSubreddits } = await chrome.storage.sync.get(['blockedSubreddits']);
  if (!blockedSubreddits) return;

  let blocked: string[] = (blockedSubreddits as string[]).map((s) => s.toLowerCase());

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.blockedSubreddits) {
      blocked = (changes.blockedSubreddits.newValue as string[]).map((s) => s.toLowerCase());
    }
  });

  const skippable = new WeakSet<HTMLElement>();

  const observer = new MutationObserver(() => {
    const trs = document.querySelectorAll('tr');
    trs.forEach((tr) => {
      if (skippable.has(tr)) return;
      handleTr(tr, skippable);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function handleTr(tr: HTMLTableRowElement, skippableTrs: WeakSet<HTMLElement>): void {
    if (doSkip(tr, skippableTrs)) return;

    // if a tr does not contain any reddit like content in its inner text, none of its
    // children will, it can be skipped
    if (!isRedditLike(tr)) {
      skippableTrs.add(tr);
      return;
    }

    if (siblingsAreRedditLike(tr)) {
      // if we've identified the level at which the sibling trs are reddit posts, no child
      // trs need to be checked

      skippableTrs.add(tr);

      const subredditMatches = tr.innerText.match(/r\/[a-zA-Z0-9_]+/g) || [];
      const matched = subredditMatches.find((sub) =>
        blocked.some((blockedName) => blockedName === sub.replace(/^r\//, '').toLowerCase())
      );

      if (matched) {
        tr.remove();
      }
    }
  }
})();
