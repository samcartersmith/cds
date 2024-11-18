import React from 'react';
import figma from '@figma/code-connect';

import { Icon } from '../Icon';

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=21323-1475', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="orderBook" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=21323-1468', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="candlesticks" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=20659-1469', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="microphone" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=20659-1462', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="calculator" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=17135-1458', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="advancedMarketSelector" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=16558-1451', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="lineChartCrypto" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=16558-1444', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashCoins" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=15904-2184', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="sortUpCenterInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=15904-2177', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="sortDownCenterInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=15904-2170', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="infoInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=15904-2163', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="login" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=15904-2156', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="logout" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=14688-1486', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="rocketInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=14688-1479', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="crypto" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=14688-1472', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="bellInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=14448-1444', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="sortDoubleArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=11452-1458', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="gaugeLow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=11452-1451', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="gaugeEmpty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=11452-1444', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="gaugeMedium" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=10960-1474', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="fingerprint" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=3238-17763', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashSingaporeDollar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=3238-17756', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="coinbaseOne" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=3238-17739', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashCanadianDollar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4095', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="pulse" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3952', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="paperclip" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1951-16538', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="planetActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1951-16533', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="planetInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1831-16711', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="briefcase" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1831-16460', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="generalCharacter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16636', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashBrazillianReal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16631', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="book" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16626', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="blog" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16621', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="affiliates" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16616', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cryptobasics" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16610', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="megaphone" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16605', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="lightbulb" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16455', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="institute" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16430', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="qrCodeAlt" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1830-16403', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="rocket" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1824-16397', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="refresh" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1823-16468', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="newsletter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1823-16444', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="payouts" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1822-16418', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="transactions" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=1820-16850', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="wrapToken" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4932', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="withdraw" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4919', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="wireTransfer" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4904', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="wifi" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4891', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="warning" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4878', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="wallet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4865', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="visibleInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4852', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="visibleFilled" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4839', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="visibleActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4826', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="verticalLine" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4813', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="upload" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4800', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="upArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4787', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="unlock" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4774', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="unknown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4761', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="undo" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4748', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="trophy" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4735', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="trashCan" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4722', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="thumbsUpOutline" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4709', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="thumbsUp" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4696', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="thumbsDownOutline" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4683', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="thumbsDown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4670', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="telephone" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4657', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="taxesReceiptInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4644', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="taxesReceipt" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4631', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step9" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4618', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step8" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4605', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step7" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4592', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step6" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4579', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step5" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4566', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step4" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4553', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step3" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4540', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step2" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4527', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step1" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4514', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="step0" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4501', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="statusDot" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4488', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="starInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4475', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="starActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4462', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="stake" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4449', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="speaker" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4436', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="sparkle" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4423', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="soundOn" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4410', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="soundOff" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4397', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="sortUpCenter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4384', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="sortUp" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4371', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="sortDownCenter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4358', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="sortDown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4345', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="sofort" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4332', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="smartContract" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4319', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="shield" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4306', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="share" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4293', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="setPinCode" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4280', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="seenActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4267', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="search" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4254', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="safe" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4241', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="royaltyInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4228', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="royaltyActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4215', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="reportInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4202', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="reportActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4189', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="regulated" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4176', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="recurring" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4163', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="rectangle" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4150', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="reCenter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4134', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="questionMark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4121', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="qrCode" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4108', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="pyramid" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4082', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="protection" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4069', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="profile" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4056', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="play" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4043', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="pin" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4030', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="phone" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4017', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="percentage" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-4004', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="pencil" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3991', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="paypal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3978', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="pay" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3965', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="pause" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3939', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="paperAirplane" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3926', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="outline" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3913', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="orderHistory" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3900', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="noWifi" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3887', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="nftSaleInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3874', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="nftSaleActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3861', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="nftOfferInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3848', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="nftOfferActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3835', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="nftBuyInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3822', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="nftBuyActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3809', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="nft" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3796', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="newsFeed" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3783', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="more" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3770', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="minus" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3757', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="marketCap" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3744', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="lock" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3731', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="list" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3718', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="lightningBolt" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3705', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="laptop" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3692', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="keyboard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3679', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="initiator" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3666', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="info" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3653', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="identityCard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3640', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="ideal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3627', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="horizontalLine" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3614', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="home" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3601', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="heartInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3588', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="heartActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3575', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="hammerInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3562', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="hammerActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3549', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="hamburger" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3536', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="group" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3523', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="globe" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3510', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="giftCard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3497', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="giftBox" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3484', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="ghostInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3471', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="ghostActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3458', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="gear" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3445', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="gavel" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3432', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="gauge" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3419', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="forwardArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3406', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="fork" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3393', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="followInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3380', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="followActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3367', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="flame" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3354', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="filter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3341', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="fib" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3328', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="externalLink" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3315', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="expandAll" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3302', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="expandAddress" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3289', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="expand" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3276', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="exclamationMark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3263', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="ethereum" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3250', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="error" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3237', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="email" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3224', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="dropsInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3211', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="dropsActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3198', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="drag" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3185', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="download" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3172', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="downArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3159', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="doubleChevronRight" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3146', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="dot" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3133', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="document" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3120', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="directDepositIconInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3107', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="directDepositIconActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3094', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="diamondInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3081', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="diamondActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3068', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="diagonalUpArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3055', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="diagonalRightArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3042', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="diagonalDownArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3029', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="dex" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3016', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="deposit" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-3003', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="defi" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2990', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="currencies" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2977', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="crossTrade" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2964', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="copy" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2951', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="convert" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2932', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="continuous" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2919', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="commentActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2906', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="comment" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2893', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="collapse" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2880', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="closeCaption" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2867', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="close" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2854', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="clockOutline" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2841', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="clock" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2828', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="clipboard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2815', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="circulatingSupply" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2802', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="circleCross" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2789', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="circleCheckmark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2776', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="checkmark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2763', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="checkboxEmpty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2750', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="checkboxChecked" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2737', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="chatBubble" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2722', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="chatBotAgent" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2709', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="chartVolume" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2696', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="chartPie" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2679', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="chartLine" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2666', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="chartCandles" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2653', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="chartBar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2640', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="chainLink" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2627', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashVietnameseDong" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2614', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashUSD" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2601', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashUaeDirham" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2588', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashTurkishLira" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2575', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashThaiBaht" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2562', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashSwissFranc" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2549', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashRupee" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2536', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashPolishZloty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2523', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashPhilippinePeso" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2510', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashJPY" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2497', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashIndonesianRupiah" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2484', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashGBP" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2471', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashEUR" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2458', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashBrazilianReal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2445', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cashAustralianDollar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2432', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="cash" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2419', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="caretUp" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2406', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="caretRight" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2393', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="caretLeft" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2380', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="caretDown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2367', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="card" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2354', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="camera" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2341', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="calendar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2328', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="bridging" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2315', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="bookmarkInactive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2302', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="bookmarkActive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2289', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="blockchain" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2276', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="bell" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2263', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="bank" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2250', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="backArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2237', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="average" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2224', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="avatar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2211', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="arrowsVertical" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2198', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="arrowsHorizontal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2185', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="arrowUp" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2172', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="arrowRight" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2159', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="arrowLeft" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2146', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="arrowDown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2133', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="api" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2120', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="annotation" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2107', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="allTimeHigh" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2094', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="airdrop" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=142-2081', {
  imports: ["import { Icon } from '@cbhq/cds-web/icons/Icon';"],
  props: {
    size: figma.enum('size', {
      'xs (12)': 'xs',
      's (16)': 's',
      'm (24)': 'm',
      'l (32)': 'l',
    }),
  },
  example: (props) => <Icon name="add" {...props} />,
});
