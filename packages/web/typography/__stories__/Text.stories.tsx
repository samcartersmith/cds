import { VStack } from '../../layout/VStack';
import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { ThemeProvider } from '../../system/ThemeProvider';
import {
  TextBody,
  TextCaption,
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextLegal,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
} from '../index';

const textComponents = [
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
  TextHeadline,
  TextBody,
  TextLabel1,
  TextLabel2,
  TextCaption,
  TextLegal,
];

export const Normal = () => (
  <>
    {textComponents.map((Component) => {
      const name = Component.displayName.slice(4);
      return (
        <Component key={name} as="p">
          {name}
        </Component>
      );
    })}
  </>
);

export const Dense = () => (
  <ThemeProvider scale="xSmall">
    {textComponents.map((Component) => {
      const name = Component.displayName.slice(4);
      return (
        <Component key={name} as="p" display="block">
          {name}
        </Component>
      );
    })}
  </ThemeProvider>
);

export const FrontierNormal = () => (
  <FeatureFlagProvider frontierTypography>
    {textComponents.map((Component) => {
      const name = Component.displayName.slice(4);
      return (
        <Component key={name} as="p" display="block">
          {name}
        </Component>
      );
    })}
  </FeatureFlagProvider>
);

export const FrontierDense = () => (
  <FeatureFlagProvider frontierTypography>
    <ThemeProvider scale="xSmall">
      {textComponents.map((Component) => {
        const name = Component.displayName.slice(4);
        return (
          <Component key={name} as="p" display="block">
            {name}
          </Component>
        );
      })}
    </ThemeProvider>
  </FeatureFlagProvider>
);

export const MonoFont = () => (
  <>
    {textComponents.map((Component) => {
      const name = Component.displayName.slice(4);
      return (
        <Component key={name} mono as="p">
          {name}
        </Component>
      );
    })}
  </>
);

export const SlashedZero = () => (
  <TextBody slashedZero as="p">
    OZY28019
  </TextBody>
);

export const TabularNumbers = () => (
  <>
    <TextBody tabularNumbers align="end" as="p">
      91.23450
    </TextBody>
    <TextBody tabularNumbers align="end" as="p">
      11.98762
    </TextBody>
  </>
);

export const SelectableNone = () => (
  <TextBody as="p" selectable="none">
    BTC
  </TextBody>
);

export const SelectableText = () => (
  <TextBody as="p" selectable="text">
    Balance: 1,820,29.56
  </TextBody>
);

export const SelectableAll = () => (
  <TextBody slashedZero as="p" selectable="all">
    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
  </TextBody>
);

export const Underline = () => (
  <TextBody underline as="p">
    Learn more
  </TextBody>
);

export const Strikethrough = () => <TextBody as="s">Manual verification</TextBody>;

const MediumContainer = ({ children }: { children?: React.ReactNode }) => (
  <div style={{ width: '35%', height: '50px', backgroundColor: 'var(--background-alternate)' }}>
    {children}
  </div>
);

export const NoWrap = () => (
  <MediumContainer>
    <TextBody noWrap as="p">
      As with any asset, the value of Digital Currencies can
    </TextBody>
  </MediumContainer>
);

export const TextOverflowEllipsis = () => (
  <MediumContainer>
    <TextBody as="p" overflow="truncate">
      As with any asset, the value of Digital Currencies can go up or down and there can be a
      substantial risk that you lose money buying, selling, holding, or investing in digital
      currencies. You should carefully consider whether trading or holding Digital Currencies is
      suitable for you in light of your financial condition. Coinbase is not registered with the
      U.S. Securities and Exchange Commission and does not offer securities services in the United
      States or to U.S. persons.
    </TextBody>
  </MediumContainer>
);

export const TextOverflowClip = () => (
  <MediumContainer>
    <TextBody as="p" overflow="clip">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
  </MediumContainer>
);

export const TextNumberOfLines = () => (
  <VStack maxWidth={300}>
    <TextBody as="p" numberOfLines={2}>
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
  </VStack>
);

export const TextNumberOfLinesSiblings = () => (
  <VStack gap={3} maxWidth={300}>
    <TextBody as="p" numberOfLines={1} overflow="break">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
    <TextBody as="p" numberOfLines={2} overflow="break">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
    <TextBody as="p" numberOfLines={3} overflow="break">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
  </VStack>
);

export const TextNumberOfLinesNested = () => (
  <VStack gap={3} maxWidth={300}>
    <TextBody as="p" numberOfLines={2}>
      <TextBody as="p" numberOfLines={3}>
        The parent Text says this should only wrap to 2 lines, but the child which actually renders
        this text says it should wrap up to 3 lines.
      </TextBody>
    </TextBody>
  </VStack>
);

export const Uppercase = () => (
  <TextBody as="p" transform="uppercase">
    uppercase
  </TextBody>
);

export const Lowercase = () => (
  <TextBody as="p" transform="lowercase">
    Lowercase
  </TextBody>
);

export const Capitalize = () => (
  <TextBody as="p" transform="capitalize">
    capitalize
  </TextBody>
);

export const Sub = () => <TextBody as="sub">sub</TextBody>;

export const Strong = () => <TextBody as="strong">strong</TextBody>;

export const Bold = () => <TextBody as="p">b</TextBody>;

export const DescriptionDlDd = () => (
  <dl>
    <TextBody as="dt">Coffee</TextBody>
    <TextBody as="dd">Black hot drink</TextBody>
    <div>
      <TextBody as="dt">Milk</TextBody>
      <TextBody as="dd">White cold drink</TextBody>
    </div>
  </dl>
);

export default {
  title: 'Core Components/Text (tsx)',
  component: TextDisplay1,
};
