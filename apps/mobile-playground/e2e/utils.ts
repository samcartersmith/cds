export const launchApp = async (permisions: Detox.DevicePermissions = {}) => {
  await device.launchApp({
    newInstance: true,
    permissions: { notifications: 'NO', ...permisions },
    launchArgs: {
      ConnectHardwareKeyboard: 'NO',
    },
  });
};
