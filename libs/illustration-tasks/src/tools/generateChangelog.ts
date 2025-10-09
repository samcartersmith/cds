import type { IllustrationSyncResults } from './Manifest';

const allIllustrationTypes = ['pictogram', 'heroSquare', 'spotIcon', 'spotRectangle', 'spotSquare'];

export const generateChangelog = (syncResults: IllustrationSyncResults) => {
  const changelogEntries = [];

  if (syncResults.newIllustrationSets.length > 0) {
    let changelogEntry = '';
    allIllustrationTypes.forEach((type) => {
      const filteredSyncResults = syncResults.newIllustrationSets.filter(
        (illustrationSet) => illustrationSet.type === type,
      );
      if (filteredSyncResults.length > 0) {
        const typeName = type.charAt(0).toUpperCase() + type.slice(1);
        changelogEntry += `\n\n ###### ${typeName} (${
          filteredSyncResults.length
        })\n\n- ${filteredSyncResults.map((illustrationSet) => illustrationSet.name).join('\n- ')}`;
      }
    });
    changelogEntries.push(
      `\n\n##### ⭐️ Added (${syncResults.newIllustrationSets.length})\n\n${changelogEntry}`,
    );
  }

  if (syncResults.updatedIllustrationSets.length > 0) {
    let changelogEntry = '';
    allIllustrationTypes.forEach((type) => {
      const filteredSyncResults = syncResults.updatedIllustrationSets.filter(
        (illustrationSet) => illustrationSet.type === type,
      );
      if (filteredSyncResults.length > 0) {
        const typeName = type.charAt(0).toUpperCase() + type.slice(1);
        changelogEntry += `\n\n ###### ${typeName} (${
          filteredSyncResults.length
        })\n\n- ${filteredSyncResults.map((illustrationSet) => illustrationSet.name).join('\n- ')}`;
      }
    });
    changelogEntries.push(
      `\n\n##### ⭐️ Updated (${syncResults.updatedIllustrationSets.length})\n\n${changelogEntry}`,
    );
  }

  if (syncResults.renamedIllustrationSets.length > 0) {
    let changelogEntry = '';
    allIllustrationTypes.forEach((type) => {
      const filteredSyncResults = syncResults.renamedIllustrationSets.filter(
        (illustrationSet) => illustrationSet.type === type,
      );
      if (filteredSyncResults.length > 0) {
        const typeName = type.charAt(0).toUpperCase() + type.slice(1);
        changelogEntry += `\n\n ###### ${typeName} (${
          filteredSyncResults.length
        })\n\n- ${filteredSyncResults
          .map((illustrationSet) => `${illustrationSet.oldName} → ${illustrationSet.name}`)
          .join('\n- ')}`;
      }
    });
    changelogEntries.push(
      `\n\n##### ☠️ Renamed (${syncResults.renamedIllustrationSets.length})\n\n${changelogEntry}`,
    );
  }

  if (syncResults.deletedIllustrationSets.length > 0) {
    let changelogEntry = '';
    allIllustrationTypes.forEach((type) => {
      const filteredSyncResults = syncResults.deletedIllustrationSets.filter(
        (illustrationSet) => illustrationSet.type === type,
      );
      if (filteredSyncResults.length > 0) {
        const typeName = type.charAt(0).toUpperCase() + type.slice(1);
        changelogEntry += `\n\n ###### ${typeName} (${
          filteredSyncResults.length
        })\n\n- ${filteredSyncResults.map((illustrationSet) => illustrationSet.name).join('\n- ')}`;
      }
    });
    changelogEntries.push(
      `\n\n##### ☠️ Deleted (${syncResults.deletedIllustrationSets.length})\n\n${changelogEntry}`,
    );
  }

  return changelogEntries.length > 0 ? changelogEntries.join('\n') : 'No changes';
};
