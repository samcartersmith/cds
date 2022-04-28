import { PropsTable } from '@cbhq/docusaurus-plugin-docgen/components/PropsTable';
import { aliasTypes } from '<%- alias %>/data/aliasTypes';
import { parentTypes } from '<%- alias %>/data/parentTypes';

<PropsTable {...<%- JSON.stringify(data) %>} aliasTypes={aliasTypes} parentTypes={parentTypes} />