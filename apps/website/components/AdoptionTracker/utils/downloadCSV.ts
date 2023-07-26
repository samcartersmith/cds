import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

export function downloadCSV(csvData: string, fileName: string) {
  // Creating a Blob for having a csv file format
  // and passing the data with type
  const blob = new Blob([csvData], { type: 'text/csv' });

  // Creating an object for downloading url
  const url = getBrowserGlobals()?.window.URL.createObjectURL(blob);

  // Creating an anchor(a) tag of HTML
  const a = getBrowserGlobals()?.document.createElement('a');

  if (a) {
    // Passing the blob downloading url
    a.setAttribute('href', url ?? '');

    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', fileName);

    // Performing a download with click
    a.click();
  }
}
