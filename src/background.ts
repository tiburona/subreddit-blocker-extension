chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        blockedSubreddits: ["aitah"]}, () => {
            console.log("Initial blocked subreddits set.")
        }
    )
})