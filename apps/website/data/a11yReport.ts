/**
 * DO NOT MODIFY
 * Generated from yarn storybook a11y
 */

export const a11yReport = {
  timestamp: '2022-03-23T16:59:50.113Z',
  report: [
    {
      id: 'core-components-switchers-appswitcher--app-switcher',
      name: 'App Switcher',
      title: 'Core Components/Switchers/AppSwitcher',
      kind: 'Core Components/Switchers/AppSwitcher',
      violations: [
        {
          id: 'aria-allowed-attr',
          impact: 'critical',
          tags: ['cat.aria', 'wcag2a', 'wcag412'],
          description: "Ensures ARIA attributes are allowed for an element's role",
          help: 'Elements must only use allowed ARIA attributes',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="ew6yyg130vv" aria-haspopup="dialog">',
              target: ['.sfo71e8'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
          ],
        },
      ],
      passes: 10,
    },
    {
      id: 'core-components-switchers-appswitcher--app-switcher-with-dot',
      name: 'App Switcher With Dot',
      title: 'Core Components/Switchers/AppSwitcher',
      kind: 'Core Components/Switchers/AppSwitcher',
      violations: [
        {
          id: 'aria-allowed-attr',
          impact: 'critical',
          tags: ['cat.aria', 'wcag2a', 'wcag412'],
          description: "Ensures ARIA attributes are allowed for an element's role",
          help: 'Elements must only use allowed ARIA attributes',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="bgxsfa5pow8" aria-haspopup="dialog">',
              target: ['.sfo71e8'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
          ],
        },
      ],
      passes: 10,
    },
    {
      id: 'core-components-recipes-navigationbarwithswitchers--navigation-bar-with-switchers',
      name: 'Navigation Bar With Switchers',
      title: 'Core Components/Recipes/NavigationBarWithSwitchers',
      kind: 'Core Components/Recipes/NavigationBarWithSwitchers',
      violations: [
        {
          id: 'aria-allowed-attr',
          impact: 'critical',
          tags: ['cat.aria', 'wcag2a', 'wcag412'],
          description: "Ensures ARIA attributes are allowed for an element's role",
          help: 'Elements must only use allowed ARIA attributes',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="75pa24a0y9x" aria-haspopup="dialog">',
              target: ['div[aria-controls="75pa24a0y9x"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="xmk2nks7ii" aria-haspopup="dialog">',
              target: ['div[aria-controls="xmk2nks7ii"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
          ],
        },
        {
          id: 'heading-order',
          impact: 'moderate',
          tags: ['cat.semantics', 'best-practice'],
          description: 'Ensures the order of headings is semantically correct',
          help: 'Heading levels should only increase by one',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/heading-order?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'heading-order',
                  data: null,
                  relatedNodes: [],
                  impact: 'moderate',
                  message: 'Heading order invalid',
                },
              ],
              all: [],
              none: [],
              impact: 'moderate',
              html: '<h3 class="t160640o h1hmspdn f1eacfne t5418vf sjo1exx t41rhkw">Brian</h3>',
              target: ['h3'],
              failureSummary: 'Fix any of the following:\n  Heading order invalid',
            },
          ],
        },
      ],
      passes: 17,
    },
    {
      id: 'core-components-switchers-userswitcher--user-switcher',
      name: 'User Switcher',
      title: 'Core Components/Switchers/UserSwitcher',
      kind: 'Core Components/Switchers/UserSwitcher',
      violations: [
        {
          id: 'aria-allowed-attr',
          impact: 'critical',
          tags: ['cat.aria', 'wcag2a', 'wcag412'],
          description: "Ensures ARIA attributes are allowed for an element's role",
          help: 'Elements must only use allowed ARIA attributes',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="7ajh7gs5wi6" aria-haspopup="dialog">',
              target: ['.sfo71e8'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
          ],
        },
      ],
      passes: 15,
    },
    {
      id: 'core-components-accordion--basic-accordion',
      name: 'Basic Accordion',
      title: 'Core Components/Accordion',
      kind: 'Core Components/Accordion',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-accordion--long-content',
      name: 'Long Content',
      title: 'Core Components/Accordion',
      kind: 'Core Components/Accordion',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-accordion--no-media',
      name: 'No Media',
      title: 'Core Components/Accordion',
      kind: 'Core Components/Accordion',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-accordion--no-subtitle',
      name: 'No Subtitle',
      title: 'Core Components/Accordion',
      kind: 'Core Components/Accordion',
      violations: [],
      passes: 21,
    },
    {
      id: 'core-components-accordion--title-only',
      name: 'Title Only',
      title: 'Core Components/Accordion',
      kind: 'Core Components/Accordion',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-buttons-avatarbutton--default',
      name: 'Default',
      title: 'Core Components/Buttons/AvatarButton',
      kind: 'Core Components/Buttons/AvatarButton',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-buttons-avatarbutton--loading',
      name: 'Loading',
      title: 'Core Components/Buttons/AvatarButton',
      kind: 'Core Components/Buttons/AvatarButton',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-buttons-button-frontier--all',
      name: 'All',
      title: 'Core Components/Buttons/Button (Frontier)',
      kind: 'Core Components/Buttons/Button (Frontier)',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-buttons-button-frontier--default',
      name: 'Default',
      title: 'Core Components/Buttons/Button (Frontier)',
      kind: 'Core Components/Buttons/Button (Frontier)',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-buttons-button-frontier--html-button',
      name: 'Html Button',
      title: 'Core Components/Buttons/Button (Frontier)',
      kind: 'Core Components/Buttons/Button (Frontier)',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-buttons-navigationiconbutton-frontier--all',
      name: 'All',
      title: 'Core Components/Buttons/NavigationIconButton (Frontier)',
      kind: 'Core Components/Buttons/NavigationIconButton (Frontier)',
      violations: [],
      passes: 11,
    },
    {
      id: 'core-components-buttons-navigationiconbutton-frontier--default',
      name: 'Default',
      title: 'Core Components/Buttons/NavigationIconButton (Frontier)',
      kind: 'Core Components/Buttons/NavigationIconButton (Frontier)',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-buttons-tilebutton--tile-button-pictogram',
      name: 'Tile Button Pictogram',
      title: 'Core Components/Buttons/TileButton',
      kind: 'Core Components/Buttons/TileButton',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-cards-announcementcard--default',
      name: 'Default',
      title: 'Core Components/Cards/AnnouncementCard',
      kind: 'Core Components/Cards/AnnouncementCard',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-cards-announcementcard--horizontal',
      name: 'Horizontal',
      title: 'Core Components/Cards/AnnouncementCard',
      kind: 'Core Components/Cards/AnnouncementCard',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-cards-announcementcard--vertical',
      name: 'Vertical',
      title: 'Core Components/Cards/AnnouncementCard',
      kind: 'Core Components/Cards/AnnouncementCard',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-cards-featureentrycard--default',
      name: 'Default',
      title: 'Core Components/Cards/FeatureEntryCard',
      kind: 'Core Components/Cards/FeatureEntryCard',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-cards-featureentrycard--horizontal',
      name: 'Horizontal',
      title: 'Core Components/Cards/FeatureEntryCard',
      kind: 'Core Components/Cards/FeatureEntryCard',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-cards-featureentrycard--vertical',
      name: 'Vertical',
      title: 'Core Components/Cards/FeatureEntryCard',
      kind: 'Core Components/Cards/FeatureEntryCard',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-cards-feedcard--default',
      name: 'Default',
      title: 'Core Components/Cards/FeedCard',
      kind: 'Core Components/Cards/FeedCard',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-cards-feedcard--horizontal',
      name: 'Horizontal',
      title: 'Core Components/Cards/FeedCard',
      kind: 'Core Components/Cards/FeedCard',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-cards-feedcard--vertical',
      name: 'Vertical',
      title: 'Core Components/Cards/FeedCard',
      kind: 'Core Components/Cards/FeedCard',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-cells-contentcell--content',
      name: 'Content',
      title: 'Core Components/Cells/ContentCell',
      kind: 'Core Components/Cells/ContentCell',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-cells-contentcell--long-content',
      name: 'Long Content',
      title: 'Core Components/Cells/ContentCell',
      kind: 'Core Components/Cells/ContentCell',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-cells-contentcell--pressable-content',
      name: 'Pressable Content',
      title: 'Core Components/Cells/ContentCell',
      kind: 'Core Components/Cells/ContentCell',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-cells-contentcell--with-accessory',
      name: 'With Accessory',
      title: 'Core Components/Cells/ContentCell',
      kind: 'Core Components/Cells/ContentCell',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-cells-contentcell--with-media',
      name: 'With Media',
      title: 'Core Components/Cells/ContentCell',
      kind: 'Core Components/Cells/ContentCell',
      violations: [],
      passes: 11,
    },
    {
      id: 'core-components-cells-contentcellfallback--fallbacks',
      name: 'Fallbacks',
      title: 'Core Components/Cells/ContentCellFallback',
      kind: 'Core Components/Cells/ContentCellFallback',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-cells-listcell--compact-content',
      name: 'Compact Content',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-cells-listcell--compact-pressable-content',
      name: 'Compact Pressable Content',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-cells-listcell--content',
      name: 'Content',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-cells-listcell--long-content',
      name: 'Long Content',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-cells-listcell--pressable-content',
      name: 'Pressable Content',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-cells-listcell--priority-content',
      name: 'Priority Content',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-cells-listcell--with-accessory',
      name: 'With Accessory',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-cells-listcell--with-actions',
      name: 'With Actions',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [
        {
          id: 'aria-allowed-attr',
          impact: 'critical',
          tags: ['cat.aria', 'wcag2a', 'wcag412'],
          description: "Ensures ARIA attributes are allowed for an element's role",
          help: 'Elements must only use allowed ARIA attributes',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-required="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-required="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input class="c1baze8m poigcwi" type="checkbox" aria-checked="true" aria-disabled="false" aria-readonly="false" aria-required="false" role="switch" accessibilitylabel="Checkbox" value="" checked="">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-required="false"',
            },
          ],
        },
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input class="c1baze8m poigcwi" type="checkbox" aria-checked="true" aria-disabled="false" aria-readonly="false" aria-required="false" role="switch" accessibilitylabel="Checkbox" value="" checked="">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 13,
    },
    {
      id: 'core-components-cells-listcell--with-intermediary',
      name: 'With Intermediary',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-cells-listcell--with-media',
      name: 'With Media',
      title: 'Core Components/Cells/ListCell',
      kind: 'Core Components/Cells/ListCell',
      violations: [],
      passes: 11,
    },
    {
      id: 'core-components-cells-listcellfallback--fallbacks',
      name: 'Fallbacks',
      title: 'Core Components/Cells/ListCellFallback',
      kind: 'Core Components/Cells/ListCellFallback',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-collapsible--basic-collapsible',
      name: 'Basic Collapsible',
      title: 'Core Components/Collapsible',
      kind: 'Core Components/Collapsible',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-collapsible--default-expanded',
      name: 'Default Expanded',
      title: 'Core Components/Collapsible',
      kind: 'Core Components/Collapsible',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-collapsible--horizontal',
      name: 'Horizontal',
      title: 'Core Components/Collapsible',
      kind: 'Core Components/Collapsible',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-collapsible--reveal-top',
      name: 'Reveal Top',
      title: 'Core Components/Collapsible',
      kind: 'Core Components/Collapsible',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-collapsible--scroll',
      name: 'Scroll',
      title: 'Core Components/Collapsible',
      kind: 'Core Components/Collapsible',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-inputs-helpertext--message-area-basic',
      name: 'Message Area Basic',
      title: 'Core Components/Inputs/HelperText',
      kind: 'Core Components/Inputs/HelperText',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-inputs-helpertext--message-area-color',
      name: 'Message Area Color',
      title: 'Core Components/Inputs/HelperText',
      kind: 'Core Components/Inputs/HelperText',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-inputs-helpertext--text-align',
      name: 'Text Align',
      title: 'Core Components/Inputs/HelperText',
      kind: 'Core Components/Inputs/HelperText',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-inputs-inputicon--add-custom-color',
      name: 'Add Custom Color',
      title: 'Core Components/Inputs/InputIcon',
      kind: 'Core Components/Inputs/InputIcon',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-inputs-inputicon--add-custom-color-end',
      name: 'Add Custom Color End',
      title: 'Core Components/Inputs/InputIcon',
      kind: 'Core Components/Inputs/InputIcon',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-inputs-inputicon--basic',
      name: 'Basic',
      title: 'Core Components/Inputs/InputIcon',
      kind: 'Core Components/Inputs/InputIcon',
      violations: [
        {
          id: 'duplicate-id-aria',
          impact: 'critical',
          tags: ['cat.parsing', 'wcag2a', 'wcag411'],
          description: 'Ensures every id attribute value used in ARIA and in labels is unique',
          help: 'IDs used in ARIA and labels must be unique',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/duplicate-id-aria?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'duplicate-id-aria',
                  data: 'Label',
                  relatedNodes: [
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-2scsohseia" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(2) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
                      ],
                    },
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-q46czkze0e" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(3) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
                      ],
                    },
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-y9flm4lnybc" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(4) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
                      ],
                    },
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-3yckjjti87l" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(5) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
                      ],
                    },
                  ],
                  impact: 'critical',
                  message:
                    'Document has multiple elements referenced with ARIA with the same id attribute: Label',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-label="Label" aria-describedby="cds-textinput-description-69vi0ou31fo" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
              target: [
                '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(1) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
              ],
              failureSummary:
                'Fix any of the following:\n  Document has multiple elements referenced with ARIA with the same id attribute: Label',
            },
          ],
        },
      ],
      passes: 12,
    },
    {
      id: 'core-components-inputs-inputicon--basic-end',
      name: 'Basic End',
      title: 'Core Components/Inputs/InputIcon',
      kind: 'Core Components/Inputs/InputIcon',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-inputs-inputicon--defaults-to-foreground',
      name: 'Defaults To Foreground',
      title: 'Core Components/Inputs/InputIcon',
      kind: 'Core Components/Inputs/InputIcon',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-inputs-inputicon--invalid-placement',
      name: 'Invalid Placement',
      title: 'Core Components/Inputs/InputIcon',
      kind: 'Core Components/Inputs/InputIcon',
      violations: [],
      passes: 5,
    },
    {
      id: 'core-components-inputs-inputicon--set-color-and-inherit-focus-style',
      name: 'Set Color And Inherit Focus Style',
      title: 'Core Components/Inputs/InputIcon',
      kind: 'Core Components/Inputs/InputIcon',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-inputs-inputiconbutton--add-custom-color',
      name: 'Add Custom Color',
      title: 'Core Components/Inputs/InputIconButton',
      kind: 'Core Components/Inputs/InputIconButton',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-inputs-inputiconbutton--add-custom-color-end',
      name: 'Add Custom Color End',
      title: 'Core Components/Inputs/InputIconButton',
      kind: 'Core Components/Inputs/InputIconButton',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-inputs-inputiconbutton--basic',
      name: 'Basic',
      title: 'Core Components/Inputs/InputIconButton',
      kind: 'Core Components/Inputs/InputIconButton',
      violations: [
        {
          id: 'duplicate-id-aria',
          impact: 'critical',
          tags: ['cat.parsing', 'wcag2a', 'wcag411'],
          description: 'Ensures every id attribute value used in ARIA and in labels is unique',
          help: 'IDs used in ARIA and labels must be unique',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/duplicate-id-aria?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'duplicate-id-aria',
                  data: 'Label',
                  relatedNodes: [
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-2otxey9n2gw" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(2) > .r45vtfp.f13ygna6 > .i68rftm > .i769vsc.iku8viz.ieg5chz > input',
                      ],
                    },
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-ngnpfv4dd4" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(3) > .r45vtfp.f13ygna6 > .i68rftm > .i769vsc.iku8viz.ieg5chz > input',
                      ],
                    },
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-ap12sylwual" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(4) > .r45vtfp.f13ygna6 > .i68rftm > .i769vsc.iku8viz.ieg5chz > input',
                      ],
                    },
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-1hiz7tqwk7l" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(5) > .r45vtfp.f13ygna6 > .i68rftm > .i769vsc.iku8viz.ieg5chz > input',
                      ],
                    },
                  ],
                  impact: 'critical',
                  message:
                    'Document has multiple elements referenced with ARIA with the same id attribute: Label',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-label="Label" aria-describedby="cds-textinput-description-bbbnh8h2do" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" id="Label" style="text-align: start;">',
              target: [
                '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(1) > .r45vtfp.f13ygna6 > .i68rftm > .i769vsc.iku8viz.ieg5chz > input',
              ],
              failureSummary:
                'Fix any of the following:\n  Document has multiple elements referenced with ARIA with the same id attribute: Label',
            },
          ],
        },
      ],
      passes: 14,
    },
    {
      id: 'core-components-inputs-inputiconbutton--basic-end',
      name: 'Basic End',
      title: 'Core Components/Inputs/InputIconButton',
      kind: 'Core Components/Inputs/InputIconButton',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-inputs-inputiconbutton--defaults-to-primary',
      name: 'Defaults To Primary',
      title: 'Core Components/Inputs/InputIconButton',
      kind: 'Core Components/Inputs/InputIconButton',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-inputs-inputiconbutton--invalid-placement',
      name: 'Invalid Placement',
      title: 'Core Components/Inputs/InputIconButton',
      kind: 'Core Components/Inputs/InputIconButton',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-inputs-inputiconbutton--set-color-and-inherit-focus-style',
      name: 'Set Color And Inherit Focus Style',
      title: 'Core Components/Inputs/InputIconButton',
      kind: 'Core Components/Inputs/InputIconButton',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-inputs-inputlabel--input-label-basic',
      name: 'Input Label Basic',
      title: 'Core Components/Inputs/InputLabel',
      kind: 'Core Components/Inputs/InputLabel',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-inputs-inputlabel--input-label-dangerously-set-class-name',
      name: 'Input Label Dangerously Set Class Name',
      title: 'Core Components/Inputs/InputLabel',
      kind: 'Core Components/Inputs/InputLabel',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-inputs-inputlabel--input-label-text-alignments',
      name: 'Input Label Text Alignments',
      title: 'Core Components/Inputs/InputLabel',
      kind: 'Core Components/Inputs/InputLabel',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-inputs-inputlabel--label-color',
      name: 'Label Color',
      title: 'Core Components/Inputs/InputLabel',
      kind: 'Core Components/Inputs/InputLabel',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-inputstack--append',
      name: 'Append',
      title: 'Core Components/InputStack',
      kind: 'Core Components/InputStack',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#098551',
                    contrastRatio: 4.2,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p41xkb9 it312lv"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">StartContent</p></div>',
                      target: ['.p41xkb9.it312lv.f13ygna6:nth-child(1)'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">StartContent</p>',
              target: ['.p41xkb9.it312lv.f13ygna6:nth-child(1) > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#098551',
                    contrastRatio: 4.2,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p41xkb9 it312lv"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">EndContent</p></div>',
                      target: ['.p41xkb9.it312lv.f13ygna6:nth-child(3)'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">EndContent</p>',
              target: ['.p41xkb9.it312lv.f13ygna6:nth-child(3) > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#0052ff',
                    contrastRatio: 3.42,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p102s7wl it312lv"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">Append</p></div>',
                      target: ['.p102s7wl'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 3.42 (foreground color: #0a0b0d, background color: #0052ff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">Append</p>',
              target: ['.p102s7wl > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 3.42 (foreground color: #0a0b0d, background color: #0052ff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 7,
    },
    {
      id: 'core-components-inputstack--input-stack-examples',
      name: 'Input Stack Examples',
      title: 'Core Components/InputStack',
      kind: 'Core Components/InputStack',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#0052ff',
                    contrastRatio: 3.42,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p102s7wl"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">Prepend</p></div>',
                      target: ['.p102s7wl.f13ygna6:nth-child(1)'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 3.42 (foreground color: #0a0b0d, background color: #0052ff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">Prepend</p>',
              target: ['.p102s7wl.f13ygna6:nth-child(1) > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 3.42 (foreground color: #0a0b0d, background color: #0052ff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#098551',
                    contrastRatio: 4.2,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p41xkb9 it312lv"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">StartContent</p></div>',
                      target: ['.p41xkb9.it312lv.f13ygna6:nth-child(1)'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">StartContent</p>',
              target: ['.p41xkb9.it312lv.f13ygna6:nth-child(1) > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#098551',
                    contrastRatio: 4.2,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p41xkb9 it312lv"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">EndContent</p></div>',
                      target: ['.p41xkb9.it312lv.f13ygna6:nth-child(3)'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">EndContent</p>',
              target: ['.p41xkb9.it312lv.f13ygna6:nth-child(3) > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#0052ff',
                    contrastRatio: 3.42,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p102s7wl"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">Append</p></div>',
                      target: ['.p102s7wl.f13ygna6:nth-child(3)'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 3.42 (foreground color: #0a0b0d, background color: #0052ff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">Append</p>',
              target: ['.p102s7wl.f13ygna6:nth-child(3) > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 3.42 (foreground color: #0a0b0d, background color: #0052ff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 7,
    },
    {
      id: 'core-components-inputstack--prepend',
      name: 'Prepend',
      title: 'Core Components/InputStack',
      kind: 'Core Components/InputStack',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#0052ff',
                    contrastRatio: 3.42,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p102s7wl it312lv"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">Append</p></div>',
                      target: ['.p102s7wl'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 3.42 (foreground color: #0a0b0d, background color: #0052ff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">Append</p>',
              target: ['.p102s7wl > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 3.42 (foreground color: #0a0b0d, background color: #0052ff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#098551',
                    contrastRatio: 4.2,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p41xkb9 it312lv"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">StartContent</p></div>',
                      target: ['.p41xkb9.it312lv.f13ygna6:nth-child(1)'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">StartContent</p>',
              target: ['.p41xkb9.it312lv.f13ygna6:nth-child(1) > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#0a0b0d',
                    bgColor: '#098551',
                    contrastRatio: 4.2,
                    fontSize: '12.0pt (16px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [
                    {
                      html: '<div class="f13ygna6 p41xkb9 it312lv"><p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">EndContent</p></div>',
                      target: ['.p41xkb9.it312lv.f13ygna6:nth-child(3)'],
                    },
                  ],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<p class="t160640o bw3lfah f1eacfne t5418vf sjo1exx">EndContent</p>',
              target: ['.p41xkb9.it312lv.f13ygna6:nth-child(3) > .t160640o.bw3lfah.f1eacfne'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 4.2 (foreground color: #0a0b0d, background color: #098551, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 7,
    },
    {
      id: 'core-components-inputs-nativeinput--native-input-actions',
      name: 'Native Input Actions',
      title: 'Core Components/Inputs/NativeInput',
      kind: 'Core Components/Inputs/NativeInput',
      violations: [
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 10,
    },
    {
      id: 'core-components-inputs-nativeinput--native-input-basic',
      name: 'Native Input Basic',
      title: 'Core Components/Inputs/NativeInput',
      kind: 'Core Components/Inputs/NativeInput',
      violations: [
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 10,
    },
    {
      id: 'core-components-inputs-nativeinput--native-input-custom-container-spacing',
      name: 'Native Input Custom Container Spacing',
      title: 'Core Components/Inputs/NativeInput',
      kind: 'Core Components/Inputs/NativeInput',
      violations: [
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input class="n1re6qxo bw3lfah _12x2frn _czghws _14apokp _oepdog" tabindex="0" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 10,
    },
    {
      id: 'core-components-inputs-nativeinput--native-input-text-align',
      name: 'Native Input Text Align',
      title: 'Core Components/Inputs/NativeInput',
      kind: 'Core Components/Inputs/NativeInput',
      violations: [],
      passes: 11,
    },
    {
      id: 'core-components-inputs-searchinput--basic',
      name: 'Basic',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-024ls3kjzrz" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" placeholder="Placeholder" value="Value" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
      ],
      passes: 13,
    },
    {
      id: 'core-components-inputs-searchinput--borderless',
      name: 'Borderless',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-0za70x05qa6" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-describedby="cds-textinput-description-0za70x05qa6" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 9,
    },
    {
      id: 'core-components-inputs-searchinput--compact',
      name: 'Compact',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [],
      passes: 11,
    },
    {
      id: 'core-components-inputs-searchinput--custom-ref',
      name: 'Custom Ref',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-xb0py7q1zh" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-describedby="cds-textinput-description-xb0py7q1zh" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 9,
    },
    {
      id: 'core-components-inputs-searchinput--disabled',
      name: 'Disabled',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-zfw69qtuqji" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" disabled="" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-describedby="cds-textinput-description-zfw69qtuqji" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" disabled="" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 9,
    },
    {
      id: 'core-components-inputs-searchinput--display-value',
      name: 'Display Value',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-zxa5sdh2o1h" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-describedby="cds-textinput-description-zxa5sdh2o1h" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 9,
    },
    {
      id: 'core-components-inputs-searchinput--hide-start-icon',
      name: 'Hide Start Icon',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-56ugh66l4va" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-describedby="cds-textinput-description-56ugh66l4va" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 9,
    },
    {
      id: 'core-components-inputs-searchinput--hide-start-icon-search-example',
      name: 'Hide Start Icon Search Example',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-ekbszau3zo" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" role="searchbox" type="search" placeholder="Placeholder" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
      ],
      passes: 13,
    },
    {
      id: 'core-components-inputs-searchinput--on-blur',
      name: 'On Blur',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-vz26c0b9xya" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" placeholder="Placeholder" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
      ],
      passes: 10,
    },
    {
      id: 'core-components-inputs-searchinput--on-change-example',
      name: 'On Change Example',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-s334bbxo1wq" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-describedby="cds-textinput-description-s334bbxo1wq" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 9,
    },
    {
      id: 'core-components-inputs-searchinput--on-clear',
      name: 'On Clear',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-2a8ln48o67n" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" placeholder="Placeholder" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
      ],
      passes: 10,
    },
    {
      id: 'core-components-inputs-searchinput--on-focus',
      name: 'On Focus',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-2hpe49mnwqm" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" placeholder="Placeholder" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
      ],
      passes: 10,
    },
    {
      id: 'core-components-inputs-searchinput--on-search',
      name: 'On Search',
      title: 'Core Components/Inputs/SearchInput',
      kind: 'Core Components/Inputs/SearchInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-436olyr9wd2" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" placeholder="Hit Enter to see the string logged to console" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
      ],
      passes: 10,
    },
    {
      id: 'core-components-inputs-select--compact',
      name: 'Compact',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--dark-compact',
      name: 'Dark Compact',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--dark-disabled',
      name: 'Dark Disabled',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--dark-input-stack-options',
      name: 'Dark Input Stack Options',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--dark-mode',
      name: 'Dark Mode',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-inputs-select--dark-variants',
      name: 'Dark Variants',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--default',
      name: 'Default',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-inputs-select--dense',
      name: 'Dense',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-inputs-select--dense-compact',
      name: 'Dense Compact',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--dense-disabled',
      name: 'Dense Disabled',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--dense-input-stack-options',
      name: 'Dense Input Stack Options',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--dense-variants',
      name: 'Dense Variants',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--disabled',
      name: 'Disabled',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--input-stack-options',
      name: 'Input Stack Options',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-select--variants',
      name: 'Variants',
      title: 'Core Components/Inputs/Select',
      kind: 'Core Components/Inputs/Select',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-textinput--align',
      name: 'Align',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [
        {
          id: 'duplicate-id-aria',
          impact: 'critical',
          tags: ['cat.parsing', 'wcag2a', 'wcag411'],
          description: 'Ensures every id attribute value used in ARIA and in labels is unique',
          help: 'IDs used in ARIA and labels must be unique',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/duplicate-id-aria?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'duplicate-id-aria',
                  data: 'Label',
                  relatedNodes: [
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-33ib2lmh1mx" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" id="Label" placeholder="placeholder" style="text-align: end;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(2) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
                      ],
                    },
                  ],
                  impact: 'critical',
                  message:
                    'Document has multiple elements referenced with ARIA with the same id attribute: Label',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-label="Label" aria-describedby="cds-textinput-description-p9zn9krdmx" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" id="Label" placeholder="placeholder" style="text-align: start;">',
              target: [
                '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(1) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
              ],
              failureSummary:
                'Fix any of the following:\n  Document has multiple elements referenced with ARIA with the same id attribute: Label',
            },
          ],
        },
      ],
      passes: 14,
    },
    {
      id: 'core-components-inputs-textinput--basic',
      name: 'Basic',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-inputs-textinput--border-radius',
      name: 'Border Radius',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-inputs-textinput--borderless',
      name: 'Borderless',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-inputs-textinput--compact-helper-text',
      name: 'Compact Helper Text',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-inputs-textinput--compact-input',
      name: 'Compact Input',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-textinput--compact-input-end',
      name: 'Compact Input End',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-inputs-textinput--compact-input-start',
      name: 'Compact Input Start',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-inputs-textinput--compact-input-suffix',
      name: 'Compact Input Suffix',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-inputs-textinput--copy-text-input',
      name: 'Copy Text Input',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 17,
    },
    {
      id: 'core-components-inputs-textinput--disabled',
      name: 'Disabled',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [
        {
          id: 'duplicate-id-aria',
          impact: 'critical',
          tags: ['cat.parsing', 'wcag2a', 'wcag411'],
          description: 'Ensures every id attribute value used in ARIA and in labels is unique',
          help: 'IDs used in ARIA and labels must be unique',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/duplicate-id-aria?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'duplicate-id-aria',
                  data: 'Label',
                  relatedNodes: [
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-dn4zv56vvif" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" disabled="" id="Label" style="text-align: start;">',
                      target: ['._15bc7a9'],
                    },
                  ],
                  impact: 'critical',
                  message:
                    'Document has multiple elements referenced with ARIA with the same id attribute: Label',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-label="Label" aria-describedby="cds-textinput-description-awhw8dkysy" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" disabled="" id="Label" style="text-align: start;">',
              target: ['._1vh1yhf'],
              failureSummary:
                'Fix any of the following:\n  Document has multiple elements referenced with ARIA with the same id attribute: Label',
            },
          ],
        },
      ],
      passes: 13,
    },
    {
      id: 'core-components-inputs-textinput--end-content',
      name: 'End Content',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-inputs-textinput--height',
      name: 'Height',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-inputs-textinput--helper-text',
      name: 'Helper Text',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-inputs-textinput--input-on-change',
      name: 'Input On Change',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-inputs-textinput--no-label',
      name: 'No Label',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-mc2o8g6gut8" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-describedby="cds-textinput-description-mc2o8g6gut8" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 9,
    },
    {
      id: 'core-components-inputs-textinput--placeholder',
      name: 'Placeholder',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-inputs-textinput--render-input-compact',
      name: 'Render Input Compact',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input class="n1i2hyg0" style="width: 100%; border-radius: 8px;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 11,
    },
    {
      id: 'core-components-inputs-textinput--render-input-default',
      name: 'Render Input Default',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input class="n1i2hyg0" style="width: 100%; border-radius: 8px;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 11,
    },
    {
      id: 'core-components-inputs-textinput--render-input-disabled',
      name: 'Render Input Disabled',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input class="n1i2hyg0" disabled="" value="Custom Input" style="width: 100%; border-radius: 8px;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 11,
    },
    {
      id: 'core-components-inputs-textinput--render-native-text-area',
      name: 'Render Native Text Area',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<textarea class="n8pqtx8 bw3lfah _1vh1yhf" tabindex="0" rows="7" cols="5" style="resize: none;"></textarea>',
              target: ['textarea'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 12,
    },
    {
      id: 'core-components-inputs-textinput--render-native-text-area-custom-spacing',
      name: 'Render Native Text Area Custom Spacing',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<textarea class="n8pqtx8 bw3lfah _79f347" tabindex="0" rows="7" cols="5" style="resize: none;"></textarea>',
              target: ['textarea'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 12,
    },
    {
      id: 'core-components-inputs-textinput--start-content',
      name: 'Start Content',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-inputs-textinput--suffix',
      name: 'Suffix',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 14,
    },
    {
      id: 'core-components-inputs-textinput--suffix-and-end-content',
      name: 'Suffix And End Content',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-inputs-textinput--variants',
      name: 'Variants',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [
        {
          id: 'duplicate-id-aria',
          impact: 'critical',
          tags: ['cat.parsing', 'wcag2a', 'wcag411'],
          description: 'Ensures every id attribute value used in ARIA and in labels is unique',
          help: 'IDs used in ARIA and labels must be unique',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/duplicate-id-aria?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'duplicate-id-aria',
                  data: 'Label',
                  relatedNodes: [
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-41coulgabi8" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" id="Label" placeholder="placeholder" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(2) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
                      ],
                    },
                    {
                      html: '<input aria-label="Label" aria-describedby="cds-textinput-description-nuc8q9lxte" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" id="Label" placeholder="placeholder" style="text-align: start;">',
                      target: [
                        '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(3) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
                      ],
                    },
                  ],
                  impact: 'critical',
                  message:
                    'Document has multiple elements referenced with ARIA with the same id attribute: Label',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-label="Label" aria-describedby="cds-textinput-description-x7m00w4zrrm" class="n1re6qxo bw3lfah _1vh1yhf" tabindex="0" id="Label" placeholder="placeholder" style="text-align: start;">',
              target: [
                '.c1wa27ul.f13ygna6[data-testid=""]:nth-child(1) > .r45vtfp.f13ygna6 > .i68rftm > .i1mid3m6.i769vsc.tnurl35 > input',
              ],
              failureSummary:
                'Fix any of the following:\n  Document has multiple elements referenced with ARIA with the same id attribute: Label',
            },
          ],
        },
      ],
      passes: 14,
    },
    {
      id: 'core-components-inputs-textinput--width',
      name: 'Width',
      title: 'Core Components/Inputs/TextInput',
      kind: 'Core Components/Inputs/TextInput',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-dots-dotcount--dot-count-basic',
      name: 'Dot Count Basic',
      title: 'Core Components/Dots/DotCount',
      kind: 'Core Components/Dots/DotCount',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-dots-dotcount--dot-count-placements',
      name: 'Dot Count Placements',
      title: 'Core Components/Dots/DotCount',
      kind: 'Core Components/Dots/DotCount',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-dots-dotcount--dot-count-variant',
      name: 'Dot Count Variant',
      title: 'Core Components/Dots/DotCount',
      kind: 'Core Components/Dots/DotCount',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-dots-dotstatuscolor--dot-status-color-basic',
      name: 'Dot Status Color Basic',
      title: 'Core Components/Dots/DotStatusColor',
      kind: 'Core Components/Dots/DotStatusColor',
      violations: [],
      passes: 5,
    },
    {
      id: 'core-components-dots-dotstatuscolor--dot-status-color-placements',
      name: 'Dot Status Color Placements',
      title: 'Core Components/Dots/DotStatusColor',
      kind: 'Core Components/Dots/DotStatusColor',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-dots-dotstatuscolor--dot-status-color-sizes',
      name: 'Dot Status Color Sizes',
      title: 'Core Components/Dots/DotStatusColor',
      kind: 'Core Components/Dots/DotStatusColor',
      violations: [],
      passes: 5,
    },
    {
      id: 'core-components-dots-dotstatuscolor--dot-status-color-variant',
      name: 'Dot Status Color Variant',
      title: 'Core Components/Dots/DotStatusColor',
      kind: 'Core Components/Dots/DotStatusColor',
      violations: [],
      passes: 5,
    },
    {
      id: 'core-components-dots-dotsymbol--dot-symbol-placements',
      name: 'Dot Symbol Placements',
      title: 'Core Components/Dots/DotSymbol',
      kind: 'Core Components/Dots/DotSymbol',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-dots-dotsymbol--dot-symbol-sizes',
      name: 'Dot Symbol Sizes',
      title: 'Core Components/Dots/DotSymbol',
      kind: 'Core Components/Dots/DotSymbol',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-icon-sheet--icon-sheet',
      name: 'Icon Sheet',
      title: 'Core Components/Icon Sheet',
      kind: 'Core Components/Icon Sheet',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-logo-sheet--logo-sheet',
      name: 'Logo Sheet',
      title: 'Core Components/Logo Sheet',
      kind: 'Core Components/Logo Sheet',
      violations: [],
      passes: 9,
    },
    {
      id: 'core-components-illustration--list-illustrations',
      name: 'List Illustrations',
      title: 'Core Components/Illustration',
      kind: 'Core Components/Illustration',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-card--dark-mode-pinned-left-card',
      name: 'Dark Mode Pinned Left Card',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-card--dark-mode-pinned-right-card',
      name: 'Dark Mode Pinned Right Card',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-card--dark-mode-pinned-top-card',
      name: 'Dark Mode Pinned Top Card',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-card--dark-mode-pressable-cards',
      name: 'Dark Mode Pressable Cards',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-card--dark-mode-pressable-colored-cards',
      name: 'Dark Mode Pressable Colored Cards',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-card--feed-card-example',
      name: 'Feed Card Example',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-card--non-clickable-cards',
      name: 'Non Clickable Cards',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 9,
    },
    {
      id: 'core-components-card--non-clickable-colored-cards',
      name: 'Non Clickable Colored Cards',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-card--pinned-bottom-card',
      name: 'Pinned Bottom Card',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-card--pinned-left-card',
      name: 'Pinned Left Card',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-card--pinned-right-card',
      name: 'Pinned Right Card',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-card--pinned-top-card',
      name: 'Pinned Top Card',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-card--pressable-cards',
      name: 'Pressable Cards',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-card--pressable-colored-cards',
      name: 'Pressable Colored Cards',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-card--spot-square-example',
      name: 'Spot Square Example',
      title: 'Core Components/Card',
      kind: 'Core Components/Card',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-avatar--fallback',
      name: 'Fallback',
      title: 'Core Components/Avatar',
      kind: 'Core Components/Avatar',
      violations: [],
      passes: 9,
    },
    {
      id: 'core-components-avatar--normal',
      name: 'Normal',
      title: 'Core Components/Avatar',
      kind: 'Core Components/Avatar',
      violations: [],
      passes: 9,
    },
    {
      id: 'core-components-remoteimage--default',
      name: 'Default',
      title: 'Core Components/RemoteImage',
      kind: 'Core Components/RemoteImage',
      violations: [],
      passes: 11,
    },
    {
      id: 'core-components-alert--basic-alert',
      name: 'Basic Alert',
      title: 'Core Components/Alert',
      kind: 'Core Components/Alert',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-alert--portal-alert',
      name: 'Portal Alert',
      title: 'Core Components/Alert',
      kind: 'Core Components/Alert',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-alert--single-action-alert',
      name: 'Single Action Alert',
      title: 'Core Components/Alert',
      kind: 'Core Components/Alert',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-alert--visible-alert',
      name: 'Visible Alert',
      title: 'Core Components/Alert',
      kind: 'Core Components/Alert',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-overlays--composite-overlays-with-portal',
      name: 'Composite Overlays With Portal',
      title: 'Core Components/Overlays',
      kind: 'Core Components/Overlays',
      violations: [
        {
          id: 'heading-order',
          impact: 'moderate',
          tags: ['cat.semantics', 'best-practice'],
          description: 'Ensures the order of headings is semantically correct',
          help: 'Heading levels should only increase by one',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/heading-order?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'heading-order',
                  data: null,
                  relatedNodes: [],
                  impact: 'moderate',
                  message: 'Heading order invalid',
                },
              ],
              all: [],
              none: [],
              impact: 'moderate',
              html: '<h3 class="t160640o h1hmspdn f1eacfne t5418vf sjo1exx">Learn AMP. Earn $3 in AMP.</h3>',
              target: ['h3'],
              failureSummary: 'Fix any of the following:\n  Heading order invalid',
            },
          ],
        },
        {
          id: 'landmark-unique',
          impact: 'moderate',
          tags: ['cat.semantics', 'best-practice'],
          help: 'Ensures landmarks are unique',
          description:
            'Landmarks should have a unique role or role/label/title (i.e. accessible name) combination',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/landmark-unique?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'landmark-is-unique',
                  data: { role: 'navigation', accessibleText: null },
                  relatedNodes: [
                    {
                      html: '<nav class="f13ygna6 f1g4ii86 r45vtfp s19f9ocl bfumyc1 bt8hyoi _jf348 _1os04ly _15bc7a9 _1o6rgns s151si4t" style="min-height: 80px; width: 100%; position: sticky; left: 0px; right: 0px; top: 0px; z-index: 2;">',
                      target: ['.bt8hyoi'],
                    },
                  ],
                  impact: 'moderate',
                  message:
                    'The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable',
                },
              ],
              all: [],
              none: [],
              impact: 'moderate',
              html: '<nav class="f13ygna6 c1wa27ul bfumyc1 b1lhdz7t _jf348 _1os04ly _15bc7a9 _1o6rgns s151si4t" style="height: 100%; min-width: 240px; width: 240px; position: sticky; left: 0px; top: 0px; z-index: 2;">',
              target: ['.b1lhdz7t'],
              failureSummary:
                'Fix any of the following:\n  The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable',
            },
          ],
        },
      ],
      passes: 17,
    },
    {
      id: 'core-components-overlays--composite-overlays-without-portal',
      name: 'Composite Overlays Without Portal',
      title: 'Core Components/Overlays',
      kind: 'Core Components/Overlays',
      violations: [
        {
          id: 'heading-order',
          impact: 'moderate',
          tags: ['cat.semantics', 'best-practice'],
          description: 'Ensures the order of headings is semantically correct',
          help: 'Heading levels should only increase by one',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/heading-order?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'heading-order',
                  data: null,
                  relatedNodes: [],
                  impact: 'moderate',
                  message: 'Heading order invalid',
                },
              ],
              all: [],
              none: [],
              impact: 'moderate',
              html: '<h3 class="t160640o h1hmspdn f1eacfne t5418vf sjo1exx">Learn AMP. Earn $3 in AMP.</h3>',
              target: ['h3'],
              failureSummary: 'Fix any of the following:\n  Heading order invalid',
            },
          ],
        },
        {
          id: 'landmark-unique',
          impact: 'moderate',
          tags: ['cat.semantics', 'best-practice'],
          help: 'Ensures landmarks are unique',
          description:
            'Landmarks should have a unique role or role/label/title (i.e. accessible name) combination',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/landmark-unique?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'landmark-is-unique',
                  data: { role: 'navigation', accessibleText: null },
                  relatedNodes: [
                    {
                      html: '<nav class="f13ygna6 f1g4ii86 r45vtfp s19f9ocl bfumyc1 bt8hyoi _jf348 _1os04ly _15bc7a9 _1o6rgns s151si4t" style="min-height: 80px; width: 100%; position: sticky; left: 0px; right: 0px; top: 0px; z-index: 2;">',
                      target: ['.bt8hyoi'],
                    },
                  ],
                  impact: 'moderate',
                  message:
                    'The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable',
                },
              ],
              all: [],
              none: [],
              impact: 'moderate',
              html: '<nav class="f13ygna6 c1wa27ul bfumyc1 b1lhdz7t _jf348 _1os04ly _15bc7a9 _1o6rgns s151si4t" style="height: 100%; min-width: 240px; width: 240px; position: sticky; left: 0px; top: 0px; z-index: 2;">',
              target: ['.b1lhdz7t'],
              failureSummary:
                'Fix any of the following:\n  The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable',
            },
          ],
        },
      ],
      passes: 17,
    },
    {
      id: 'core-components-modal--basic-modal',
      name: 'Basic Modal',
      title: 'Core Components/Modal',
      kind: 'Core Components/Modal',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-modal--dark-modal',
      name: 'Dark Modal',
      title: 'Core Components/Modal',
      kind: 'Core Components/Modal',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-modal--long-modal',
      name: 'Long Modal',
      title: 'Core Components/Modal',
      kind: 'Core Components/Modal',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-modal--modal-without-portal',
      name: 'Modal Without Portal',
      title: 'Core Components/Modal',
      kind: 'Core Components/Modal',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-modal--portal-modal',
      name: 'Portal Modal',
      title: 'Core Components/Modal',
      kind: 'Core Components/Modal',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-modal--visible-modal',
      name: 'Visible Modal',
      title: 'Core Components/Modal',
      kind: 'Core Components/Modal',
      violations: [],
      passes: 11,
    },
    {
      id: 'core-components-popovermenu--avatar-button-menu',
      name: 'Avatar Button Menu',
      title: 'Core Components/PopoverMenu',
      kind: 'Core Components/PopoverMenu',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-popovermenu--default',
      name: 'Default',
      title: 'Core Components/PopoverMenu',
      kind: 'Core Components/PopoverMenu',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-popovermenu--feed-card-menu',
      name: 'Feed Card Menu',
      title: 'Core Components/PopoverMenu',
      kind: 'Core Components/PopoverMenu',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-popovermenu--frontier-menu',
      name: 'Frontier Menu',
      title: 'Core Components/PopoverMenu',
      kind: 'Core Components/PopoverMenu',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-popovermenu--navigation-menu',
      name: 'Navigation Menu',
      title: 'Core Components/PopoverMenu',
      kind: 'Core Components/PopoverMenu',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-recipes-searchinputmenu--search-input-menu',
      name: 'Search Input Menu',
      title: 'Core Components/Recipes/SearchInputMenu',
      kind: 'Core Components/Recipes/SearchInputMenu',
      violations: [
        {
          id: 'label-title-only',
          impact: 'serious',
          tags: ['cat.forms', 'best-practice'],
          description:
            'Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/label-title-only?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [],
              none: [
                {
                  id: 'title-only',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Only title used to generate label for form element',
                },
              ],
              impact: 'serious',
              html: '<input aria-describedby="cds-textinput-description-gxgo2rfrdlk" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix all of the following:\n  Only title used to generate label for form element',
            },
          ],
        },
        {
          id: 'label',
          impact: 'critical',
          tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT',
          ],
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'implicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an implicit (wrapped) <label>',
                },
                {
                  id: 'explicit-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'Form element does not have an explicit <label>',
                },
                {
                  id: 'aria-label',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'aria-label attribute does not exist or is empty',
                },
                {
                  id: 'aria-labelledby',
                  data: null,
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
                },
                {
                  id: 'non-empty-title',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no title attribute',
                },
                {
                  id: 'non-empty-placeholder',
                  data: { messageKey: 'noAttr' },
                  relatedNodes: [],
                  impact: 'serious',
                  message: 'Element has no placeholder attribute',
                },
                {
                  id: 'presentational-role',
                  data: null,
                  relatedNodes: [],
                  impact: 'minor',
                  message:
                    'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<input aria-describedby="cds-textinput-description-gxgo2rfrdlk" class="n1re6qxo bw3lfah _15bc7a9 _1o6rgns _1vs5646 _1os04ly" tabindex="0" role="searchbox" type="search" value="" style="text-align: start;">',
              target: ['input'],
              failureSummary:
                'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
            },
          ],
        },
      ],
      passes: 9,
    },
    {
      id: 'core-components-toast--basic-toast',
      name: 'Basic Toast',
      title: 'Core Components/Toast',
      kind: 'Core Components/Toast',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-toast--multiline-toast',
      name: 'Multiline Toast',
      title: 'Core Components/Toast',
      kind: 'Core Components/Toast',
      violations: [],
      passes: 7,
    },
    {
      id: 'core-components-tooltipv2--default',
      name: 'Default',
      title: 'Core Components/TooltipV2',
      kind: 'Core Components/TooltipV2',
      violations: [
        {
          id: 'aria-allowed-attr',
          impact: 'critical',
          tags: ['cat.aria', 'wcag2a', 'wcag412'],
          description: "Ensures ARIA attributes are allowed for an element's role",
          help: 'Elements must only use allowed ARIA attributes',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="83uoauxp7cs" aria-haspopup="dialog">',
              target: ['div[aria-controls="83uoauxp7cs"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="oxkyrab2osq" aria-haspopup="dialog">',
              target: ['div[aria-controls="oxkyrab2osq"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="rp94kmxfrlb" aria-haspopup="dialog">',
              target: ['div[aria-controls="rp94kmxfrlb"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="a1u7clmmts" aria-haspopup="dialog">',
              target: ['div[aria-controls="a1u7clmmts"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="r1szahqa3q9" aria-haspopup="dialog">',
              target: ['div[aria-controls="r1szahqa3q9"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="d858d4u8qm" aria-haspopup="dialog">',
              target: ['div[aria-controls="d858d4u8qm"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="o5hlec446dl" aria-haspopup="dialog">',
              target: ['div[aria-controls="o5hlec446dl"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="4b4qqsqhlsj" aria-haspopup="dialog">',
              target: ['div[aria-controls="4b4qqsqhlsj"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="lrpcllfnyyl" aria-haspopup="dialog">',
              target: ['div[aria-controls="lrpcllfnyyl"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="o1id6dnrbrm" aria-haspopup="dialog"><p aria-describedby="tooltipId" class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx">Default</p></div>',
              target: ['div[aria-controls="o1id6dnrbrm"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="eqs04eshi0s" aria-haspopup="dialog">',
              target: ['div[aria-controls="eqs04eshi0s"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="kmwlsexil2j" aria-haspopup="dialog"><div aria-describedby="tooltipId" class="f13ygna6 c1wa27ul _1vh1yhf"><p class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx">right</p></div></div>',
              target: ['div[aria-controls="kmwlsexil2j"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="j8tvma1egil" aria-haspopup="dialog"><div aria-describedby="tooltipId" class="f13ygna6 c1wa27ul _1vh1yhf"><p class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx">bottom</p></div></div>',
              target: ['div[aria-controls="j8tvma1egil"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
          ],
        },
      ],
      passes: 14,
    },
    {
      id: 'core-components-tooltipv2--tooltip-long-content',
      name: 'Tooltip Long Content',
      title: 'Core Components/TooltipV2',
      kind: 'Core Components/TooltipV2',
      violations: [
        {
          id: 'aria-allowed-attr',
          impact: 'critical',
          tags: ['cat.aria', 'wcag2a', 'wcag412'],
          description: "Ensures ARIA attributes are allowed for an element's role",
          help: 'Elements must only use allowed ARIA attributes',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="97sklnz66io" aria-haspopup="dialog">',
              target: ['div[aria-controls="97sklnz66io"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="i1kfc6iaaw8" aria-haspopup="dialog">',
              target: ['div[aria-controls="i1kfc6iaaw8"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="yjjrkl6i0h8" aria-haspopup="dialog">',
              target: ['div[aria-controls="yjjrkl6i0h8"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="oeyjkhpvucs" aria-haspopup="dialog">',
              target: ['div[aria-controls="oeyjkhpvucs"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="wg5x35yy1l" aria-haspopup="dialog">',
              target: ['div[aria-controls="wg5x35yy1l"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="g7p0g3qltw" aria-haspopup="dialog">',
              target: ['div[aria-controls="g7p0g3qltw"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="8ee9k2cc6iu" aria-haspopup="dialog">',
              target: ['div[aria-controls="8ee9k2cc6iu"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="o86ev6o6ha" aria-haspopup="dialog">',
              target: ['div[aria-controls="o86ev6o6ha"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="q6915fdnhze" aria-haspopup="dialog">',
              target: ['div[aria-controls="q6915fdnhze"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="0jcew687rfiq" aria-haspopup="dialog"><p aria-describedby="tooltipId" class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx">Default</p></div>',
              target: ['div[aria-controls="0jcew687rfiq"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="ci1z17tet1h" aria-haspopup="dialog">',
              target: ['div[aria-controls="ci1z17tet1h"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="1btbyfme36a" aria-haspopup="dialog"><div aria-describedby="tooltipId" class="f13ygna6 c1wa27ul _1vh1yhf"><p class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx">right</p></div></div>',
              target: ['div[aria-controls="1btbyfme36a"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
            {
              any: [
                {
                  id: 'aria-allowed-attr',
                  data: ['aria-expanded="false"'],
                  relatedNodes: [],
                  impact: 'critical',
                  message: 'ARIA attribute is not allowed: aria-expanded="false"',
                },
              ],
              all: [],
              none: [],
              impact: 'critical',
              html: '<div class="sfo71e8" aria-expanded="false" aria-controls="xmvqbu2sov" aria-haspopup="dialog"><div aria-describedby="tooltipId" class="f13ygna6 c1wa27ul _1vh1yhf"><p class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx">bottom</p></div></div>',
              target: ['div[aria-controls="xmvqbu2sov"]'],
              failureSummary:
                'Fix any of the following:\n  ARIA attribute is not allowed: aria-expanded="false"',
            },
          ],
        },
      ],
      passes: 14,
    },
    {
      id: 'core-components-table-table--fixed-layout-example',
      name: 'Fixed Layout Example',
      title: 'Core Components/Table/Table',
      kind: 'Core Components/Table/Table',
      violations: [
        {
          id: 'aria-hidden-focus',
          impact: 'serious',
          tags: ['cat.name-role-value', 'wcag2a', 'wcag412', 'wcag131'],
          description: 'Ensures aria-hidden elements do not contain focusable elements',
          help: 'ARIA hidden element must not contain focusable elements',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-hidden-focus?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [
                {
                  id: 'focusable-disabled',
                  data: null,
                  relatedNodes: [
                    {
                      html: '<input class="c1baze8m poigcwi" type="checkbox" aria-checked="true" aria-disabled="false" aria-readonly="false" aria-required="false" role="switch" value="" checked="">',
                      target: ['input'],
                    },
                  ],
                  impact: 'serious',
                  message: 'Focusable content should be disabled or be removed from the DOM',
                },
              ],
              none: [],
              impact: 'serious',
              html: '<div aria-hidden="true" class="f13ygna6 c1omxyrd" role="presentation" style="height: var(--body-line-height);">',
              target: ['.c1omxyrd[aria-hidden="true"][role="presentation"]'],
              failureSummary:
                'Fix all of the following:\n  Focusable content should be disabled or be removed from the DOM',
            },
          ],
        },
      ],
      passes: 14,
    },
    {
      id: 'core-components-table-table--sample-table',
      name: 'Sample Table',
      title: 'Core Components/Table/Table',
      kind: 'Core Components/Table/Table',
      violations: [
        {
          id: 'aria-hidden-focus',
          impact: 'serious',
          tags: ['cat.name-role-value', 'wcag2a', 'wcag412', 'wcag131'],
          description: 'Ensures aria-hidden elements do not contain focusable elements',
          help: 'ARIA hidden element must not contain focusable elements',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-hidden-focus?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [
                {
                  id: 'focusable-disabled',
                  data: null,
                  relatedNodes: [
                    {
                      html: '<input class="c1baze8m poigcwi" type="checkbox" aria-checked="false" aria-disabled="false" aria-readonly="false" aria-required="false" role="switch" value="">',
                      target: ['input'],
                    },
                  ],
                  impact: 'serious',
                  message: 'Focusable content should be disabled or be removed from the DOM',
                },
              ],
              none: [],
              impact: 'serious',
              html: '<div aria-hidden="true" class="f13ygna6 c1omxyrd" role="presentation" style="height: var(--body-line-height);">',
              target: ['.c1omxyrd[aria-hidden="true"][role="presentation"]'],
              failureSummary:
                'Fix all of the following:\n  Focusable content should be disabled or be removed from the DOM',
            },
          ],
        },
      ],
      passes: 16,
    },
    {
      id: 'core-components-table-table--sorting-example',
      name: 'Sorting Example',
      title: 'Core Components/Table/Table',
      kind: 'Core Components/Table/Table',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-table-tablecell--sample-cells',
      name: 'Sample Cells',
      title: 'Core Components/Table/TableCell',
      kind: 'Core Components/Table/TableCell',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-table-tablecell--sample-fixed-layout',
      name: 'Sample Fixed Layout',
      title: 'Core Components/Table/TableCell',
      kind: 'Core Components/Table/TableCell',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-table-tablecellfallback--table-cell-fallback-example',
      name: 'Table Cell Fallback Example',
      title: 'Core Components/Table/TableCellFallback',
      kind: 'Core Components/Table/TableCellFallback',
      violations: [
        {
          id: 'aria-hidden-focus',
          impact: 'serious',
          tags: ['cat.name-role-value', 'wcag2a', 'wcag412', 'wcag131'],
          description: 'Ensures aria-hidden elements do not contain focusable elements',
          help: 'ARIA hidden element must not contain focusable elements',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/aria-hidden-focus?application=axe-puppeteer',
          nodes: [
            {
              any: [],
              all: [
                {
                  id: 'focusable-disabled',
                  data: null,
                  relatedNodes: [
                    {
                      html: '<input class="c1baze8m poigcwi" type="checkbox" aria-checked="false" aria-disabled="false" aria-readonly="false" aria-required="false" role="switch" value="">',
                      target: ['input'],
                    },
                  ],
                  impact: 'serious',
                  message: 'Focusable content should be disabled or be removed from the DOM',
                },
              ],
              none: [],
              impact: 'serious',
              html: '<div aria-hidden="true" class="f13ygna6 c1omxyrd" role="presentation" style="height: var(--body-line-height);">',
              target: ['.c1omxyrd[aria-hidden="true"][role="presentation"]'],
              failureSummary:
                'Fix all of the following:\n  Focusable content should be disabled or be removed from the DOM',
            },
          ],
        },
      ],
      passes: 15,
    },
    {
      id: 'core-components-table-tablerow--table-row-example',
      name: 'Table Row Example',
      title: 'Core Components/Table/TableRow',
      kind: 'Core Components/Table/TableRow',
      violations: [],
      passes: 13,
    },
    {
      id: 'core-components-table-tablesection--loading-state-example',
      name: 'Loading State Example',
      title: 'Core Components/Table/TableSection',
      kind: 'Core Components/Table/TableSection',
      violations: [],
      passes: 12,
    },
    {
      id: 'core-components-table-tablesection--sample-table-section',
      name: 'Sample Table Section',
      title: 'Core Components/Table/TableSection',
      kind: 'Core Components/Table/TableSection',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-table-tablesection--section-flow-control',
      name: 'Section Flow Control',
      title: 'Core Components/Table/TableSection',
      kind: 'Core Components/Table/TableSection',
      violations: [],
      passes: 10,
    },
    {
      id: 'core-components-tabs-tabindicator--tab-indicator-example',
      name: 'Tab Indicator Example',
      title: 'Core Components/Tabs/TabIndicator',
      kind: 'Core Components/Tabs/TabIndicator',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-tabs-tablabel--tab-indicator-example',
      name: 'Tab Indicator Example',
      title: 'Core Components/Tabs/TabLabel',
      kind: 'Core Components/Tabs/TabLabel',
      violations: [],
      passes: 11,
    },
    {
      id: 'core-components-tabs-tabnavigation--tab-indicator-primary',
      name: 'Tab Indicator Primary',
      title: 'Core Components/Tabs/TabNavigation',
      kind: 'Core Components/Tabs/TabNavigation',
      violations: [],
      passes: 16,
    },
    {
      id: 'core-components-tabs-tabnavigation--tab-indicator-secondary',
      name: 'Tab Indicator Secondary',
      title: 'Core Components/Tabs/TabNavigation',
      kind: 'Core Components/Tabs/TabNavigation',
      violations: [],
      passes: 15,
    },
    {
      id: 'core-components-progressbar--colors',
      name: 'Colors',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-progressbar--custom-labels',
      name: 'Custom Labels',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [],
      passes: 9,
    },
    {
      id: 'core-components-progressbar--custom-string-label',
      name: 'Custom String Label',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#c1c3c8',
                    bgColor: '#ffffff',
                    contrastRatio: 1.76,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 1.76 (foreground color: #c1c3c8, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l1rottxd f1o033nd d1bntmt1 t5418vf e5jiys6 t1yf9way n1lx234e">$2,840</span>',
              target: ['.v1427yu5 > .d1bntmt1.l1rottxd.f1o033nd'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 1.76 (foreground color: #c1c3c8, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 9,
    },
    {
      id: 'core-components-progressbar--default',
      name: 'Default',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-progressbar--disabled',
      name: 'Disabled',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#a2a2a3',
                    bgColor: '#ffffff',
                    contrastRatio: 2.54,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.54 (foreground color: #a2a2a3, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l1rottxd f1eacfne d1bntmt1 t5418vf e5jiys6 t1yf9way n1lx234e">0%</span>',
              target: [
                '.c1wa27ul.f13ygna6:nth-child(3) > .n1uq5gfe.c1omxyrd.f13ygna6 > ._14apokp.f13ygna6 > .c1kq2fue > .v1427yu5 > .f1eacfne.t160640o.l1rottxd',
              ],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.54 (foreground color: #a2a2a3, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#a2a2a3',
                    bgColor: '#ffffff',
                    contrastRatio: 2.54,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.54 (foreground color: #a2a2a3, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l1rottxd f1eacfne d1bntmt1 t5418vf e5jiys6 t1yf9way n1lx234e">1%</span>',
              target: [
                '.c1wa27ul.f13ygna6:nth-child(5) > .n1uq5gfe.c1omxyrd.f13ygna6 > ._14apokp.f13ygna6 > .c1kq2fue > .v1427yu5 > .f1eacfne.t160640o.l1rottxd',
              ],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.54 (foreground color: #a2a2a3, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#a2a2a3',
                    bgColor: '#ffffff',
                    contrastRatio: 2.54,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.54 (foreground color: #a2a2a3, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l1rottxd f1eacfne d1bntmt1 t5418vf e5jiys6 t1yf9way n1lx234e">6%</span>',
              target: [
                '.c1wa27ul.f13ygna6:nth-child(7) > .n1uq5gfe.c1omxyrd.f13ygna6 > ._14apokp.f13ygna6 > .c1kq2fue > .v1427yu5 > .f1eacfne.t160640o.l1rottxd',
              ],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.54 (foreground color: #a2a2a3, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#c1c3c8',
                    bgColor: '#ffffff',
                    contrastRatio: 1.76,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 1.76 (foreground color: #c1c3c8, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l1rottxd f1o033nd d1bntmt1 t5418vf e5jiys6 t1yf9way n1lx234e">8%</span>',
              target: ['.v1427yu5 > .f1o033nd.t160640o.l1rottxd'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 1.76 (foreground color: #c1c3c8, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 6,
    },
    {
      id: 'core-components-progressbar--heavy',
      name: 'Heavy',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-progressbar--label-above',
      name: 'Label Above',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [],
      passes: 9,
    },
    {
      id: 'core-components-progressbar--label-at-bounds-below',
      name: 'Label At Bounds Below',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [],
      passes: 9,
    },
    {
      id: 'core-components-progressbar--label-below',
      name: 'Label Below',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [],
      passes: 9,
    },
    {
      id: 'core-components-progressbar--label-beside',
      name: 'Label Beside',
      title: 'Core Components/ProgressBar',
      kind: 'Core Components/ProgressBar',
      violations: [],
      passes: 9,
    },
    {
      id: 'core-components-progresscircle--colors',
      name: 'Colors',
      title: 'Core Components/ProgressCircle',
      kind: 'Core Components/ProgressCircle',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-progresscircle--default',
      name: 'Default',
      title: 'Core Components/ProgressCircle',
      kind: 'Core Components/ProgressCircle',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-progresscircle--disabled',
      name: 'Disabled',
      title: 'Core Components/ProgressCircle',
      kind: 'Core Components/ProgressCircle',
      violations: [],
      passes: 6,
    },
    {
      id: 'core-components-progresscircle--fill-parent',
      name: 'Fill Parent',
      title: 'Core Components/ProgressCircle',
      kind: 'Core Components/ProgressCircle',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-progresscircle--heavy',
      name: 'Heavy',
      title: 'Core Components/ProgressCircle',
      kind: 'Core Components/ProgressCircle',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-progresscircle--no-text',
      name: 'No Text',
      title: 'Core Components/ProgressCircle',
      kind: 'Core Components/ProgressCircle',
      violations: [],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--compact',
      name: 'Compact',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e8a589',
                    bgColor: '#ffffff',
                    contrastRatio: 2.06,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--default',
      name: 'Default',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e8a589',
                    bgColor: '#ffffff',
                    contrastRatio: 2.06,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--disable-scrubbing',
      name: 'Disable Scrubbing',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e8a589',
                    bgColor: '#ffffff',
                    contrastRatio: 2.06,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--fallback-compact',
      name: 'Fallback Compact',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e18c69',
                    bgColor: '#ffffff',
                    contrastRatio: 2.57,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.57 (foreground color: #e18c69, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.57 (foreground color: #e18c69, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--fallback-negative',
      name: 'Fallback Negative',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e8a589',
                    bgColor: '#ffffff',
                    contrastRatio: 2.06,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--fallback-positive',
      name: 'Fallback Positive',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e18c69',
                    bgColor: '#ffffff',
                    contrastRatio: 2.57,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.57 (foreground color: #e18c69, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.57 (foreground color: #e18c69, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--fill',
      name: 'Fill',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e8a589',
                    bgColor: '#ffffff',
                    contrastRatio: 2.06,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--hide-period-selector',
      name: 'Hide Period Selector',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [],
      passes: 5,
    },
    {
      id: 'core-components-sparklineinteractive--no-hover-date',
      name: 'No Hover Date',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#efc0ad',
                    bgColor: '#ffffff',
                    contrastRatio: 1.63,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 1.63 (foreground color: #efc0ad, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5.f1eacfne.sjo1exx'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 1.63 (foreground color: #efc0ad, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--with-header-node',
      name: 'With Header Node',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e18c69',
                    bgColor: '#ffffff',
                    contrastRatio: 2.57,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.57 (foreground color: #e18c69, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.57 (foreground color: #e18c69, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractive--y-axis-scaling',
      name: 'Y Axis Scaling',
      title: 'Core Components/SparklineInteractive',
      kind: 'Core Components/SparklineInteractive',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e8a589',
                    bgColor: '#ffffff',
                    contrastRatio: 2.06,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'core-components-sparklineinteractiveheader--default',
      name: 'Default',
      title: 'Core Components/SparklineInteractiveHeader',
      kind: 'Core Components/SparklineInteractiveHeader',
      violations: [
        {
          id: 'color-contrast',
          impact: 'serious',
          tags: ['cat.color', 'wcag2aa', 'wcag143'],
          description:
            'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'color-contrast',
                  data: {
                    fgColor: '#e8a589',
                    bgColor: '#ffffff',
                    contrastRatio: 2.06,
                    fontSize: '10.5pt (14px)',
                    fontWeight: 'normal',
                    messageKey: null,
                    expectedContrastRatio: '4.5:1',
                  },
                  relatedNodes: [],
                  impact: 'serious',
                  message:
                    'Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<span class="t160640o l194pyb5 f1eacfne t5418vf sjo1exx _t5amyn _1nih5fh _jf348 _1os04ly" style="color: rgb(207, 71, 14);">1D</span>',
              target: ['.i1mid3m6.iqamtvt.tnurl35:nth-child(2) > .l194pyb5._1nih5fh._jf348'],
              failureSummary:
                'Fix any of the following:\n  Element has insufficient color contrast of 2.06 (foreground color: #e8a589, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1',
            },
          ],
        },
      ],
      passes: 8,
    },
    {
      id: 'components-cards--announcement-card',
      name: 'Announcement Card',
      title: 'components/Cards',
      kind: 'components/Cards',
      violations: [],
      passes: 13,
    },
    {
      id: 'components-cards--announcement-cards',
      name: 'Announcement Cards',
      title: 'components/Cards',
      kind: 'components/Cards',
      violations: [
        {
          id: 'nested-interactive',
          impact: 'serious',
          tags: ['cat.keyboard', 'wcag2a', 'wcag412'],
          description:
            'Ensures interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies',
          help: 'Interactive controls must not be nested',
          helpUrl:
            'https://dequeuniversity.com/rules/axe/4.4/nested-interactive?application=axe-puppeteer',
          nodes: [
            {
              any: [
                {
                  id: 'no-focusable-content',
                  data: null,
                  relatedNodes: [
                    {
                      html: '<button type="button" data-testid="card-body-action" class="i1mid3m6 iqamtvt ixq3qcz tnurl35 t106q4en b19rrrfi fxvgl8z ppscynd bs74mpw b1idwjgh _12x2frn _czghws _jf348 _1os04ly _jf348" style="--interactable-height:40px; margin-left: calc(var(--spacing-2) * -1); margin-right: 0px; min-width: unset; --interactable-opacity-hovered:0.98; --interactable-opacity-pressed:0.92; --interactable-overlay:var(--gray0); --interactable-underlay:var(--foreground); --interactable-border-radius:4px;">',
                      target: [
                        '.cys9fvs:nth-child(3) > .p1qbvwwp.i1mid3m6.iqamtvt > .c1wa27ul.f13ygna6 > .c1omxyrd.r45vtfp.s19f9ocl > .f1g4ii86.c1wa27ul.f13ygna6 > .ixq3qcz.b19rrrfi.bs74mpw',
                      ],
                    },
                  ],
                  impact: 'serious',
                  message: 'Element has focusable descendants',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<button type="button" class="i1mid3m6 iqamtvt tnurl35 t106q4en fxvgl8z p1qbvwwp" style="--interactable-opacity-hovered:0.98; --interactable-opacity-pressed:0.92; --interactable-underlay:var(--foreground); --interactable-border-radius:0px;">',
              target: ['.cys9fvs:nth-child(3) > .p1qbvwwp.i1mid3m6.iqamtvt'],
              failureSummary: 'Fix any of the following:\n  Element has focusable descendants',
            },
            {
              any: [
                {
                  id: 'no-focusable-content',
                  data: null,
                  relatedNodes: [
                    {
                      html: '<button type="button" data-testid="card-body-action" class="i1mid3m6 iqamtvt ixq3qcz tnurl35 t106q4en b19rrrfi fxvgl8z ppscynd bs74mpw b1idwjgh _12x2frn _czghws _jf348 _1os04ly _jf348" style="--interactable-height:40px; margin-left: calc(var(--spacing-2) * -1); margin-right: 0px; min-width: unset; --interactable-opacity-hovered:0.98; --interactable-opacity-pressed:0.92; --interactable-overlay:var(--gray0); --interactable-underlay:var(--foreground); --interactable-border-radius:4px;">',
                      target: [
                        '.cys9fvs:nth-child(5) > .p1qbvwwp.i1mid3m6.iqamtvt > .c1wa27ul.f13ygna6 > .c1omxyrd.r45vtfp.s19f9ocl > .f1g4ii86.c1wa27ul.f13ygna6 > .ixq3qcz.b19rrrfi.bs74mpw',
                      ],
                    },
                  ],
                  impact: 'serious',
                  message: 'Element has focusable descendants',
                },
              ],
              all: [],
              none: [],
              impact: 'serious',
              html: '<button type="button" class="i1mid3m6 iqamtvt tnurl35 t106q4en fxvgl8z p1qbvwwp" style="--interactable-opacity-hovered:0.98; --interactable-opacity-pressed:0.92; --interactable-underlay:var(--foreground); --interactable-border-radius:0px;">',
              target: ['.cys9fvs:nth-child(5) > .p1qbvwwp.i1mid3m6.iqamtvt'],
              failureSummary: 'Fix any of the following:\n  Element has focusable descendants',
            },
          ],
        },
      ],
      passes: 16,
    },
    {
      id: 'components-cards--data-card',
      name: 'Data Card',
      title: 'components/Cards',
      kind: 'components/Cards',
      violations: [],
      passes: 9,
    },
    {
      id: 'components-cards--data-cards',
      name: 'Data Cards',
      title: 'components/Cards',
      kind: 'components/Cards',
      violations: [],
      passes: 13,
    },
    {
      id: 'components-cards--feature-entry-card',
      name: 'Feature Entry Card',
      title: 'components/Cards',
      kind: 'components/Cards',
      violations: [],
      passes: 13,
    },
    {
      id: 'components-cards--feature-entry-cards',
      name: 'Feature Entry Cards',
      title: 'components/Cards',
      kind: 'components/Cards',
      violations: [],
      passes: 16,
    },
    {
      id: 'components-cards--feed-card',
      name: 'Feed Card',
      title: 'components/Cards',
      kind: 'components/Cards',
      violations: [],
      passes: 13,
    },
    {
      id: 'components-cards--feed-cards',
      name: 'Feed Cards',
      title: 'components/Cards',
      kind: 'components/Cards',
      violations: [],
      passes: 16,
    },
  ],
} as const;
