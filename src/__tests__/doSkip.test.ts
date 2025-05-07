import { doSkip } from '../utils';
import { makeOuterTableFixture } from './fixtures';

describe('doSkip', () => {

  it('skips when parent is in matched', () => {
        const { tr1, parentTr } = makeOuterTableFixture();
        const matched = new WeakSet<HTMLElement>([parentTr]);
        expect(doSkip(tr1, matched)).toBe(true);
      });

  it('does not skip when matched is empty', () => {
    const { tr1 } = makeOuterTableFixture();
    const matched = new WeakSet<HTMLElement>();
    expect(doSkip(tr1, matched)).toBe(false);
  });

  it('does not skip when node has no parent', () => {
    const orphan = document.createElement('tr');
    const matched = new WeakSet<HTMLElement>();
    expect(doSkip(orphan, matched)).toBe(false);
  });

  it('skips when parent of parent is in matched', () => {
    const { tr1, outerTbody } = makeOuterTableFixture();
    const matched = new WeakSet<HTMLElement>([outerTbody]);
    expect(doSkip(tr1, matched)).toBe(true);
  });

  it('does not skip just because it is in matched', () => {
    const { tr1 } = makeOuterTableFixture();
    const matched = new WeakSet<HTMLElement>([tr1]);
    expect(doSkip(tr1, matched)).toBe(false);
  });
});
