chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        blockedSubreddits: ["AITAH", "Spanish"]}, () => {
            console.log("Initial blocked subreddits set.")
        }
    )
})