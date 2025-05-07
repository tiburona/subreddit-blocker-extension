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
```
.
├── README.md
├── eslint.config.js
├── jest.config.mjs
├── package-lock.json
├── package.json
├── src
│   ├── __tests__
│   ├── background.ts
│   ├── gmail.ts
│   ├── popup.ts
│   ├── reddit.ts
│   └── utils.ts
├── static
│   ├── icons
│   ├── manifest.json
│   └── popup.html
├── tsconfig.json
├── tsconfig.test.json
└── webpack.config.js
```

## Usage
	1.	Click the extension icon.
	2.	Type a subreddit (omit r/) → Add.
	3.	Click ❌ to remove.

    Matches are case-insensitive & exact string.

## Contributing

PRs welcome.
Licensed under MIT.