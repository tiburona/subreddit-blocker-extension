import { isRedditLike } from '../utils';

const makeRow = (text: string): HTMLTableRowElement => {
  const tr = document.createElement('tr');
  tr.innerText = text;
  return tr as HTMLTableRowElement;
};

describe('isRedditLike', () => {
  it('detects a typical reddit summary row', () => {
    const tr = makeRow('r/AskReddit • 1k upvotes • 200 comments');
    expect(isRedditLike(tr)).toBe(true);
  });

  it('is case-insensitive', () => {
    const tr = makeRow('R/aww • 300 UpVoTeS • 15 coMMeNts');
    expect(isRedditLike(tr)).toBe(true);
  });

  it('requires the r/ prefix', () => {
    const tr = makeRow('aww • 300 upvotes • 15 comments');
    expect(isRedditLike(tr)).toBe(false);
  });

  it('requires the vote keyword', () => {
    const tr = makeRow('r/funny • 200 comments');
    expect(isRedditLike(tr)).toBe(false);
  });

  it('requires the comment keyword', () => {
    const tr = makeRow('r/funny • 1k upvotes');
    expect(isRedditLike(tr)).toBe(false);
  });
});
