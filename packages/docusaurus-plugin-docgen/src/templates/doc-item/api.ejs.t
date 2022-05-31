import { ParentTypesList } from '@cbhq/docusaurus-plugin-docgen/components/ParentTypesList';
import { PropsTable } from '@cbhq/docusaurus-plugin-docgen/components/PropsTable';
import { sharedTypeAliases } from '@docgen/_types/sharedTypeAliases';
import { sharedParentTypes } from '@docgen/_types/sharedParentTypes';

import data from './data'

<ParentTypesList parentTypes={data.parentTypes} sharedTypeAliases={sharedTypeAliases} sharedParentTypes={sharedParentTypes} />

<PropsTable props={data.props} sharedTypeAliases={sharedTypeAliases}  />