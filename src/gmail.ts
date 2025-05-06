(async function () {
    

    const { blockedSubreddits } = await chrome.storage.sync.get(['blockedSubreddits']);
    if (!blockedSubreddits) return;

  
    let blocked: string[] = (blockedSubreddits as string[]).map(s => s.toLowerCase());

    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "sync" && changes.blockedSubreddits) {
            console.log("🔄 blockedSubreddits changed:", changes.blockedSubreddits.newValue);
            blocked = (changes.blockedSubreddits.newValue as string[]).map(s => s.toLowerCase());
        }
    })

    const processed = new WeakSet<HTMLElement>();

    const observer = new MutationObserver(()=> {
        const trs = document.querySelectorAll('tr');
        trs.forEach(tr => {
            if (processed.has(tr)) return;
            handleTr(tr, processed);
        })
    })

    observer.observe(document.body, {childList: true, subtree: true});

    function doSkip(tr: HTMLTableRowElement, matchedTrs: WeakSet<HTMLElement>): boolean {
        let ancestor = tr.parentElement;
        let skip = false;
        while (ancestor) {
          if (matchedTrs.has(ancestor as HTMLElement)) {
            skip = true;
            break;
          }
          ancestor = ancestor.parentElement
          }
        return skip
        }

    function handleTr(tr: HTMLTableRowElement, processedTrs: WeakSet<HTMLElement>): void {
   
        if (doSkip(tr, processedTrs)) return;
  
        if (!isRedditLike(tr)) {
            processedTrs.add(tr);
            return;
        }
  
        if (siblingsAreRedditLike(tr)) {
            processedTrs.add(tr);
    
            const subredditMatches = tr.innerText.match(/r\/[a-zA-Z0-9_]+/g) || [];
            const matched = subredditMatches.find(sub =>
            blocked.some(
                blockedName => blockedName === sub.replace(/^r\//, '').toLowerCase()
            )
            );
    
            if (matched) {
                tr.remove();
            }
        }
        };


function isRedditLike(tr: HTMLTableRowElement): boolean {
    const text = tr.innerText.toLowerCase();
 
    return (
      text.includes("r/") &&
      (text.includes("upvotes") || text.includes("votes")) &&
      text.includes("comment")
    );
  }

function siblingsAreRedditLike(tr: HTMLTableRowElement): boolean {
    const parent = tr.parentElement;
    if (!parent) return false;

    const siblingTrs = Array.from(parent.children).filter(
        el => el.tagName === "TR"
    ) as HTMLTableRowElement[];

    const countMatching = siblingTrs.filter(isRedditLike).length

    return countMatching >= 2
  }
})();

