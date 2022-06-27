/* eslint-disable import/extensions */
import { memo } from 'react';
import ModalLink from '@theme/ModalLink';
import PropsTable from '@theme/PropsTable';
import { TypeAliasModalContent } from '@theme/PropsTableRow';

import { sharedParentTypes } from ':docgen/_types/sharedParentTypes';
import { sharedTypeAliases } from ':docgen/_types/sharedTypeAliases';

type TypesModaLinkProps = {
  name: string;
};

const DocgenModalLink = memo(function DocgenModalLink({ name }: TypesModaLinkProps) {
  let modalContent: React.ReactNode;

  if (sharedTypeAliases[name]) {
    modalContent = <TypeAliasModalContent typeAlias={sharedTypeAliases[name]} />;
  } else if (sharedParentTypes[name]) {
    modalContent = (
      <PropsTable
        sharedTypeAliases={sharedTypeAliases}
        props={Object.values(sharedParentTypes[name])}
      />
    );
  } else {
    modalContent =
      'Unable to find matching types. Please inspect apps/website/.docusaurus/@cbhq/docusaurus-plugin-docgen/default/_types for appropriate name to use';
  }

  return (
    <ModalLink variant="body" mono content={modalContent}>
      {name}
    </ModalLink>
  );
});

DocgenModalLink.displayName = 'DocgenModalLink';
export default DocgenModalLink;
