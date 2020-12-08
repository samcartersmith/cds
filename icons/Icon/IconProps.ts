import { SVGProps } from 'react';

export interface InternalIconProps
  extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'className' | 'height' | 'children'> {
  // TODO: update type to "typeof colors[keyof typeof colors]" when colors are defined
  fill?: string;
  /**
   * Give the icon a description. It will show up in a tooltip after hovering over the icon for 3s.
   * This is a default browser feature and very helpful to users to understand what the icon does.
   */

  title?: string;
  /**
   * If the icon is labelled by an independent element, then provide that element's id. This is
   * used to set the aria-labelledby value on the icon svg. If the `title` prop is also provided,
   * then `titleId` will be used to set the id on the `<title>` element.
   */

  titleId?: string;
}
export type IconProps = {
  /** Identifies the icon */
  kind: IconKind;
  /**
   * Specifies the icon size. The actual icon size is determined based on this prop and the
   * current scale.
   */

  size: IconSize;
  /** Set the fill color of the icon */
  // TODO: update type to allowed colors

  fill?: string;
} & InternalIconProps;
export type IconSize = 'L' | 'M' | 'S' | 'XS';
export type Pixels = 32 | 24 | 16 | 12 | 8;
type IconKind =
  | 'allTimeHigh'
  | 'api'
  | 'arrowsHorizontal'
  | 'arrowsVertical'
  | 'backspace'
  | 'bank'
  | 'bell'
  | 'blockchain'
  | 'calendar'
  | 'card'
  | 'caretDown'
  | 'caretLeft'
  | 'caretRight'
  | 'caretUp'
  | 'cashEUR'
  | 'cashGBP'
  | 'cashJPY'
  | 'cashUSD'
  | 'chartBar'
  | 'chartPie'
  | 'chartPieCircle'
  | 'chartVolume'
  | 'checkbox'
  | 'checkboxChecked'
  | 'checkboxEmpty'
  | 'checkmark'
  | 'circleCheckmark'
  | 'circulatingSupply'
  | 'clock'
  | 'close'
  | 'copy'
  | 'document'
  | 'dot'
  | 'doubeChevronRight'
  | 'doubleChevronRight'
  | 'exclamationMark'
  | 'expand'
  | 'expandAddress'
  | 'externalLink'
  | 'forward'
  | 'gauge'
  | 'gavel'
  | 'gear'
  | 'giftBox'
  | 'globe'
  | 'heart'
  | 'home'
  | 'ideal'
  | 'identityCard'
  | 'indentityCard'
  | 'info'
  | 'initiator'
  | 'list'
  | 'lock'
  | 'marketCap'
  | 'minus'
  | 'more'
  | 'newsFeed'
  | 'notVisible'
  | 'paperAirplane'
  | 'pause'
  | 'paypal'
  | 'pencil'
  | 'phone'
  | 'play'
  | 'plus'
  | 'popularity'
  | 'portrait'
  | 'profile'
  | 'pulse'
  | 'qrCode'
  | 'questionMark'
  | 'reCenter'
  | 'recurring'
  | 'safe'
  | 'search'
  | 'sofort'
  | 'sortDown'
  | 'sortUp'
  | 'soundOff'
  | 'soundOn'
  | 'speaker'
  | 'stake'
  | 'star'
  | 'statusDot'
  | 'step0'
  | 'step1'
  | 'step2'
  | 'step3'
  | 'step4'
  | 'step5'
  | 'step6'
  | 'step7'
  | 'step8'
  | 'step9'
  | 'tradingAnnotation'
  | 'tradingAverage'
  | 'tradingChartCandles'
  | 'tradingChartLine'
  | 'tradingContinuous'
  | 'tradingCross'
  | 'tradingFib'
  | 'tradingHorizLine'
  | 'tradingRectangle'
  | 'tradingRemove'
  | 'tradingUpArrow'
  | 'tradingVertLine'
  | 'trashCan'
  | 'trxBuy'
  | 'trxConvert'
  | 'trxDeposit'
  | 'trxReceive'
  | 'trxReward'
  | 'trxSell'
  | 'trxSend'
  | 'trxWithdraw'
  | 'undo'
  | 'visible'
  | 'wallet'
  | 'wireTransfer';
