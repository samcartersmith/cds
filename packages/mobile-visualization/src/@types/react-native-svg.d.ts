/* eslint-disable @typescript-eslint/lines-between-class-members */
import 'react-native-svg';

declare module 'react-native-svg' {
  export class Path extends Omit<Shape<PathProps>, 'setNativeProps'> {
    static displayName: string;
    render(): JSX.Element;
    setNativeProps: (
      props: PathProps & {
        matrix?: [number, number, number, number, number, number];
      } & TransformProps,
    ) => void;
  }
}
