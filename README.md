[![CodeQL](https://github.com/erffy/erfevents/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/erffy/erfevents/actions/workflows/github-code-scanning/codeql)

## erfevents
- A powerful EventEmitter module based on Map and Set.

### Features
- 🚀 High Performance: Designed for speed and efficiency in event management.
- 🛠️ Easy to Use: Provides intuitive methods for adding, removing, and emitting events.
- 🖥️ Versatile Compatibility: Supports ESM and CJS, ensuring seamless integration with modern JavaScript environments.

### Installation
```sh
npm install erffy/erfevents
pnpm add erffy/erfevents
yarn add erffy/erfevents
bun add erffy/erfevents
```

### Usage
```js
// TypeScript / ESM
import EventEmitter from 'erfevents';
//

// CJS
const EventEmitter = require('erfevents').default;
//

const ee = new EventEmitter();

ee.on('test', console.log);
ee.emit('test');

ee.on('limitedRun', console.log, 3); // Only emit 3 times
for (let i = 0; i < 5; i++) ee.emit('limitedRun', i);
//

ee.once('runOnce', console.log);
// or
ee.on('runOnce', console.log, 1);

//
function seeDetails() {
  console.log('Hello')
}

ee.on('see', seeDetails);
ee.emit('see', 'test');

console.log(seeDetails.emitLimit);
console.log(seeDetails.emitTimes);
console.log(seeDetails.emitted); // or ee.isEmitted(seeDetails)
```

<br>

[![Alt](https://repobeats.axiom.co/api/embed/7fd6fff744f52025aa6b5218d6c6e8f638c13aa4.svg)](https://github.com/erffy/erfevents)
