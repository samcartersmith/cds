import { useCallback, useMemo } from 'react';
import illustrationReleaseHistory from '@site/static/data/illustration/releaseHistory.json';
import { css } from 'linaria';
import { useToggler } from '@cbhq/cds-common';
import { illustrationDimensionDefaults } from '@cbhq/cds-common/tokens/illustrations';
import { Button } from '@cbhq/cds-web/buttons';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { Modal, ModalBody, ModalHeader } from '@cbhq/cds-web/overlays';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import { TextBody, TextHeadline } from '@cbhq/cds-web/typography';

const blackBackground = css`
  background-color: black;
`;

type ReleasedIllustrationsTypes = (typeof illustrationReleaseHistory)[string];

type HistoryDetailsType = {
  info: ReleasedIllustrationsTypes;
};

type ReleaseType = 'deleted' | 'new' | 'modified';

const getTypeColor = (type: ReleaseType) => {
  switch (type) {
    case 'deleted':
      return 'negative';
    case 'new':
      return 'positive';
    case 'modified':
      return 'foreground';
    default:
      return 'foreground';
  }
};

const StatisticsOverview = ({ info }: HistoryDetailsType) => {
  return (
    <VStack>
      {Object.entries(info).map(([type, illustrationNames]) => {
        return (
          <TextHeadline as="span">
            Number of {type}:<TextBody as="span"> {` ${illustrationNames.length}`}</TextBody>
          </TextHeadline>
        );
      })}
    </VStack>
  );
};

const HistoryDetails = ({ info }: HistoryDetailsType) => {
  const memoizedInfo = useMemo(() => {
    return info;
  }, [info]);

  const renderBody = useCallback(() => {
    const rows: JSX.Element[] = [];

    // type = newIllustrations | modifiedIllustrations | deletedIllustrations
    for (const [type, illustrationNames] of Object.entries(info)) {
      // transforms type -> new | modified | delete. Strips out
      // Illustrations so its less verbose
      const transformedType = type.replace('Illustrations', '') as ReleaseType;
      const colorOfTypeText = getTypeColor(transformedType);

      illustrationNames.forEach((variantAndName) => {
        const [variant, name] = variantAndName.split('/');
        const [spectrumLessName, spectrum] = name.split('-');

        const illustration = (
          <Illustration
            name={spectrumLessName as never}
            dimension={
              illustrationDimensionDefaults[variant as keyof typeof illustrationDimensionDefaults]
            }
          />
        );

        rows.push(
          <TableRow>
            <TableCell color={colorOfTypeText} title={transformedType} />
            <TableCell title={variant} />
            <TableCell>
              <TextBody as="p">{name}</TextBody>
              {spectrum === 'dark' && <div className={blackBackground}>{illustration}</div>}
              {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
              {spectrum === 'light' && <>{illustration}</>}
            </TableCell>
          </TableRow>,
        );
      });
    }
    return rows;
  }, [info]);

  return (
    <VStack>
      <StatisticsOverview info={memoizedInfo} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell title="Type" />
            <TableCell title="Variant" />
            <TableCell title="AssetName and Thumbnail" />
          </TableRow>
        </TableHeader>
        <TableBody>{renderBody()}</TableBody>
      </Table>
    </VStack>
  );
};

const ShowHistoryModal = ({ date, info }: { date: string; info: ReleasedIllustrationsTypes }) => {
  const [visible, { toggleOn, toggleOff }] = useToggler();

  return (
    <>
      <TableCell>
        <Button onPress={toggleOn}>Show History</Button>
      </TableCell>
      <Modal visible={visible} onRequestClose={toggleOff}>
        <ModalHeader title={`${date} Release`} />
        <ModalBody>
          <HistoryDetails info={info} />
        </ModalBody>
      </Modal>
    </>
  );
};

const QuickSummary = ({ info }: HistoryDetailsType) => {
  const { newIllustrations, modifiedIllustrations, deletedIllustrations } = info;

  return (
    <TableCell>
      {newIllustrations.length > 0 && (
        <TextBody as="p">
          <strong>
            <p>New:</p>
          </strong>{' '}
          {newIllustrations.map((name) => (
            <p>{name}</p>
          ))}
        </TextBody>
      )}
      {modifiedIllustrations.length > 0 && (
        <TextBody as="p">
          <strong>
            <p>Modified:</p>
          </strong>{' '}
          {modifiedIllustrations.map((name) => (
            <p>{name}</p>
          ))}
        </TextBody>
      )}
      {deletedIllustrations.length > 0 && (
        <TextBody as="p">
          <strong>
            <p>Deleted:</p>
          </strong>{' '}
          {deletedIllustrations.map((name) => (
            <p>{name}</p>
          ))}
        </TextBody>
      )}
    </TableCell>
  );
};

export const ReleaseHistory = () => {
  return (
    <VStack maxHeight={300}>
      <Table bordered variant="ruled">
        <TableHeader>
          <TableRow>
            <TableCell title="Release Date" />
            <TableCell title="History" />
            <TableCell title="Quick Summary" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(illustrationReleaseHistory).map(([date, info]) => {
            return (
              <TableRow>
                <TableCell title={date} />
                <ShowHistoryModal key={date} date={date} info={info} />
                <QuickSummary info={info} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </VStack>
  );
};
