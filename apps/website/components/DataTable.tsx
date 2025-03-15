import { TableBody, TableCell, TableRow } from '@cbhq/cds-web/tables';
import { Table } from '@cbhq/cds-web/tables/Table';
import { TextBody, TextHeadline } from '@cbhq/cds-web/typography';

/**
 * Add tis so that I don't have to keep writing all this Table boiler plate
 * @param
 * @returns
 */
export const DataTable = ({ data }: { data: Record<string, string> }) => {
  return (
    <Table bordered variant="graph">
      <TableBody>
        {Object.entries(data).map(([headline, body], index) => {
          return (
            <TableRow key={`${headline}-${body}-${index}`}>
              <TableCell>
                <TextHeadline as="h1">{headline}</TextHeadline>
              </TableCell>
              <TableCell>
                <TextBody as="p">{body}</TextBody>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
