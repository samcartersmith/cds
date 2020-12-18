import * as React from 'react';

import * as scaleStyles from '@cds/theme/styles/scale';

// TODO: move this to a more permanent place
export type Scale = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';

const ScaleContext = React.createContext<Scale>('large');
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
