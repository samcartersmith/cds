import React, { isValidElement, memo } from 'react';
import { PressableProps } from 'react-native';
import { NudgeCardBaseProps } from '@cbhq/cds-common/types';

import { IconButton } from '../buttons';
import { Pictogram } from '../illustrations/Pictogram';
import { Box } from '../layout';
import { PressableOpacity } from '../system';
import { TextHeadline } from '../typography';

import { CardBody } from './CardBody';

export type NudgeCardProps = NudgeCardBaseProps & {
  onDismissPress?: PressableProps['onPress'];
  onActionPress?: PressableProps['onPress'];
} & Pick<PressableProps, 'onPress'>;

export const NudgeCard = memo(
  ({
    title,
    description,
    pictogram,
    action,
    onActionPress,
    // defaults to 3 in CardBody
    numberOfLines,
    onDismissPress,
    width = '100%',
    testID = 'nudge-card',
    accessibilityLabel,
    onPress,
    ...props
  }: NudgeCardProps) => {
    const renderAction = isValidElement(action) ? (
      action
    ) : (
      <PressableOpacity onPress={onActionPress}>
        <TextHeadline color="primary" numberOfLines={1} spacingVertical={1}>
          {action}
        </TextHeadline>
      </PressableOpacity>
    );
    const content = (
      <Box
        accessibilityLabel={accessibilityLabel}
        background="backgroundAlternate"
        borderColor="transparent"
        borderRadius="roundedXLarge"
        position="relative"
        testID={testID}
        width={width}
      >
        {onDismissPress ? (
          // zIndex is required otherwise CardBody sits on top of it
          <Box position="absolute" right={0} spacing={0.5} top={0} zIndex={2}>
            <IconButton
              transparent
              accessibilityLabel={`Dismiss the ${
                accessibilityLabel ?? typeof title === 'string' ? title : ''
              } card`}
              name="close"
              onPress={onDismissPress}
              testID={`${testID}-dismiss-button`}
              variant="secondary"
            />
          </Box>
        ) : null}
        <CardBody
          compact
          action={action ? renderAction : null}
          description={description}
          media={<Pictogram dimension="64x64" name={pictogram} testID={`${testID}-spot-square`} />}
          numberOfLines={numberOfLines}
          title={title}
          {...props}
        />
      </Box>
    );
    return onPress ? <PressableOpacity onPress={onPress}>{content}</PressableOpacity> : content;
  },
);
