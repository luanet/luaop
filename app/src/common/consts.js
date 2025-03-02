import os from 'os'
import packageJson from '../../package.json'

export const IS_MAC = os.platform() === 'darwin';
export const IS_WIN = os.platform() === 'win32';
export const IS_APPIMAGE = typeof process.env.APPIMAGE !== 'undefined';
export const VERSION = packageJson.version;
export const ELECTRON_VERSION = process.versions.electron;
export const GO_IPFS_VERSION = packageJson.dependencies['go-ipfs'];
export const COUNTLY_KEY = process.env.NODE_ENV === 'development'
  ? '6b00e04fa5370b1ce361d2f24a09c74254eee382'
  : '47fbb3db3426d2ae32b3b65fe40c564063d8b55d';
