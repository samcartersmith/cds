import { ReactNode } from 'react';

import { SharedProps } from './SharedProps';

type ContentCardHeaderBaseProps = {
  /** A media object like an image, avatar, illustration, or cryptocurrency asset. */
  avatar?: ReactNode;
  /** Name of the publisher */
  title: ReactNode;
  /** Includes data like content category type and time */
  meta?: ReactNode;
  /** Typically an Icon Button or Tag */
  end?: ReactNode;
} & SharedProps;

type ContentCardBodyBaseProps = {
  /** Main body copy */
  body?: ReactNode;
  /** Use for supplemental data */
  label?: ReactNode;
  /** Media, image or video to show */
  media?: ReactNode;
  /**
   * The position of the media within the card.
   * Can be one of: 'top', 'bottom', 'right' or 'left'.
   */
  mediaPosition?: 'top' | 'bottom' | 'right' | 'left';
  children?: ReactNode;
} & SharedProps;

type ContentCardFooterBaseProps = {
  children?: ReactNode;
} & SharedProps;

type ContentCardBaseProps = {
  children?: ReactNode;
} & SharedProps;

export type {
  ContentCardBaseProps,
  ContentCardBodyBaseProps,
  ContentCardFooterBaseProps,
  ContentCardHeaderBaseProps,
};
