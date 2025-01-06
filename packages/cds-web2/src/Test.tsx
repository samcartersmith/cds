/* eslint-disable no-console, react/no-array-index-key, react-perf/jsx-no-new-function-as-prop, react-perf/jsx-no-new-object-as-prop */
import '@cbhq/cds-fonts/fonts.css';
import '@cbhq/cds-icons/fonts/web/icon-font.css';

import React, { memo, useCallback, useRef, useState } from 'react';
import { css } from '@linaria/core';
import { svgs } from '@cbhq/cds-common2/internal/data/assets';
// import {NudgeCard} from './cards/NudgeCard'
import type { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import { UiIconName } from '@cbhq/cds-icons/__generated__/ui/types/UiIconName';

import { Button } from './buttons/Button';
import { ButtonGroup } from './buttons/ButtonGroup';
import { IconButton } from './buttons/IconButton';
import { ContainedAssetCard } from './cards/ContainedAssetCard';
import { FloatingAssetCard } from './cards/FloatingAssetCard';
import { InputLabel } from './controls/InputLabel';
import { InputStack } from './controls/InputStack';
import { NativeInput } from './controls/NativeInput';
import { Switch } from './controls/Switch';
import { useMediaQuery } from './hooks/useMediaQuery';
import { Icon } from './icons/Icon';
import { HeroSquare } from './illustrations/HeroSquare';
import { Box } from './layout/Box';
import { Divider } from './layout/Divider';
import { Fallback } from './layout/Fallback';
import { Grid } from './layout/Grid';
import { HStack } from './layout/HStack';
import { Spacer } from './layout/Spacer';
import { VStack } from './layout/VStack';
import { Link } from './link/Link';
import { Spinner } from './loaders/Spinner';
import { RemoteImage } from './media/RemoteImage';
import { type ColorSurgeRefBaseProps, ColorSurge } from './motion/ColorSurge';
import { Modal } from './overlays/Modal/Modal';
import { ModalBody } from './overlays/Modal/ModalBody';
import { ModalFooter } from './overlays/Modal/ModalFooter';
import { ModalHeader } from './overlays/Modal/ModalHeader';
import { Overlay } from './overlays/Overlay/Overlay';
import { Popover } from './overlays/popover/Popover';
import { PortalProvider } from './overlays/PortalProvider';
import { Tooltip } from './overlays/Tooltip/Tooltip';
import { globalStyles } from './styles/global';
import { ButtonOrLink } from './system/ButtonOrLink';
import { Interactable } from './system/Interactable';
import { Pressable } from './system/Pressable';
import { PressableOpacity } from './system/PressableOpacity';
import { SegmentedTabs } from './tabs/SegmentedTabs';
import { type TextProps, Text } from './text/Text';
import { TextBody } from './text/TextBody';
import { TextCaption } from './text/TextCaption';
import { TextDisplay1 } from './text/TextDisplay1';
import { TextDisplay2 } from './text/TextDisplay2';
import { TextDisplay3 } from './text/TextDisplay3';
import { TextHeadline } from './text/TextHeadline';
import { TextLabel1 } from './text/TextLabel1';
import { TextLabel2 } from './text/TextLabel2';
import { TextLegal } from './text/TextLegal';
import { TextTitle1 } from './text/TextTitle1';
import { TextTitle2 } from './text/TextTitle2';
import { TextTitle3 } from './text/TextTitle3';
import { TextTitle4 } from './text/TextTitle4';

const tabs = [
  { id: '1', label: 'Tab 1' },
  { id: '2', label: 'Tab 2', disabled: true },
  { id: '3', label: 'Tab 3' },
];

const imageURL =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

const sharedProps = {
  resizeMode: 'cover',
  shape: 'circle',
  width: 32,
  height: 32,
} as const;

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'positive' | 'negative';
  transparent?: boolean;
  compact?: boolean;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  startIcon?: UiIconName;
  endIcon?: UiIconName;
  flush?: 'start' | 'end';
};

