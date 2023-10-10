import { usePluginData } from '@docusaurus/useGlobalData';
import type { PluginData } from '@cbhq/docusaurus-plugin-docgen';

function useDocgenPluginData() {
  return usePluginData('@cbhq/docusaurus-plugin-docgen') as PluginData;
}

export default useDocgenPluginData;
