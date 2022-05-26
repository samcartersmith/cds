import { ParentTypesList } from '@cbhq/docusaurus-plugin-docgen/components/ParentTypesList';
import { PropsTable } from '@cbhq/docusaurus-plugin-docgen/components/PropsTable';
import { sharedTypeAliases } from '<%- data.alias %>/shared/sharedTypeAliases';
import { sharedParentTypes } from '<%- data.alias %>/shared/sharedParentTypes';

import data from './data'

<ParentTypesList parentTypes={data.parentTypes} sharedTypeAliases={sharedTypeAliases} sharedParentTypes={sharedParentTypes} />

<PropsTable props={data.props} sharedTypeAliases={sharedTypeAliases}  />