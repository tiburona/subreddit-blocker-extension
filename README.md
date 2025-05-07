# Subreddit Blocker

Hide subreddits you never want to see—on Reddit **and** in Gmail digests.

## Features
- Blocks posts on both new and old Reddit.
- Removes Gmail rows that reference blocked subreddits.
- List lives in Chrome Sync → follows you across machines.
- Simple popup to add / remove subreddits.

## Install from source
```bash
git clone https://github.com/your-user/subreddit-blocker-extension.git
cd subreddit-blocker-extension
npm install        # or yarn
npm run build      # outputs to ./dist
```
	1.	Open chrome://extensions
	2.	Enable Developer mode
	3.	Click Load unpacked and select the dist/ folder

## Dev workflow

``npm run watch```      # incremental rebuilds

## Structure

├── src/           # TypeScript sources
│   ├── reddit.ts
│   ├── gmail.ts
│   ├── popup.ts
│   └── background.ts
├── static/        # manifest, icons, raw popup.html
├── dist/          # build output (ignored in Git)
└── webpack.config.js

## Usage
	1.	Click the extension icon.
	2.	Type a subreddit (omit r/) → Add.
	3.	Click ❌ to remove.

    Matches are case-insensitive & exact string.

## Contributing

PRs welcome.
Licensed under MIT.