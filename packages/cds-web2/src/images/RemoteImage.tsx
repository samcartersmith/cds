// import React from 'react'
// import {
//   AspectRatio,
//   AvatarSize,
//   FixedValue,
//   Shape,
//   SharedProps,
// } from './types'
// import { borderColorStyle } from './styles'
// import {
//   useAvatarSize,
//   useRemoteImageWidthAndHeight,
//   useShapeToBorderRadiusSize,
// } from './hooks'

// export type RemoteImageProps = {
//   /** Absolute url to the image that should be shown in the RemoteImage. If no source is provided then a generic fallback image is used. */
//   source?: string
//   /** Width of RemoteImage. Width takes precedence over size */
//   width?: FixedValue
//   /** Height of RemoteImage. Height takes precedence over size */
//   height?: FixedValue
//   /** Scale image based on this aspect-ratio */
//   aspectRatio?: AspectRatio
//   /**
//    * Shape of RemoteImage
//    * @default square
//    * */
//   shape?: Shape
//   /**
//    * Size for a given RemoteImage. If width or height is not defined,
//    * it will set size = m as default
//    *
//    * @default m
//    * */
//   size?: AvatarSize
//   /** Adds a custom border color from the border palette */
//   borderColor?: keyof typeof borderColorStyle
//   className?: string
// } & SharedProps &
//   Omit<
//     React.ImgHTMLAttributes<HTMLImageElement>,
//     'className' | 'style' | 'height' | 'width' | 'source'
//   >

// const styles = stylex.create({
//   borderRadius: (value) => ({
//     borderRadius: value,
//   }),
//   border: (borderColor) => ({
//     border: borderColor ? `2px solid ${borderColor}` : undefined,
//   }),
// })

// export const RemoteImage = ({
//   width,
//   height,
//   aspectRatio, // TODO
//   shape = 'square',
//   source,
//   alt = '',
//   className,
//   // resizeMode = 'cover', // TODO
//   testID,
//   size,
//   borderColor,
//   ...props
// }: RemoteImageProps) => {
//   const borderRadius = useShapeToBorderRadiusSize(shape)
//   const avatarSize = useAvatarSize(size ?? 'm')

//   const { width: finalWidth, height: finalHeight } =
//     useRemoteImageWidthAndHeight({
//       size,
//       width,
//       height,
//       avatarSize,
//     })

//   const stylexProps = stylex.props(
//     styles.borderRadius(borderRadius),
//     typeof borderColor !== 'undefined'
//       ? borderColorStyle[borderColor]
//       : undefined,
//   )

//   return (
//     <img
//       alt={alt}
//       data-testid={testID}
//       src={source}
//       width={finalWidth}
//       height={finalHeight}
//       className={
//         className
//           ? `${stylexProps.className} ${className}`
//           : stylexProps.className
//       }
//       style={{
//         ...stylexProps.style,
//       }}
//     />
//   )
// }

// // TODO: border should be 2px
