import * as React from 'react';

import { DEFAULT_SCALE, Scale } from '@cb/design-system-web/primitives/scale/scale';

import * as scaleStyles from './styles';

const ScaleContext = React.createContext<Scale>(DEFAULT_SCALE);
const ScaleActionContext = React.createContext<
  React.Dispatch<React.SetStateAction<Scale>> | undefined
>(undefined);

export const useScale = () => React.useContext(ScaleContext);

type Props = {
  value: Scale;
};

export const ScaleProvider: React.FC<Props> = ({ value, children }) => {
  const [scale, setScale] = React.useState<Scale>(value);

  return (
    <ScaleContext.Provider value={scale}>
      <ScaleActionContext.Provider value={setScale}>
        <div className={scaleStyles[scale]}>{children}</div>
      </ScaleActionContext.Provider>
    </ScaleContext.Provider>
  );
};
