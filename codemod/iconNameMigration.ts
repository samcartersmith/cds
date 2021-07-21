// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemod/iconNameMigration.ts ./src

import { FileInfo, API, Options } from 'jscodeshift';

import { Codemod } from './Codemod';

/**
 * A mapping between old and new icon names
 * key = old icon names
 * value = new icon names
 */
const iconNameMap: { [index: string]: string } = {
  allTimeHighHeavy: 'allTimeHigh',
  apiHeavy: 'api',
  arrowsHorizontalHeavy: 'arrowsHorizontal',
  arrowsVerticalHeavy: 'arrowsVertical',
  backspaceHeavy: 'arrowLeft',
  backspaceLight: 'arrowLeft',
  bankHeavy: 'bank',
  bellHeavy: 'bell',
  blockchain: 'blockchain',
  calendar: 'calendar',
  cardHeavy: 'card',
  caretDownHeavy: 'caretDown',
  caretDownLight: 'caretDown',
  caretLeftHeavy: 'caretLeft',
  caretLeftLight: 'caretLeft',
  caretRightLight: 'caretRight',
  caretUpHeavy: 'caretUp',
  caretUpLight: 'caretUp',
  cashEURHeavy: 'cashEUR',
  cashGBPHeavy: 'cashGBP',
  cashJPYHeavy: 'cashJPY',
  cashUSDHeavy: 'cashUSD',
  chartBarHeavy: 'chartBar',
  chartPieCircleHeavy: 'chartPieCircle',
  chartPieHeavy: 'chartPie',
  chartVolumeHeavy: 'chartVolume',
  checkboxCheckedLight: 'checkboxChecked',
  checkboxEmptyLight: 'checkboxEmpty',
  checkboxLight: 'checkbox',
  checkmarkHeavy: 'checkmark',
  circleCheckmarkLight: 'circleCheckmark',
  circulatingSupplyHeavy: 'circulatingSupply',
  clockLight: 'clock',
  closeCaption: 'closeCaption',
  closeHeavy: 'close',
  closeLight: 'close',
  collapse: 'collapse',
  copyLight: 'copy',
  documentHeavy: 'document',
  dotHeavy: 'dot',
  doubleChevronRightHeavy: 'doubleChevronRight',
  emailHeavy: 'email',
  errorHeavy: 'error',
  exclamationMarkHeavy: 'exclamationMark',
  expand: 'expand',
  expandAddressLight: 'expandAddress',
  expandAll: 'expandAll',
  externalLink: 'externalLink',
  forwardHeavy: 'arrowRight',
  gearHeavy: 'gear',
  giftBoxLight: 'giftBox',
  globeHeavy: 'globe',
  heartHeavy: 'heartActive',
  homeHeavy: 'home',
  idealHeavy: 'ideal',
  identityCardHeavy: 'identityCard',
  indentityCardHeavy: 'indentityCard',
  infoHeavy: 'info',
  initiatorHeavy: 'initiator',
  listHeavy: 'list',
  lockHeavy: 'lock',
  marketCapLight: 'marketCap',
  minusLight: 'minus',
  moreHeavy: 'more',
  newsFeed: 'newsFeed',
  notVisibleHeavy: 'visibleInactive',
  notVisibleLight: 'visibleInactive',
  paperAirplaneHeavy: 'paperAirplane',
  pauseHeavy: 'pause',
  pay: 'pay',
  paypalHeavy: 'paypal',
  pencilLight: 'pencil',
  phoneHeavy: 'phone',
  playHeavy: 'play',
  plusLight: 'add',
  popularityHeavy: 'sparkle',
  portraitHeavy: 'profile',
  profileHeavy: 'profile',
  pulseHeavy: 'pulse',
  qrCodeHeavy: 'qrCode',
  reCenterLight: 'reCenter',
  recurringHeavy: 'recurring',
  safeHeavy: 'safe',
  searchHeavy: 'search',
  shareHeavy: 'share',
  shieldHeavy: 'shield',
  smartContractHeavy: 'smartContract',
  sofortHeavy: 'sofort',
  sortDownCenterHeavy: 'sortDownCenter',
  sortDownHeavy: 'sortDown',
  sortUpCenterHeavy: 'sortUpCenter',
  sortUpHeavy: 'sortUp',
  soundOffHeavy: 'soundOff',
  soundOnHeavy: 'soundOn',
  speakerHeavy: 'speaker',
  stakeHeavy: 'stake',
  starHeavy: 'starActive',
  statusDotHeavy: 'statusDot',
  step0Heavy: 'step0',
  step1Heavy: 'step1',
  step2Heavy: 'step2',
  step3Heavy: 'step3',
  step4Heavy: 'step4',
  step5Heavy: 'step5',
  step6Heavy: 'step6',
  step7Heavy: 'step7',
  step8Heavy: 'step8',
  step9Heavy: 'step9',
  tradingAnnotationLight: 'annotation',
  tradingAverageLight: 'average',
  tradingChartCandlesLight: 'chartCandles',
  tradingChartLineLight: 'chartLine',
  tradingContinuousLight: 'continuous',
  tradingCrossLight: 'crossTrade',
  tradingFibLight: 'fib',
  tradingHorizLineLight: 'horizontalLine',
  tradingRectangleLight: 'rectangle',
  tradingRemoveLight: 'circleCross',
  tradingUpArrowLight: 'diagonalRightArrow',
  tradingVertLineLight: 'verticalLine',
  trashCanHeavy: 'trashCan',
  trashCanLight: 'trashCan',
  trxBuyHeavy: 'add',
  trxConvertHeavy: 'convert',
  trxDepositHeavy: 'deposit',
  trxReceiveHeavy: 'arrowDown',
  trxRewardLight: 'percentage',
  trxSellHeavy: 'minus',
  trxSendHeavy: 'arrowUp',
  trxWithdrawHeavy: 'withdraw',
  undoLight: 'undo',
  unheartHeavy: 'heartInactive',
  visibleHeavy: 'visibleActive',
  visibleLight: 'visibleActive',
  walletHeavy: 'wallet',
  wireTransferHeavy: 'wireTransfer',
};

/**
 * A codemod for replacing old icon names with new icon names
 */
export default function replaceOldNameWithNewName(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  const elements = mod
    .findJsxElementsByName('Icon')
    .concat(mod.findJsxElementsByName('IconButton'));

  if (elements.length === 0) {
    return undefined;
  }

  elements.forEach(el => {
    el.openingElement.attributes.forEach(attr => {
      // Find the name prop
      if (attr.type === 'JSXAttribute' && attr.name.name === 'name') {
        // Change the value of this prop (name) to the new icon name
        if (attr.value) {
          if (attr.value.type === 'StringLiteral') {
            const oldName = attr.value.value;
            // If it does not exist in mapping, ignore
            if (oldName in iconNameMap) {
              // eslint-disable-next-line no-param-reassign
              attr.value.value = iconNameMap[oldName];
            }
          }
        }
      }
    });
  });

  return mod.toSource(options);
}