const buttonProps: ButtonProps[] = [
  { variant: 'secondary' },
  { variant: 'positive' },
  { variant: 'negative' },
  { variant: 'secondary', transparent: true },
  { variant: 'positive', transparent: true },
  { variant: 'negative', transparent: true },
  { block: true },
  { compact: true },
  { compact: true, block: true },
  { transparent: true },
  { disabled: true },
  { loading: true },
  { loading: true, compact: true },
  { startIcon: 'backArrow' },
  { endIcon: 'backArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', block: true },
  { transparent: true, flush: 'start', compact: true, endIcon: 'forwardArrow' },
  { transparent: true, flush: 'end', compact: true, endIcon: 'forwardArrow' },
  { flush: 'start', endIcon: 'forwardArrow' },
  { flush: 'end', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', compact: true },
  { startIcon: 'backArrow', compact: true },
  { endIcon: 'forwardArrow', compact: true },
];
const content = 'This is the tooltip Content';

const textAlignments = ['start', 'end', 'center'] as const;
const wrapperStyle = css`
  width: 100px;
`;

export const IllustrationExample = memo(function IllustrationExample({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VStack alignItems="flex-start" gap={2}>
      <Box background="background">{children}</Box>
    </VStack>
  );
});

const renderedTextExamples = (props?: TextProps<any>) => (
  <VStack>
    <TextDisplay1 as="h1" {...props}>
      Display1
    </TextDisplay1>
    <TextDisplay2 as="h2" {...props}>
      Display2
    </TextDisplay2>
    <TextDisplay3 as="h3" {...props}>
      Display3
    </TextDisplay3>
    <TextTitle1 as="h3" {...props}>
      Title1
    </TextTitle1>
    <TextTitle2 as="h4" {...props}>
      Title2
    </TextTitle2>
    <TextTitle3 as="p" {...props}>
      Title3
    </TextTitle3>
    <TextTitle4 as="p" {...props}>
      Title4
    </TextTitle4>
    <TextHeadline as="p" {...props}>
      Headline
    </TextHeadline>
    <TextBody as="p" {...props}>
      Body
    </TextBody>
    <TextLabel1 as="p" {...props}>
      Label1
    </TextLabel1>
    <TextLabel2 as="p" {...props}>
      Label2
    </TextLabel2>
    <TextCaption as="p" {...props}>
      Caption
    </TextCaption>
    <TextLegal as="p" {...props}>
      Legal
    </TextLegal>
  </VStack>
);

const MediaTest = () => {
  const prefersSystemDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const maxWidth900 = useMediaQuery('(max-width: 900px)');
  const minWidth900 = useMediaQuery('(min-width: 900px)');

  return (
    <div>
      <div>prefersSystemDarkMode: {prefersSystemDarkMode.toString()}</div>
      <div>maxWidth900: {maxWidth900.toString()}</div>
      <div>minWidth900: {minWidth900.toString()}</div>
    </div>
  );
};

export const Test = () => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [activeTab, updateActiveTab] = useState<TabValue | null>(tabs[0]);
  const handleChange = useCallback((activeTab: TabValue | null) => updateActiveTab(activeTab), []);
  const [hiddenStories, setHiddenStories] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [showPinnedBox, setShowPinnedBox] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [switchChecked2, setSwitchChecked2] = useState(false);
  const colorSurgeRef = useRef<ColorSurgeRefBaseProps>(null);

  return (
    <div className={globalStyles}>
      <MediaTest />
      <Button
        end={<Icon color="textForeground" name="add" size="s" />}
        endIcon="airdrop"
        variant="secondary"
      >
        Test
      </Button>
      <Button onClick={() => setHiddenStories(!hiddenStories)} variant="primary">
        Toggle hidden stories
      </Button>
      <Button onClick={() => setShowPinnedBox(!showPinnedBox)} variant="primary">
        Toggle show top pinned box
      </Button>
      <Spacer vertical={4} />
      <VStack paddingBottom={2}>
        {show && (
          <Overlay animated>
            <VStack>
              <button onClick={() => setShow(false)} type="button">
                Hide Overlay
              </button>
            </VStack>
          </Overlay>
        )}
        <button onClick={() => setShow(true)} type="button">
          Show Overlay
        </button>
      </VStack>
      <Box
        background={{ base: 'backgroundPrimary', minTablet: 'accentBoldRed' }}
        height={{ base: '100px', minTablet: '300px' }}
        width={{ base: '100px', minTablet: '300px' }}
      />
      <Spacer background="accentBoldGreen" vertical={4} />
      <HStack
        ref={labelRef}
        as="label"
        gap={4}
        hoverBackground={{
          base: 'accentBoldPurple',
          minDesktop: 'accentBoldBlue',
        }}
        htmlFor="test"
        paddingBottom={1}
      >
        <Icon color="iconPrimary" name="affiliates" size="l" />
        <Icon color="iconPositive" name="artwork" size="l" />
        <Icon color="iconNegative" name="blockchain" size="l" />
      </HStack>
      <VStack font="display1">
        <HStack>
          <div>Hello</div>
          <Link to="https://google.com">World</Link>
        </HStack>
        <VStack background="background" padding={2}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="negative">Negative</Button>
          <Button variant="positive">Positive</Button>
          <Button transparent>Transparent</Button>
          <Button transparent variant="secondary">
            Transparent Secondary
          </Button>
          <Button transparent variant="negative">
            Transparent Negative
          </Button>
          <Button transparent variant="positive">
            Transparent Positive
          </Button>
        </VStack>
        <Box background="backgroundSecondary" />
        <Grid background="background" color="textPrimary" columns={3}>
          <span>test 1</span>
          <span>test 2</span>
          <span>test 3</span>
        </Grid>
        <Divider />
        <VStack>
          <Text textDecoration="none">none</Text>
          <Text textDecoration="underline">underline</Text>
          <Text textDecoration="overline">overline</Text>
          <Text textDecoration="line-through">line-through</Text>
          <Text textDecoration="underline overline">underline overline</Text>
          <Text textDecoration="underline double">underline double</Text>
        </VStack>
        <VStack gap={1}>
          <Fallback height={60} width={120} />
          <Fallback height={60} width={120} />
          <Fallback disableRandomRectWidth height={60} width={120} />
          <Fallback height={60} shape="squircle" width={60} />
        </VStack>
      </VStack>
      <Spacer vertical={4} />
      <Divider />
      <Text>SegmentedTab</Text>
      <SegmentedTabs activeTab={activeTab} onChange={handleChange} tabs={tabs} />
      <Spacer vertical={4} />
      <Divider />
      <Text>ContainedAssetCard</Text>
      <HStack gap={2} padding={2}>
        <ContainedAssetCard
          description="Description"
          header={
            <img
              alt="Image Alt"
              aria-hidden="true"
              height="32px"
              src="https://static-assets.coinbase.com/ui-infra/illustration/v1/heroSquare/svg/light/addMoreCrypto-2.svg"
              style={{
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: '100%',
              }}
              width="32px"
            />
          }
          onClick={() => console.log('clicked')}
          subtitle="Pressable"
          title="Title"
        />
        <ContainedAssetCard
          description="Description"
          header={
            <img
              alt="Image Alt"
              aria-hidden="true"
              height="32px"
              src="https://static-assets.coinbase.com/ui-infra/illustration/v1/heroSquare/svg/light/addMoreCrypto-2.svg"
              style={{
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: '100%',
              }}
              width="32px"
            />
          }
          subtitle="Subtitle"
          title="Title"
        />
        <ContainedAssetCard
          description="This is a very long description text that will get truncated"
          header={
            <img
              alt="Image Alt"
              aria-hidden="true"
              height="32px"
              src="https://static-assets.coinbase.com/ui-infra/illustration/v1/heroSquare/svg/light/addMoreCrypto-2.svg"
              style={{
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: '100%',
              }}
              width="32px"
            />
          }
          onClick={() => console.log('clicked')}
          size="l"
          subtitle="This is a very long subtitle text that will get truncated"
          title="This is a very long title text that will get truncated"
        />
        <ContainedAssetCard
          description="This is a very long description text that will get truncated"
          header={
            <img
              alt="Image Alt"
              aria-hidden="true"
              height="32px"
              src="https://static-assets.coinbase.com/ui-infra/illustration/v1/heroSquare/svg/light/addMoreCrypto-2.svg"
              style={{
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: '100%',
              }}
              width="32px"
            />
          }
          onClick={() => console.log('clicked')}
          size="l"
          subtitle="This is a very long subtitle text that will get truncated"
          title="This is a very long title text that will get truncated"
        >
          <img
            alt="Image Alt"
            aria-hidden="true"
            height="100%"
            src="https://static-assets.coinbase.com/ui-infra/illustration/v1/heroSquare/svg/light/addMoreCrypto-2.svg"
            style={{ objectFit: 'cover' }}
            width="100%"
          />
        </ContainedAssetCard>
      </HStack>
      <Spacer vertical={4} />
      <Divider />
      <Text>FloatingAssetCard</Text>
      <HStack gap={2} padding={2}>
        <FloatingAssetCard
          description="Description"
          media={
            <img
              alt=""
              aria-hidden="true"
              height="100%"
              src="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
              style={{ objectFit: 'cover', cursor: 'pointer' }}
              width="100%"
            />
          }
          onClick={() => console.log('clicked')}
          subtitle="Subtitle"
          title="Title"
        />
        <FloatingAssetCard
          description="Description"
          media={
            <img
              alt=""
              aria-hidden="true"
              height="100%"
              src="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
              style={{ objectFit: 'cover', cursor: 'pointer' }}
              width="100%"
            />
          }
          onClick={() => console.log('clicked')}
          size="l"
          subtitle="Subtitle"
          title="Title"
        />
        <FloatingAssetCard
          description="This is a really long description. This is a really long description. This is a really long description"
          media={
            <img
              alt=""
              aria-hidden="true"
              height="100%"
              src="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
              style={{ objectFit: 'cover', cursor: 'pointer' }}
              width="100%"
            />
          }
          onClick={() => console.log('clicked')}
          subtitle="This is a really long subtitle"
          title="This is a really long Title. This is a really long Title. This is a really long Title"
        />
      </HStack>
      <HStack>
        <Spinner color="backgroundPrimary" size={5} />
        <Spinner color="backgroundNegative" size={5} />
        <Spinner color="backgroundInverse" size={5} />
      </HStack>

      {hiddenStories && (
        <>
          {' '}
          <VStack background="background">
            <VStack gap={2}>
              <Text>Default Shape</Text>
              <HStack gap={2}>
                {Array.from({ length: 4 }).map((_, idx) => {
                  const key = `square-${idx}`;
                  return (
                    <RemoteImage key={key} source={imageURL} {...sharedProps} shape="square" />
                  );
                })}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text>Circle Shape</Text>
              <HStack gap={2}>
                {Array.from({ length: 4 }).map((_, idx) => {
                  const key = `square-${idx}`;
                  return <RemoteImage key={key} source={imageURL} {...sharedProps} />;
                })}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text>Squircle Shape</Text>
              <HStack gap={2}>
                {Array.from({ length: 4 }).map((_, idx) => {
                  const key = `squircle-${idx}`;
                  return (
                    <RemoteImage key={key} source={imageURL} {...sharedProps} shape="squircle" />
                  );
                })}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text>SVGs</Text>
              <HStack gap={2}>
                {svgs.map((imgURL, idx) => {
                  const key = `svg-${idx}`;
                  return (
                    <RemoteImage key={key} source={imgURL} {...sharedProps} shape="squircle" />
                  );
                })}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text>Avatar Sizes with Circle</Text>
              <HStack gap={2}>
                {(['s', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const).map((size, idx) => {
                  const key = `circle-${idx}`;
                  return (
                    <VStack key={key}>
                      <Text>{size}</Text>
                      <RemoteImage shape="circle" size={size} source={imageURL} />
                    </VStack>
                  );
                })}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text>Avatar Sizes with Squircle</Text>
              <HStack gap={2}>
                {(['s', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const).map((size, idx) => {
                  const key = `squircle-${idx}`;
                  return (
                    <VStack key={key}>
                      <Text>{size}</Text>
                      <RemoteImage shape="squircle" size={size} source={imageURL} />
                    </VStack>
                  );
                })}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text>Border Color Imgs</Text>
              <VStack gap={2}>
                <RemoteImage
                  borderColor={{
                    base: 'backgroundNegative',
                    minTablet: 'backgroundPositive',
                    minDesktop: 'backgroundPrimary',
                  }}
                  shape="circle"
                  size="xxl"
                  source={imageURL}
                />
              </VStack>
            </VStack>
            <VStack gap={2}>
              <Text>Border Color Svgs</Text>
              <VStack gap={2}>
                <RemoteImage
                  borderColor="textPositive"
                  shape="circle"
                  size="xxl"
                  source={svgs[0]}
                />
              </VStack>
            </VStack>
            <VStack gap={2}>
              <Text>Circle Fallback</Text>
              {/* @ts-expect-error Fix the RemoteImage props type */}
              <RemoteImage shape="circle" />
            </VStack>
            <VStack gap={2}>
              <Text>Rectangle Fallback</Text>
              {/* @ts-expect-error Fix the RemoteImage props type */}
              <RemoteImage shape="rectangle" />
            </VStack>
            <VStack gap={2}>
              <Text>Square Fallback</Text>
              {/* @ts-expect-error Fix the RemoteImage props type */}
              <RemoteImage shape="square" />
            </VStack>
          </VStack>
          <Divider />
          <VStack background="background" gap={2} padding={2}>
            {buttonProps.map((props, idx) => (
              <div key={idx}>
                <Button {...props}>Button</Button>
              </div>
            ))}
            Custom End Buttons
            <HStack gap={2}>
              <Button end={<Icon color="textForeground" name="caretRight" size="s" />}>Test</Button>
              <Button end={<Icon color="textForeground" name="add" size="s" />} variant="secondary">
                Test
              </Button>
              <Button
                end={<Icon color="textForeground" name="add" size="s" />}
                endIcon="airdrop"
                variant="secondary"
              >
                Test
              </Button>
              <Button
                end={<Icon color="textForeground" name="add" size="s" />}
                endIcon="airdrop"
                numberOfLines={3}
                variant="secondary"
              >
                Testing a long line of text that should wrap. Testing a long line of text that
                should wrap. Testing a long line of text that should wrap. Testing a long line of
                text that should wrap.
              </Button>
            </HStack>
          </VStack>
          <Divider />
          <IllustrationExample>
            <HeroSquare name="accessToAdvancedCharts" scaleMultiplier={1} />
          </IllustrationExample>
        </>
      )}
      <Divider />
      <VStack gap={2}>
        <Text>Button Group</Text>
        <ButtonGroup accessibilityLabel="Group">
          <Button>Save</Button>
          <Button variant="negative">Cancel</Button>
        </ButtonGroup>
        <ButtonGroup accessibilityLabel="Group">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>

        <ButtonGroup accessibilityLabel="Group">
          <Button compact variant="secondary">
            Button
          </Button>
          <Button compact variant="secondary">
            Button
          </Button>
          <Button compact variant="secondary">
            Button
          </Button>
          <Button compact variant="secondary">
            Button
          </Button>
        </ButtonGroup>
        <ButtonGroup accessibilityLabel="Group">
          <Button transparent>Button</Button>
          <Button transparent>Button</Button>
          <Button transparent>Button</Button>
        </ButtonGroup>
        <ButtonGroup block accessibilityLabel="Group">
          <Button>Save</Button>
          <Button variant="negative">Cancel</Button>
        </ButtonGroup>
        <ButtonGroup block accessibilityLabel="Group">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
        <ButtonGroup accessibilityLabel="Group" direction="vertical">
          <Button>Save</Button>
          <Button variant="negative">Cancel</Button>
        </ButtonGroup>
      </VStack>
      <Spacer vertical={4} />
      <Divider />
      <Text>Popover</Text>
      <Popover
        showOverlay
        content={
          <VStack gap={2}>
            <Text>Popover Content</Text>
            <button onClick={() => setShowPopover(false)} type="button">
              Button
            </button>
          </VStack>
        }
        visible={showPopover}
      >
        <button onClick={() => setShowPopover(true)} type="button">
          Button
        </button>
      </Popover>
      <Spacer vertical={4} />
      <Divider />
      <Text>Tooltip</Text>
      <PortalProvider>
        <HStack gap={5} paddingX={8} paddingY={2}>
          <VStack gap={2} paddingX={2}>
            <Tooltip content={content}>
              <button type="button">Default</button>
            </Tooltip>
            <Tooltip content={content} placement="top">
              <button type="button">Top</button>
            </Tooltip>
            <Tooltip content={content} placement="left">
              <button type="button">Left</button>
            </Tooltip>
            <Tooltip content={content} placement="right">
              <button type="button">Right</button>
            </Tooltip>
            <Tooltip content={content} placement="bottom">
              <button type="button">Bottom</button>
            </Tooltip>
            <Tooltip content={content} placement="bottom" visible={false}>
              <button disabled type="button">
                Disabled
              </button>
            </Tooltip>
            <Tooltip content={content} elevation={2} invertSpectrum={false}>
              <button type="button">Custom</button>
            </Tooltip>
          </VStack>

          <VStack gap={3} paddingX={2}>
            <Tooltip
              content={
                <VStack gap={2}>
                  <button type="button">Btn 1</button>
                  <button type="button">Btn 2</button>
                  <button type="button">Btn 3</button>
                </VStack>
              }
            >
              <VStack padding={2}>
                <button type="button">Button</button>
              </VStack>
            </Tooltip>
          </VStack>
          <VStack gap={4} padding={2}>
            <Tooltip content={content}>
              <Text font="label1">Default</Text>
            </Tooltip>
            <Tooltip content={content} placement="left">
              <VStack padding={2}>
                <VStack padding={2}>
                  <Text font="label1">left</Text>
                </VStack>
              </VStack>
            </Tooltip>
            <Tooltip content={content} placement="right">
              <VStack padding={2}>
                <Text font="label1">right</Text>
              </VStack>
            </Tooltip>
            <Tooltip content={content} placement="bottom">
              <VStack padding={2}>
                <Text font="label1">bottom</Text>
              </VStack>
            </Tooltip>
          </VStack>
        </HStack>
      </PortalProvider>
      <Spacer vertical={4} />
      <Divider />
      <Text>Elevation</Text>
      <Box
        bordered
        background="background"
        borderRadius={200}
        elevation={1}
        paddingX={3}
        paddingY={2}
      >
        <Text color="textForeground">elevation 1</Text>
      </Box>
      <Spacer as="div" vertical={4} />
      <Box
        bordered
        background="background"
        borderRadius={200}
        elevation={2}
        paddingX={3}
        paddingY={2}
      >
        <Text color="textForeground">elevation 2</Text>
      </Box>
      <Spacer vertical={4} />
      <Divider />
      <Text>ButtonOrLink</Text>
      <VStack gap={1} maxWidth={120}>
        <ButtonOrLink to="#">Link with to</ButtonOrLink>
        <ButtonOrLink href="#">Link with href</ButtonOrLink>
        <ButtonOrLink onClick={() => console.log('clicked!')}>Button</ButtonOrLink>
      </VStack>
      <Spacer vertical={4} />
      <Divider />
      <VStack gap={2}>
        <Text>Interactable</Text>
        <Interactable as="button" background="backgroundInverse">
          foreground
        </Interactable>
        <Interactable as="button" background="textForegroundMuted">
          foregroundMuted
        </Interactable>
        <Interactable as="button" background="background">
          background
        </Interactable>
        <Interactable as="button" background="backgroundAlternate">
          backgroundAlternate
        </Interactable>
        <Interactable as="button" background="backgroundInverse">
          backgroundInverse
        </Interactable>
        <Interactable as="button" background="backgroundOverlay">
          backgroundOverlay
        </Interactable>
        <Interactable as="button" background="line">
          line
        </Interactable>
        <Interactable as="button" background="lineHeavy">
          lineHeavy
        </Interactable>
        <Interactable as="button" background="backgroundPrimary">
          primary
        </Interactable>
        <Interactable as="button" background="backgroundPrimaryWash">
          primaryWash
        </Interactable>
        <Interactable as="button" background="background">
          primaryForeground
        </Interactable>
        <Interactable as="button" background="backgroundNegative">
          negative
        </Interactable>
        <Interactable as="button" background="background">
          negativeForeground
        </Interactable>
        <Interactable disabled as="button" background="backgroundNegativeWash">
          negativeWash
        </Interactable>
        <Interactable as="button" background="backgroundPositive">
          positive
        </Interactable>
        <Interactable as="button" background="background">
          positiveForeground
        </Interactable>
        <Interactable as="button" background="backgroundSecondary">
          secondary
        </Interactable>
        <Interactable as="button" background="backgroundInverse">
          secondaryForeground
        </Interactable>
        <Interactable as="button" background="transparent">
          transparent
        </Interactable>
        <Interactable as="button" background="backgroundWarning">
          warning
        </Interactable>
        <Interactable as="button" background="textWarning">
          warningForeground
        </Interactable>
      </VStack>
      <Spacer vertical={4} />
      <Divider />
      <VStack gap={2} paddingX={2}>
        <Text>Pressable</Text>
        <Box>
          <Pressable
            as="button"
            background="background"
            onKeyDown={() => console.log('down')}
            onKeyUp={() => console.log('up')}
          >
            Pressable
          </Pressable>
        </Box>
        <Box>
          <Pressable noScaleOnPress as="button" background="background">
            Without scaling
          </Pressable>
        </Box>
        <Box>
          <Pressable disabled as="button" background="background">
            disabled pressable
          </Pressable>
        </Box>
        <Box>
          <Pressable disabled noScaleOnPress as="button" background="background">
            disabled without scaling
          </Pressable>
        </Box>
        <Box>
          <Pressable block as="button" background="backgroundPrimary">
            <Text as="p" color="textForegroundInverse" font="body">
              Pressable full-width
            </Text>
          </Pressable>
        </Box>
        <Box>
          <Pressable loading as="button" background="background">
            <Text as="p" color="textForegroundInverse" font="body">
              loading
            </Text>
          </Pressable>
        </Box>
        <Grid gap={2} paddingX={2}>
          <Pressable as="button" background="transparent">
            <Text padding={1}>transparent</Text>
          </Pressable>
          <Pressable transparentWhileInactive as="button" background="backgroundPrimary">
            <Text color="textForeground" padding={1}>
              transparentWhileInactive
            </Text>
          </Pressable>
          <Pressable disabled as="button" background="transparent">
            <Text padding={1}>transparent</Text>
          </Pressable>
          <Pressable disabled transparentWhileInactive as="button" background="backgroundPrimary">
            <Text color="textForeground" padding={1}>
              transparentWhileInactive
            </Text>
          </Pressable>
        </Grid>
        <Grid gap={2} paddingX={2}>
          <Pressable as="button" background="transparent" borderColor="textPositive">
            <Text padding={1}>transparent with borders</Text>
          </Pressable>
          <Pressable
            transparentWhileInactive
            as="button"
            background="backgroundPrimary"
            borderColor="textPositive"
          >
            <Text padding={1}>transparentWhileInactive with borders</Text>
          </Pressable>
          <Pressable disabled as="button" background="transparent" borderColor="textPositive">
            <Text padding={1}>transparent with borders</Text>
          </Pressable>
          <Pressable
            disabled
            transparentWhileInactive
            as="button"
            background="backgroundPrimary"
            borderColor="textPositive"
          >
            <Text padding={1}>transparentWhileInactive with borders</Text>
          </Pressable>
          <Pressable
            as="button"
            background="background"
            borderColor="backgroundPrimary"
            borderRadius={100}
          >
            <Text padding={1}>primary + compact</Text>
          </Pressable>
          <Pressable as="button" background="backgroundAlternate" borderColor="textNegative">
            <Text padding={1}>textNegative</Text>
          </Pressable>
          <Pressable
            as="button"
            background="backgroundPrimary"
            borderColor="textPositive"
            borderRadius={200}
          >
            <Text color="textForeground" padding={1}>
              textPositive + standard
            </Text>
          </Pressable>
          <Pressable
            as="button"
            background="backgroundSecondary"
            borderColor="lineHeavy"
            borderRadius={200}
          >
            <Text color="textForeground" padding={1}>
              lineHeavy + tooltip
            </Text>
          </Pressable>
          <Pressable as="button" background="textPositive" borderColor="line" borderRadius={400}>
            <Text color="textForegroundInverse" padding={1}>
              line + pill
            </Text>
          </Pressable>
          <Pressable
            as="button"
            background="textNegative"
            borderColor="backgroundPrimaryWash"
            borderRadius={1000}
          >
            <Text color="textForegroundInverse" padding={1}>
              primaryWash + round
            </Text>
          </Pressable>
        </Grid>
      </VStack>
      <Spacer vertical={4} />
      <Divider />
      <Text>PressableOpacity</Text>
      <Grid gap={2}>
        <PressableOpacity as="button">
          <Text padding={1}>default</Text>
        </PressableOpacity>
        <PressableOpacity disabled as="button">
          <Text padding={1}>disabled</Text>
        </PressableOpacity>
      </Grid>
      <Text>Icon</Text>
      <Spacer vertical={2} />
      <HStack alignItems="center" gap={2}>
        <Icon color="iconWarning" name="airdrop" size="xs" />
        <Icon color="iconNegative" name="airdrop" size="s" />
        <Icon color="iconPositive" name="airdrop" size="m" />
        <Icon color="iconPrimary" name="airdrop" size="l" />
        <Icon bordered color="iconPrimary" name="airdrop" size="l" />
        <Icon bordered color="iconPrimary" name="airdrop" size="m" />
        <Icon
          color={{
            base: 'iconWarning',
            minTablet: 'iconNegative',
            minDesktop: 'iconPositive',
          }}
          name="airdrop"
          size="l"
        />
      </HStack>
      <Box
        background="backgroundPrimary"
        borderRadius={1000}
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
        borderTopWidth={0}
        left={0}
        padding={2}
        position="absolute"
        right={0}
        top={0}
        visibility={{
          base: 'hidden',
          minTablet: showPinnedBox ? 'visible' : 'hidden',
          minDesktop: showPinnedBox ? 'visible' : 'hidden',
        }}
      >
        <Text color="textForegroundInverse" padding={1}>
          Box with responsive visibility style
        </Text>
      </Box>
      <Spacer vertical={4} />
      <Divider />
      <Text>Modal</Text>
      <Button ref={triggerRef} onClick={() => setModalVisible(true)}>
        Open Modal
      </Button>
      <Modal
        onDidClose={() => triggerRef.current?.focus()}
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}
      >
        <ModalHeader
          backAccessibilityLabel="Back"
          closeAccessibilityLabel="Close"
          onBackButtonPress={() => setModalVisible(false)}
          testID="Basic Modal Test ID"
          title="Basic Modal"
        />
        <ModalBody testID="modal-body">
          <Text>Modal Content</Text>
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onClick={() => setModalVisible(false)}>Save</Button>}
          secondaryAction={
            <Button onClick={() => setModalVisible(false)} variant="secondary">
              Cancel
            </Button>
          }
        />
      </Modal>
      <Spacer vertical={4} />
      <Divider />
      <VStack gap={2} padding={2}>
        <Text>Switch</Text>
        <Switch checked={switchChecked} onChange={() => setSwitchChecked(!switchChecked)}>
          Normal
        </Switch>
        <Switch disabled>Disabled</Switch>
        <Switch
          checked={switchChecked2}
          onChange={() => setSwitchChecked2(!switchChecked2)}
          switchPaletteOverrides={{ backgroundAlternate: 'red' }}
        >
          Override Background
        </Switch>
      </VStack>
      <Spacer vertical={2} />
      <VStack>
        <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
        <IconButton
          accessibilityLabel="Horizontal arrows"
          name="arrowsHorizontal"
          variant="primary"
        />
        <IconButton
          accessibilityLabel="Horizontal arrows"
          compact={false}
          name="arrowsHorizontal"
          variant="secondary"
        />
        <IconButton
          accessibilityLabel="Horizontal arrows"
          compact={false}
          name="arrowsHorizontal"
          variant="secondary"
        />
        <IconButton
          accessibilityLabel="Horizontal arrows"
          compact={false}
          name="arrowsHorizontal"
          style={{
            backgroundColor: 'red',
            transform: 'scale(0.5)',
          }}
        />
        <IconButton
          disabled
          accessibilityLabel="Horizontal arrows"
          name="arrowsHorizontal"
          variant="primary"
        />
        <IconButton disabled accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
        <IconButton
          accessibilityLabel="Horizontal arrows"
          name="arrowsHorizontal"
          variant="primary"
        />
        <IconButton
          loading
          accessibilityLabel="Horizontal arrows"
          name="arrowsHorizontal"
          variant="secondary"
        />
        <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
        <IconButton transparent accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
      </VStack>
      <Spacer vertical={4} />
      <Divider />
      <HStack gap={2} padding={2}>
        {renderedTextExamples()} {renderedTextExamples({ mono: true })}
        <VStack gap={2}>
          <Text slashedZero as="p" font="body">
            Slashed Zero - OZY28019
          </Text>
          <Text tabularNumbers as="p" font="body">
            Tabular Numbers - 91.23450
          </Text>
          <Text as="p" font="body" userSelect="none">
            User Select None
          </Text>
          <Text as="p" font="body" userSelect="text">
            User Select Text: 1,820,29.56
          </Text>
          <Text as="p" font="body" userSelect="all">
            User Select all: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
          </Text>
          <Text underline as="p" font="body">
            Underline
          </Text>
          <Text as="s" font="body">
            Strikethrough
          </Text>
          <Box background="backgroundAlternate" width={30}>
            <Text noWrap as="p" font="body">
              No wrap
            </Text>
          </Box>
          <Text as="p" font="body" textTransform="uppercase">
            uppercase
          </Text>
          <Text as="p" font="body" textTransform="lowercase">
            Lowercase
          </Text>
          <Text as="p" font="body" textTransform="capitalize">
            capitalize
          </Text>
        </VStack>
        <VStack gap={2}>
          <Text as="time" dateTime="2020-10-10" font="body">
            Time: 2020-10-10
          </Text>
          <Box width={300}>
            <Text as="p" font="body" numberOfLines={2}>
              Text Number Of Lines: Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As
              with any asset, the value of Digital Currencies can go up or down and there can be a
              substantial risk that you lose money buying, selling, holding, or investing in digital
              currencies. You should carefully consider whether trading or holding Digital
              Currencies is suitable for you in light of your financial condition. Coinbase is not
              registered with the U.S. Securities and Exchange Commission and does not offer
              securities services in the United States or to U.S. persons.
            </Text>
          </Box>
          <Box background="backgroundAlternate" width={300}>
            <Text as="p" font="body" overflow="truncate">
              TextOverflow Ellipsis: As with any asset, the value of Digital Currencies can go up or
              down and there can be a substantial risk that you lose money buying, selling, holding,
              or investing in digital currencies. You should carefully consider whether trading or
              holding Digital Currencies is suitable for you in light of your financial condition.
              Coinbase is not registered with the U.S. Securities and Exchange Commission and does
              not offer securities services in the United States or to U.S. persons.
            </Text>
          </Box>
          <Box background="backgroundAlternate" height={30} width={300}>
            <Text as="p" font="body" overflow="clip">
              TextOverflow Clip: Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with
              any asset, the value of Digital Currencies can go up or down and there can be a
              substantial risk that you lose money buying, selling, holding, or investing in digital
              currencies. You should carefully consider whether trading or holding Digital
              Currencies is suitable for you in light of your financial condition. Coinbase is not
              registered with the U.S. Securities and Exchange Commission and does not offer
              securities services in the United States or to U.S. persons.
            </Text>
          </Box>
        </VStack>
      </HStack>
      <Spacer vertical={4} />
      <Divider />
      <VStack gap={2} padding={2}>
        <Text>Color Surge</Text>
        <Box bordered borderRadius={200} overflow="hidden" padding={3} position="relative">
          <ColorSurge ref={colorSurgeRef} disableAnimateOnMount />
        </Box>
        <Button onClick={async () => colorSurgeRef.current?.play('backgroundPrimary')}>
          Surge - Primary
        </Button>
        <Button onClick={async () => colorSurgeRef.current?.play('backgroundPositive')}>
          Surge - Positive
        </Button>
        <Button onClick={async () => colorSurgeRef.current?.play('backgroundNegative')}>
          Surge - Negative
        </Button>
      </VStack>
      <Spacer vertical={4} />
      <Divider />
      <VStack gap={2} padding={2}>
        <InputLabel>Label</InputLabel>
        <div>
          {textAlignments.map((align) => (
            <div key={align} className={wrapperStyle}>
              <InputLabel textAlign={align}>{`${align} Label`}</InputLabel>
            </div>
          ))}
        </div>
        <InputLabel color="textForegroundMuted">Label</InputLabel>
      </VStack>
      <Spacer vertical={4} />
      <Divider />
      <VStack gap={2} padding={2}>
        <Text>Native Input</Text>
        <InputStack
          inputNode={
            <NativeInput
              accessibilityLabel="Label"
              onBlur={() => console.log('blur')}
              onFocus={() => console.log('focus')}
              onKeyDown={() => console.log('keydown')}
              onPress={() => console.log('press')}
            />
          }
          labelNode="Label"
        />
        <InputStack
          inputNode={
            <NativeInput
              accessibilityLabel="Label"
              containerSpacing={css`
                padding: var(--space-1);
              `}
            />
          }
          labelNode="Label"
        />
        <InputStack
          inputNode={
            <NativeInput accessibilityLabel="Label" align="start" placeholder="start-placeholder" />
          }
          labelNode="Label"
        />
        <InputStack
          inputNode={
            <NativeInput accessibilityLabel="Label" align="end" placeholder="start-placeholder" />
          }
          labelNode="Label"
        />
      </VStack>
      <Spacer vertical={4} />
      <Divider />
      <VStack gap={2} padding={2}>
        <Text>Input Stack</Text>
        <InputStack
          appendNode={
            <Box background="backgroundPrimary">
              <Text as="p" color="textForegroundInverse" font="body">
                Append
              </Text>
            </Box>
          }
          endNode={
            <Box background="backgroundPositive" borderRadius={200}>
              <Text as="p" color="textForegroundInverse" font="body">
                EndContent
              </Text>
            </Box>
          }
          helperTextNode={
            <Box background="backgroundOverlay" height={30} width="100%">
              <Text as="p" font="body">
                HelperText
              </Text>
            </Box>
          }
          inputNode={
            <Box background="backgroundAlternate" flexGrow={2}>
              <Text as="p" font="body">
                Input
              </Text>
            </Box>
          }
          labelNode={
            <Box background="backgroundAlternate" height={30} width="100%">
              <Text as="p" font="body">
                Label
              </Text>
            </Box>
          }
          prependNode={
            <Box background="backgroundPrimary">
              <Text as="p" color="textForegroundInverse" font="body">
                Prepend
              </Text>
            </Box>
          }
          startNode={
            <Box background="backgroundPositive" borderRadius={200}>
              <Text as="p" color="textForegroundInverse" font="body">
                StartContent
              </Text>
            </Box>
          }
          variant="primary"
        />
      </VStack>
    </div>
  );
};
