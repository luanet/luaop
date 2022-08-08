# Lua Desktop

[![Build Status](https://jenkins.lisk.com/buildStatus/icon?job=lisk-desktop/development)](https://jenkins.lisk.com/job/lisk-desktop/job/development)
[![Coverage Status](https://coveralls.io/repos/github/LiskHQ/lisk-desktop/badge.svg?branch=development)](https://coveralls.io/github/LiskHQ/lisk-desktop?branch=development)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
![GitHub package.json version](https://img.shields.io/github/package-json/v/LiskHQ/lisk-desktop)
[![DeepScan grade](https://deepscan.io/api/teams/6759/projects/8871/branches/113511/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=6759&pid=8871&bid=113511)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
![Discord](https://img.shields.io/discord/405002561775599619)
[![GitHub issues](https://img.shields.io/github/issues/LiskHQ/lisk-desktop)](https://github.com/LiskHQ/lisk-desktop/issues)
![GitHub closed issues](https://img.shields.io/github/issues-closed/liskhq/lisk-desktop)

![image](https://user-images.githubusercontent.com/106291312/183366206-0ced252b-a553-4125-9dde-79b6ebd9b270.png)

## Installation

You can download the latest release from [Luanet.io](https://luanet.io/gui). The link automatically detects your operating system and downloads the correct app. Currently we are supporting the following operating systems:

- MacOS (individual builds for Apple Silicon and Intel chips)
- Windows
- Linux

## For Contributors
Please see [CONTRIBUTING_GUIDE.md](/docs/CONTRIBUTING_GUIDE.md) for more information.

## Development

### Using Commercial Fonts
`Basier Circle` and `Gilroy` used in the production version are commercial fonts. This repository only contains open fonts and uses `Open Sans` as a replacement for the commercial ones.

If you have licensed copies of `Basier Circle` and `Gilroy`, you can add them to [fonts folder](./src/assets/fonts). If you don't have the fonts, you need to remove lines 25 - 81 of [type.css](./src/components/app/type.css). After that, the `build` and `dev` npm scripts run without any errors.

### Setup environment

The development environment currently depends on [Node.js version 16 (lts/gallium)](https://nodejs.org/download/release/latest-v16.x/). The below instructions assume [nvm](https://github.com/nvm-sh/nvm) is being used to manage Node.js versions.

*Note*:
For *Windows* users, make sure to set the correct [msvs_version](https://www.npmjs.com/package/node-gyp#on-windows) config for installing and packing the Lua Desktop application.

```
git clone https://github.com/luanet/luaop.git
cd luaop
nvm install lts/erbium
npm ci
npm run dev
```

### Run on browser

Open http://localhost:8080

If you are actively developing in a specific route, and want to be automatically signed in every time you reload the page, please add the following input pairs to your localStorage:

_loginKey_: _a valid passphrase_

Add the above pair using the storage tab in your dev tools or via JavaScript command:

```
localStorage.setItem('loginKey', 'wagon stock borrow episode laundry kitten salute link globe zero feed marble') // desired account passphrase
```


When developing with hardware wallet, this will sign you in using the first account on the first connected hardware wallet:
```
localStorage.setItem('hwWalletAutoLogin', true);
```
You can use the same approach to define a desired network to which Lisk Desktop connects:

```
localStorage.setItem('liskServiceUrl', 'http://localhost:4000') // desired node to log in into
```

### Build

#### Production build

To build the project simply run

```
npm run build
```
Under the hood, this script runs

```
npm run build:prod
```
to build the React app under `src/` and

```
npm run build:electron
```
to build the electron app under `app/` using webpack. You can run the above scripts individually if you're looking to see the changes solely on one of the two said applications.


### Run Electron
If you have already built the application as described above, you can launch Electron using

```
npm run start
```

### Distribution

#### Windows

Build package for Windows (on Windows in [Git BASH](https://git-for-windows.github.io/)).

```
npm run pack:win
```

#### macOS

Build package for macOS (on macOs)

```
npm run pack
```

#### Linux

Build package for Linux (on Linux).

```
npm run pack
```

## Testing

### Unit tests

#### Single run
```
npm run test
```

#### Run each time a file changes
```
npm run test:live
```

### E2E tests
In order to run e2e tests you need to install [lisk-core](https://github.com/LiskHQ/lisk-core) as well as [lisk-service](https://github.com/LiskHQ/lisk-service).

#### Run

Start the development version of Lisk:
```
npm run dev
```
Apply blockchain snapshot

```
./test/e2e-test-setup.sh ~/git/lisk/
```

(replace `~/git/lisk/` with your path to lisk core)

Run e2e tests
```
npm run cypress:run
```

### React Storybook

To launch storybook sandbox with components run
```
npm run storybook
```
and navigate to

http://localhost:6006/

## License

Copyright © 2022 Lua Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the [GNU General Public License](https://github.com/LiskHQ/lisk-desktop/tree/master/LICENSE) along with this program.  If not, see <http://www.gnu.org/licenses/>.
