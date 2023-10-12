/* eslint-disable no-console */
export const handler = async (event, context) => {
  try {
    console.log('Requesting cds-adoption');
    const { status, statusText } = await fetch('https://cds-adoption.cbhq.net/sync');
    if (status === 200) console.log('Successfully started cds-adoption');
    else
      throw Error(
        `Failed to start cds-adoption with status ${status} and status text "${statusText}"`,
      );
    return context.logStreamName;
  } catch (error) {
    console.error(error);
    return 500;
  }
};
