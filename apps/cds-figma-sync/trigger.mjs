/* eslint-disable no-console */
export const handler = async (event, context) => {
  try {
    console.log('Requesting cds-figma-sync');
    const { status, statusText } = await fetch('https://cds-figma-sync.cbhq.net/sync');
    if (status === 200) console.log('Successfully started cds-figma-sync');
    else
      throw Error(
        `Failed to start cds-figma-sync with status ${status} and status text "${statusText}"`,
      );
    return context.logStreamName;
  } catch (error) {
    console.error(error);
    return 500;
  }
};
