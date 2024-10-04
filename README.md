# AlleHelper

## Description
Simple QoL extension for a polish auction site, with Chrome API and TypeScript.

## Build
Requires Node.js.

```
git clone https://github.com/MariaWasNotAvailable/allehelper.git
cd allehelper
npm install
npm run build
```

## Installation
Drag and drop the ```allehelper-unpacked``` folder (either built from source as described above, or extacted from the ```allehelper-unpacked.zip``` package) onto the browser extension tab (```chrome://extensions/```). Might require turning "developer mode" on in the upper right corner. Should work with all Chromium-based browsers including Google Chrome itself.

## Features
* sums prices of all visible favorited items (```/zakupy/obserwowane/ulubione``` / ```/zakupy/obserwowane/oferty```)
* automatically marks invalid inputs on pros-cons in item reviews
* allows to disable animations (selectable in the extension options; requires refreshing the site)

## Planned features
* add support for more than one set of pros-cons fields at once
* make everything togglable
* add more counters/adders
* add configurable padding and margin manipulation
* improve animation disabler