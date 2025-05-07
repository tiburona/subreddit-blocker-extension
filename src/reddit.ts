(async function () {
  const { blockedSubreddits } = await chrome.storage.sync.get(['blockedSubreddits']);

  if (!blockedSubreddits) return;

  const observer = new MutationObserver(() => {
    removeBlockedSubreddits(blockedSubreddits);
  });

  const target = document.body;

  observer.observe(target, {
    childList: true,
    subtree: true,
  });
})();

function removeBlockedSubreddits(blocked: string[]) {
  const posts = document.querySelectorAll('shreddit-post');
  posts.forEach((post) => {
    const subreddit = post.getAttribute('subreddit-name');
    if (subreddit && blocked.includes(subreddit)) {
      post.remove();
    }
  });
}
