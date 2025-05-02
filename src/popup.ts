console.log("loaded")

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("subreddit") as HTMLInputElement;
    const addButton = document.getElementById("add") as HTMLButtonElement;
    const list = document.getElementById("subreddit-list") as HTMLUListElement;
    const status = document.getElementById("status") as HTMLParagraphElement;

    function flash(message: string) {
        status.textContent = message;
        setTimeout(() => (status.textContent = ""), 1000)
    }

    function renderSubreddits(subreddits: string[]) {
        list.innerHTML = "";
        for (const subreddit of subreddits) {
            const li = document.createElement("li");
            li.textContent = subreddit;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "❌";
            removeBtn.addEventListener("click", () => {
                const updated = subreddits.filter(s => s != subreddit);
                chrome.storage.sync.set({ blockedSubreddits: updated}, () => {
                    renderSubreddits(updated);
                    flash("Removed");
                });
            });

            li.appendChild(removeBtn);
            list.appendChild(li);
        }
    }

    chrome.storage.sync.get("blockedSubreddits", (result) => {
        const subreddits = (result.blockedSubreddits as string[]) || [];
        renderSubreddits(subreddits);
    });

    addButton.addEventListener("click", () => {
        const newSubreddit = input.value.trim().toLowerCase();
        if (!newSubreddit) return;

        chrome.storage.sync.get("blockedSubreddits", (result) => {
            const subreddits = (result.blockedSubreddits as string[]) || [];
            if (subreddits.includes(newSubreddit)) {
                flash("Already added");
                return;
            }

            const updated = [...subreddits, newSubreddit];
            chrome.storage.sync.set({ blockedSubreddits:updated}, () => {
                renderSubreddits(updated);
                input.value = "";
                flash("Added");
            });
        });
    });
});
