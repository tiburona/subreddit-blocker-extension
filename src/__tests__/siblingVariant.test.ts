import { isRedditLike, siblingsAreRedditLike } from '../utils';
import { makeSiblingVariantFixture } from './fixtures';

describe('isRedditLike and siblingsAreRedditLike', () => {
  const { rlHas, rlNo, nonRlHas, nonRlNo } = makeSiblingVariantFixture();

  it('should return true for both checks when a reddit-like row has reddit-like siblings', () => {
    expect(isRedditLike(rlHas)).toBe(true);
    expect(siblingsAreRedditLike(rlHas)).toBe(true);
  });

  it('should return true for self but false for sibling check when a reddit-like row lacks reddit siblings', () => {
    expect(isRedditLike(rlNo)).toBe(true);
    expect(siblingsAreRedditLike(rlNo)).toBe(false);
  });

  it('should return false for self but true for sibling check when a non-reddit row has reddit-like siblings', () => {
    expect(isRedditLike(nonRlHas)).toBe(false);
    expect(siblingsAreRedditLike(nonRlHas)).toBe(true);
  });

  it('should return false for both checks when a non-reddit row lacks reddit-like siblings', () => {
    expect(isRedditLike(nonRlNo)).toBe(false);
    expect(siblingsAreRedditLike(nonRlNo)).toBe(false);
  });
});
