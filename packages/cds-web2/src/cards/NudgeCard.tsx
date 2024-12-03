// import React from 'react'
// import { type StyleProps } from '../styles/styleProps'
// import { Box, BoxProps, type PolymorphicBoxProps } from '../layout/Box'
// import { HStack } from '../layout/HStack'
// import { VStack } from '../layout/VStack'
// import { Text } from '../text/Text'

// export type NudgeCardBaseProps = {
//   /** Text or React.ReactNode to be displayed above the description in a TextHeadline */
//   title?: React.ReactNode
//   /** Text or React.ReactNode to be displayed below the title in a TextBody */
//   description?: React.ReactNode
//   /** If you pass a Pictogram name it will render a Pictogram to the right of the text content */
//   pictogram?: React.ReactNode
//   /** Pass any node to be rendered to the right of the text content */
//   media?: React.ReactNode
//   /** Text or React.ReactNode to display as the call to action */
//   action?: React.ReactNode
//   /**
//    * Maximum number of lines shown for the title and description text. Text that exceeds will be truncated.
//    * @default 3
//    */
//   numberOfLines?: number // TO DO: make this work!
//   /**
//    * @default 327
//    */
//   width?: StyleProps['width']
//   /**
//    * @default 160
//    */
//   minHeight?: StyleProps['minHeight']
//   /**
//    * Background color for the card.
//    * @default backgroundAlternate
//    */
//   background?: StyleProps['background']
//   /**
//    * Callback fired when the action button is pressed
//    * Cannot be used when `action` is a React Element, only when `action` is a string
//    */
//   onActionPress?: () => void
//   /** Callback fired when the dismiss button is pressed */
//   onDismissPress?: () => void
//   /** Callback fired when NudgeCard is pressed */
//   onPress?: () => void
// }

// export type NudgeCardProps<AsComponent extends React.ElementType> =
//   PolymorphicBoxProps<AsComponent, NudgeCardBaseProps>

// export const NudgeCard = <AsComponent extends React.ElementType = 'div'>({
//   title,
//   description,
//   pictogram,
//   media,
//   action,
//   onActionPress,
//   numberOfLines = 3,
//   onDismissPress,
//   width = 327,
//   minWidth = 327,
//   // TO DO: fix these and make them work in other places too
//   // testID = 'nudge-card',
//   // accessibilityLabel,
//   maxHeight,
//   maxWidth,
//   background = 'backgroundAlternate',
//   onPress,
//   ...props
// }: NudgeCardProps<AsComponent>) => {
//   const hasMedia = pictogram || media
//   const paddingBottom = action ? 1 : 2
//   const spacingProps = getCardBodyPaddingProps({
//     paddingBottom,
//     compact: true,
//   })
//   return (
//     <Box
//       background={background}
//       borderColor="transparent"
//       borderRadius={500}
//       maxWidth={maxWidth}
//       maxHeight={maxHeight}
//       minWidth={minWidth}
//       position="relative"
//       width={width}
//     >
//       {onDismissPress && (
//         <Box
//           alignSelf="flex-end"
//           position="absolute"
//           right={8}
//           padding={0.5}
//           top={6}
//           onClick={onDismissPress}
//         >
//           X
//         </Box>
//       )}
//       <HStack
//         alignItems="center"
//         flexGrow={1}
//         gap={2}
//         justifyContent="space-between"
//         {...spacingProps}
//         {...props}
//       >
//         <VStack
//           alignItems="flex-start"
//           flexShrink={1}
//           gap={2}
//           maxWidth={maxWidth}
//         >
//           <VStack gap={0.5} maxWidth="100%" paddingTop={hasMedia ? 0 : 2}>
//             <Text
//               font="headline"
//               as="p"
//               // TO DO: fix me
//               // numberOfLines={numberOfLines}
//               // TO DO: fix me
//               // testID={`${testID}-title`}
//               transform="none"
//             >
//               {title}
//             </Text>
//             <Text
//               font="label2"
//               as="p"
//               // TO DO: fix me
//               // numberOfLines={numberOfLines}
//               // TO DO: fix me
//               // testID={`${testID}-description`}
//               transform="none"
//             >
//               {description}
//             </Text>
//           </VStack>
//           {action}
//         </VStack>
//         {media}
//       </HStack>
//     </Box>
//   )
// }

// const getCardBodyPaddingProps = ({
//   paddingLeft,
//   paddingRight,
//   paddingTop,
//   paddingBottom,
//   padding,
//   paddingX,
//   paddingY,
//   compact,
// }: {
//   compact?: boolean
// } & any) => {
//   if (compact)
//     return {
//       paddingBottom: paddingBottom ?? paddingY ?? padding ?? 1,
//       paddingTop: paddingTop ?? paddingY ?? padding ?? 2,
//       paddingLeft: paddingLeft ?? paddingX ?? padding ?? 2,
//       paddingRight: paddingRight ?? paddingX ?? padding ?? 2,
//     }
//   return {
//     paddingBottom: paddingBottom ?? paddingY ?? padding ?? 3,
//     paddingTop: paddingTop ?? paddingY ?? padding ?? 3,
//     paddingLeft: paddingLeft ?? paddingX ?? padding ?? 3,
//     paddingRight: paddingRight ?? paddingX ?? padding ?? 3,
//   }
// }
