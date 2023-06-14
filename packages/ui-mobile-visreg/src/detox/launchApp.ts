export default async function launchApp(permissions: Detox.DevicePermissions = {}) {
  await device.launchApp({
    newInstance: true,
    permissions: { notifications: 'NO', ...permissions },
    launchArgs: {
      ConnectHardwareKeyboard: 'NO',
    },
  });
}
