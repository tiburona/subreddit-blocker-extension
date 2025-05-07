export function isRedditLike(tr: HTMLTableRowElement): boolean {
  const text = tr.innerText.toLowerCase();
  return (
    text.includes('r/') &&
    (text.includes('upvotes') || text.includes('votes')) &&
    text.includes('comment')
  );
}

export function siblingsAreRedditLike(tr: HTMLTableRowElement): boolean {
  const parent = tr.parentElement;
  if (!parent) return false;

  const trs = Array.from(parent.children).filter(
    (el) => el.tagName === 'TR'
  ) as HTMLTableRowElement[];

  return trs.filter(isRedditLike).length >= 2;
}

export function doSkip(tr: HTMLTableRowElement, matched: WeakSet<HTMLElement>): boolean {
  let node: HTMLElement | null = tr.parentElement;
  while (node) {
    if (matched.has(node)) return true;
    node = node.parentElement;
  }
  return false;
}
