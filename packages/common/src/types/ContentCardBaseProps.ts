import { SharedProps } from './SharedProps';

type ContentCardHeaderBaseProps = {
  /** A media object like an image, avatar, illustration, or cryptocurrency asset. */
  avatar?: React.ReactNode;
  /** Name of the publisher */
  title: React.ReactNode;
  /** Includes data like content category type and time */
  meta?: React.ReactNode;
  /** Typically an Icon Button or Tag */
  end?: React.ReactNode;
} & SharedProps;

type ContentCardBodyBaseProps = {
  /** Main body copy */
  body?: React.ReactNode;
  /** Use for supplemental data */
  label?: React.ReactNode;
  /** Media, image or video to show */
  media?: React.ReactNode;
  /**
   * The position of the media within the card.
   * Can be one of: 'top', 'bottom', 'right' or 'left'.
   */
  mediaPosition?: 'top' | 'bottom' | 'right' | 'left';
  children?: React.ReactNode;
} & SharedProps;

type ContentCardFooterBaseProps = {
  children?: React.ReactNode;
} & SharedProps;

type ContentCardBaseProps = {
  children?: React.ReactNode;
} & SharedProps;

export type {
  ContentCardBaseProps,
  ContentCardBodyBaseProps,
  ContentCardFooterBaseProps,
  ContentCardHeaderBaseProps,
};
