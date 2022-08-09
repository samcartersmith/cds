import React, { useMemo } from 'react';
import Tree from 'react-d3-tree';
import assert from 'assert';
import { css } from 'linaria';
import { Box } from '@cbhq/cds-web/layout/Box';

const treeDimension = css`
  height: 800px;
`;

const rootNodeStyle = css`
  & > circle {
    fill: red;
    r: 30;
  }
`;

const branchNodeStyle = css`
  & > circle {
    fill: blue;
    r: 20;
  }
`;

const leafNodeStyle = css`
  & > circle {
    fill: green;
    r: 35;
  }
`;

type TreeNode = {
  name: string;
  children?: TreeNode[];
  attributes?: {
    type: 'lead' | 'sub';
  };
  repeatChildrenIndices?: number[];
};

// Create a unique id for each decision
const errorIdToDecisionMap: Record<number, TreeNode> = {
  0: {
    name: 'What happened?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  1: {
    name: 'app unable to process a user request',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  2: {
    name: 'app unable to connect to the server',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  3: {
    name: 'What triggered the error?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  4: {
    name: 'When did the error occur?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  5: {
    name: 'User',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  6: {
    name: 'System',
    attributes: {
      type: 'sub',
    },
    repeatChildrenIndices: [4],
    children: [],
  },
  7: {
    name: 'Page load',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  8: {
    name: 'Task',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  9: {
    name: 'What was the user doing?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  10: {
    name: 'Did the page partially load?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  11: {
    name: 'At what point in the flow did the error occur?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  12: {
    name: 'Filling out a form',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  13: {
    name: 'Submitting a form',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  14: {
    name: 'Yes',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  15: {
    name: 'No',
    attributes: {
      type: 'sub',
    },
    children: [],
    repeatChildrenIndices: [36],
  },
  16: {
    name: 'Loading step',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  17: {
    name: 'Saving task',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  18: {
    name: 'More or less than 50%?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  19: {
    name: 'Was their data saved?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  20: {
    name: 'How was it saving?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  21: {
    name: 'More',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  22: {
    name: 'Less',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  23: {
    name: 'Yes',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  24: {
    name: 'No',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  25: {
    name: 'Background',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  26: {
    name: 'Blocking',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  27: {
    name: 'Can the user reload to solve the issue?',
    attributes: {
      type: 'lead',
    },
    children: [],
    repeatChildrenIndices: [15],
  },
  28: {
    name: 'Was money involved?',
    attributes: {
      type: 'lead',
    },
    children: [],
  },
  29: {
    name: 'Yes',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  30: {
    name: 'No',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  31: {
    name: 'Yes',
    attributes: {
      type: 'sub',
    },
    children: [],
  },
  32: {
    name: 'Text Input',
  },
  33: {
    name: 'Banner (inline)',
  },
  34: {
    name: 'Tray',
  },
  35: {
    name: 'Alert',
  },
  36: {
    name: 'Full Screen Modal',
  },
  37: {
    name: 'Toasts',
  },
  38: {
    name: 'In-App Notifications',
  },
  39: {
    name: 'Modal',
  },
};

const decisionGraph: Record<number, number[]> = {
  0: [1, 2],
  1: [3],
  2: [4],
  3: [5, 6],
  4: [7, 8],
  5: [9],
  6: [4],
  7: [10],
  8: [11],
  9: [12, 13],
  10: [23, 14, 15],
  11: [16, 17],
  12: [32],
  13: [33],
  14: [18],
  15: [36],
  16: [19],
  17: [20],
  18: [21, 22],
  19: [23, 24],
  20: [25, 26],
  21: [34],
  22: [27],
  23: [],
  24: [36],
  25: [28],
  26: [39],
  27: [29, 15],
  28: [30, 31],
  29: [35],
  30: [37],
  31: [38],
  32: [],
  33: [],
  34: [],
  35: [],
  36: [],
  37: [],
  38: [],
  39: [],
};

const dfs = (startId: number) => {
  if (!(startId in decisionGraph)) {
    assert(`Id:${startId} does not exist in decision graph`);
  }

  const queue: number[][] = [[startId, -1]];
  const visited: Record<number, boolean> = {};

  while (queue.length > 0) {
    const nodePair = queue.shift();

    if (nodePair !== undefined) {
      const node = nodePair[0];
      const parentNode = nodePair[1];

      visited[node] = true;

      if (parentNode in errorIdToDecisionMap) {
        errorIdToDecisionMap[parentNode].children?.push(errorIdToDecisionMap[node]);
      }

      for (const n of decisionGraph[node]) {
        if (!(n in visited)) {
          queue.splice(0, 0, [n, node] as number[]);
        }
      }
    }
  }

  for (const entry of Object.entries(errorIdToDecisionMap)) {
    const node = entry[1];
    if (node.repeatChildrenIndices) {
      for (const idx of node.repeatChildrenIndices) {
        node.children?.push(errorIdToDecisionMap[idx]);
      }
    }
  }

  return errorIdToDecisionMap[0];
};

export default function DecisionTree() {
  const separation = useMemo(() => {
    return {
      siblings: 3,
    };
  }, []);

  const [treeData] = React.useState<TreeNode>(dfs(0));

  // useEffect(() => {
  //   console.log(dfs(0));
  // }, []);

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <Box id="treeWrapper" maxWidth="100%" minHeight={800}>
      <Tree
        separation={separation}
        pathFunc="step"
        orientation="vertical"
        shouldCollapseNeighborNodes
        svgClassName={treeDimension}
        rootNodeClassName={rootNodeStyle}
        branchNodeClassName={branchNodeStyle}
        leafNodeClassName={leafNodeStyle}
        data={treeData}
      />
    </Box>
  );
}
