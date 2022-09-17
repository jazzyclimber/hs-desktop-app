require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  console.log("INFO: ",`${appOutDir}/${appName}.app`);

  await notarize({
    appBundleId: 'com.hubspotCopilot.*',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
    tool: "notarytool",
    teamId: process.env.TEAM_ID,
  })
  .then(data=> data)
  .catch(err => {
    console.log('err with notarization:', err);
  });
};
