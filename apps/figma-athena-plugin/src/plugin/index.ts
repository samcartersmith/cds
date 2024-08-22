figma.showUI(__html__, {
  width: 500,
  height: 500,
  title: 'Athena',
});

if (figma.editorType === 'dev') {
  // Read the current page and listen to API events
  const numChildren = figma.currentPage.children.length;
  figma.notify(
    `This is running in Dev Mode.
      The current page has ${numChildren} children`,
  );
} else {
  figma.notify(
    `This is NOT running in Dev Mode.
      We can modify the file!`,
  );
}
