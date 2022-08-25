const { download } = require('go-ipfs');

function getGoOs (platform) {
  switch (platform) {
    case "sunos":
      return "solaris"
    case "win32":
      return "windows"
  }

  return platform
}

function getGoArch (arch) {
  switch (arch) {
    case "ia32":
      return "386"
    case "x64":
      return "amd64"
    case "arm":
      return "arm"
    case "arm64":
      return "arm64"
  }

  return arch
}

exports.default = async function(context) {
  console.log(context);
  await download(undefined, getGoOs(context.platform.nodeName), getGoArch(context.arch), './app/go-ipfs')
}
