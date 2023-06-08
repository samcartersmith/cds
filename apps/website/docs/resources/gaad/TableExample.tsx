import { accounts as mockAccounts } from '@cbhq/cds-common/internal/data/accounts';
import { Icon } from '@cbhq/cds-web/icons';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from '@cbhq/cds-web/tables';

export const TableExample = () => {
  const totalResults = mockAccounts.length;
  const PAGE_SIZE = 7;
  const startIdx = 0;
  const endIdx = Math.min(startIdx + PAGE_SIZE, totalResults);
  const accounts = mockAccounts.slice(startIdx, endIdx);

  return (
    <Table bordered variant="ruled">
      <TableCaption>Example</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" title="Currency" width="20%" />
          <TableCell scope="col" title="Balance" width="40%" />
          <TableCell scope="col" title="Status" alignItems="flex-end" width="60%" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => {
          const balance = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(Number(account.balance.amount));

          return (
            <TableRow key={`row--${account.name}`}>
              <TableCell as="th" scope="row" title={account.name} />
              <TableCell title={balance} />
              <TableCell direction="horizontal" justifyContent="flex-end">
                <Icon
                  accessibilityLabel={account.primary ? 'Primary' : 'Secondary'}
                  name={account.primary ? 'circleCheckmark' : 'circleCross'}
                  size="m"
                  color={account.primary ? 'positive' : 'negative'}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

// <table>
//   <caption>Average daily tea and coffee consumption</caption>
//   <thead>
//     <tr>
//       <th>Person</th>
//       <th>Coffee</th>
//       <th>Tea</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th>Njoki</th>
//       <td>5 cups</td>
//       <td>0 cups</td>
//     </tr>
//     <tr>
//       <th>Iesha</th>
//       <td>1 cup</td>
//       <td>2 cups</td>
//     </tr>
//     <tr>
//       <th>Léonie</th>
//       <td>0 cups</td>
//       <td>25 cups</td>
//     </tr>
//   </tbody>
// </table>
