import React, { useContext } from 'react';

import { scales } from './scales';

type ScaleValue = keyof typeof scales;

const DEFAULT_SCALE = 'large';

export const ScaleContext = React.createContext<ScaleValue>(DEFAULT_SCALE);
export const ScaleActionContext = React.createContext<
  React.Dispatch<React.SetStateAction<ScaleValue>> | undefined
>(undefined);

export const useScale = () => useContext(ScaleContext);

export const useSetScale = () => {
  const setScale = useContext(ScaleActionContext);
  if (!setScale) {
    throw new Error('ScaleActionContext.Provider does not exist in render path.');
  }
  return setScale;
};

type Props = {
  value?: ScaleValue;
};

export const ScaleProvider: React.FC<Props> = ({ children, value }) => {
  const [scale, setScale] = React.useState<ScaleValue>(value || DEFAULT_SCALE);

  return (
    <ScaleContext.Provider value={scale}>
      <ScaleActionContext.Provider value={setScale}>{children}</ScaleActionContext.Provider>
    </ScaleContext.Provider>
  );
};
