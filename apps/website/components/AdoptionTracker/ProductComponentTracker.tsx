import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ModalBaseProps, useToggler } from '@cbhq/cds-common';
import { Accordion, AccordionItem } from '@cbhq/cds-web/accordion';
import { Banner } from '@cbhq/cds-web/banner/Banner';
import { Button } from '@cbhq/cds-web/buttons';
import { ListCell } from '@cbhq/cds-web/cells';
import { Chip, InputChip } from '@cbhq/cds-web/chips';
import { TextInput } from '@cbhq/cds-web/controls';
import { Dropdown } from '@cbhq/cds-web/dropdown';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { Modal, ModalBody } from '@cbhq/cds-web/overlays';
import {
  Link,
  TextBody,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextTitle3,
} from '@cbhq/cds-web/typography';

import { SplitScreenStack } from '../SplitScreenStack';

export const processGithubURL = (path: string): string => {
  const pathParts = path.split('/');

  // Extract the 'org/repo'
  const orgRepo = pathParts.slice(0, 3).join('/');

  const restOfPath = pathParts.slice(3).join('/');
  const githubURL = `https://github.cbhq.net${orgRepo}/blob/master/${restOfPath}`;
  return githubURL;
};

type ComponentData = {
  name: string;
  // where it's declared
  path: string;
  // paths to all call sites grouuped by app
  callSites: Record<string, string[]>;
  // callSite count grouped by app
  callSiteCount: Record<string, number>;
  library: string;
};
type LibraryData = {
  components: ComponentData[];
  componentCount: number;
};

type ProductComponentData = Record<string, LibraryData>;

type AdoptionProductComponentsListCell = {
  id: string;
  isActive: boolean;
  componentDetails: ComponentData;
  onPress: (id: string) => void;
  index: number;
  style?: React.CSSProperties;
};

const innerCellSpacing = { spacingHorizontal: 1 } as const;
const outerCellSpacing = { spacingStart: 2, spacingEnd: 4 } as const;
const getTotalCallSites = (component: ComponentData): number =>
  Object.values(component.callSiteCount).reduce((acc, count) => {
    return acc + count;
  });

export const ProductComponentStatsBreakdownCell = memo(
  ({
    title,
    detail,
    link,
  }: {
    title: string;
    detail: number | string | undefined;
    link?: string;
  }) => {
    return (
      <HStack gap={4} justifyContent="space-between" spacingTop={1}>
        <TextLabel1 as="p">{title}</TextLabel1>
        {link && detail ? (
          <Link color="primary" href={link} variant="label1">
            {detail}
          </Link>
        ) : (
          <TextLabel2 align="end" as="p">
            {detail}
          </TextLabel2>
        )}
      </HStack>
    );
  },
);

const ProductComponentSummaryInfo = memo(({ component }: { component: ComponentData }) => {
  const totalCallSiteCount = getTotalCallSites(component);
  return (
    <VStack>
      <ProductComponentStatsBreakdownCell
        detail={totalCallSiteCount}
        title="Total app call sites"
      />{' '}
      <ProductComponentStatsBreakdownCell
        detail={component.path}
        link={processGithubURL(component.path)}
        title="Full path"
      />
      <ProductComponentStatsBreakdownCell detail={component.library} title="Library" />
    </VStack>
  );
});

const DetailedProductComponentBreakdown = memo(({ component }: { component: ComponentData }) => {
  return (
    <VStack spacingVertical={1}>
      <TextHeadline as="p">Call sites</TextHeadline>
      <Accordion>
        {Object.entries(component.callSites).map(([appName, callSites], idx) => {
          const key = `${component.name}-${appName}-${idx}`;
          return (
            <AccordionItem
              key={key}
              itemKey={key}
              subtitle={`${callSites.length} total`}
              title={appName}
            >
              <VStack gap={1}>
                {callSites.map((callSite) => {
                  return (
                    <Link
                      key={`${key}-${callSite}`}
                      color="primary"
                      href={processGithubURL(callSite)}
                      variant="body"
                    >
                      {callSite}
                    </Link>
                  );
                })}
              </VStack>
            </AccordionItem>
          );
        })}
      </Accordion>
    </VStack>
  );
});

const ProductComponentDetails = memo(({ component }: { component: ComponentData }) => {
  return (
    <VStack width="100%">
      <VStack gap={2}>
        <VStack gap={1}>
          <TextTitle3 as="h3">{component.name}</TextTitle3>
        </VStack>
        <ProductComponentSummaryInfo component={component} />
        <DetailedProductComponentBreakdown component={component} />
      </VStack>
    </VStack>
  );
});

const EmptyProductComponentDetails = () => {
  return (
    <VStack width="100%">
      <VStack gap={2}>
        <TextTitle3 as="h3">Select a Product Component</TextTitle3>
        <TextBody as="p">Select any product component on the left.</TextBody>
      </VStack>
    </VStack>
  );
};

const ProductComponentListCell = memo(
  ({
    id,
    isActive,
    componentDetails,
    onPress,
    index,
    style,
  }: AdoptionProductComponentsListCell) => {
    return (
      <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
        <ListCell
          accessory={isActive ? 'selected' : 'arrow'}
          description={`${componentDetails.library} library`}
          detail={`${getTotalCallSites(componentDetails)} app call sites`}
          innerSpacing={innerCellSpacing}
          onPress={() => onPress(id)}
          outerSpacing={outerCellSpacing}
          selected={isActive}
          title={componentDetails.name}
        />
      </div>
    );
  },
);
ProductComponentListCell.displayName = 'ProductComponentListCell';

export const ProductComponentsList = ({ data }: { data: ProductComponentData }) => {
  // we use the path of the component as its unique id
  const componentData: ComponentData[] = Object.entries(data)
    .map(([library, libraryData]) =>
      libraryData.components.map((component) => ({
        ...component,
        library,
      })),
    )
    // sort by callsite count
    .flat()
    .sort((a, b) => getTotalCallSites(b) - getTotalCallSites(a));
  const componentPaths = componentData.map(({ path }) => path);
  const [activeComponentId, setActiveComponentId] = useState<string>(componentPaths[0]);

  const handlePress = useCallback((id: string) => {
    setActiveComponentId(id);
  }, []);

  const activeComponent = componentData.find((c) => c.path === activeComponentId);

  const start = (
    <>
      {componentData.map((component, index) => (
        <ProductComponentListCell
          key={`${component.path}-${index}`}
          componentDetails={component}
          id={component.path}
          index={index}
          isActive={component.path === activeComponentId}
          onPress={handlePress}
        />
      ))}
    </>
  );

  const end = activeComponent ? (
    <ProductComponentDetails component={activeComponent} />
  ) : (
    <EmptyProductComponentDetails />
  );

  return data ? <SplitScreenStack end={end} start={start} /> : null;
};

// we want to gate this feature behind a password. If a user has correctly entered the password we set a localStorage key to allow them to view the feature
const password = 'notreadyyet';

const PasswordValidation = ({
  visible,
  onRequestClose,
  onSuccess,
}: Pick<ModalBaseProps, 'visible' | 'onRequestClose'> & { onSuccess: () => void }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordInput === password) {
      onSuccess();
      localStorage.setItem('productComponentTracker', 'enabled');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <Modal disableOverlayPress onRequestClose={onRequestClose} visible={visible}>
      <ModalBody>
        <TextBody as="p">
          This feature is currently in development. Please enter the password to view the Product
          Component Tracker.
        </TextBody>
        <form onSubmit={handlePasswordSubmit}>
          <VStack gap={2} spacingTop={2}>
            <TextInput
              onChange={handlePasswordChange}
              placeholder="Enter password"
              type="password"
              value={passwordInput}
            />
            <Button type="submit">Submit</Button>
            {error && (
              <TextBody as="p" color="negative">
                {error}
              </TextBody>
            )}
          </VStack>
        </form>
      </ModalBody>
    </Modal>
  );
};

export const ProductComponentTracker = ({ data }: { data: ProductComponentData }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [passwordModalIsVisible, setPasswordModalIsVisible] = useState(true);
  const [selectedLibraries, setSelectedLibraries] = useState<string[] | undefined>(
    Object.keys(data),
  );
  const [filterMenuOpened, { toggleOn: openFilterMenu, toggleOff: closeFilterMenu }] =
    useToggler(false);

  // filter data based on selected libraries
  const filteredData: ProductComponentData = useMemo(() => {
    if (!selectedLibraries) {
      return data;
    }
    return Object.entries(data).reduce((acc, [library, libraryData]) => {
      if (selectedLibraries.includes(library)) {
        acc[library] = libraryData;
      }
      return acc;
    }, {} as ProductComponentData);
  }, [data, selectedLibraries]);

  useEffect(() => {
    // check local storage for password
    const hasAccessFromLocalStorage = localStorage.getItem('productComponentTracker');
    if (hasAccessFromLocalStorage === 'enabled') {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, []);

  const handleSuccess = () => {
    setHasAccess(true);
    setPasswordModalIsVisible(false);
  };

  const totalNumberOfProductComponents = Object.values(filteredData).reduce(
    (acc, { componentCount }) => acc + componentCount,
    0,
  );

  const handleLibraryChange = useCallback(
    (value: string) => {
      if (selectedLibraries?.includes(value)) {
        setSelectedLibraries(selectedLibraries.filter((lib) => lib !== value));
      } else {
        setSelectedLibraries([...(selectedLibraries || []), value]);
      }
    },
    [selectedLibraries],
  );

  const libraryOptions = useMemo(
    () => (
      <VStack>
        {Object.keys(data).map((library) => (
          <ListCell
            compact
            onPress={() => handleLibraryChange(library)}
            selected={selectedLibraries?.includes(library)}
            title={library}
          />
        ))}
      </VStack>
    ),
    [data, handleLibraryChange, selectedLibraries],
  );

  return hasAccess ? (
    <VStack gap={2} width="100%">
      <Banner startIcon="warning" title="Warning: Experimental Feature" variant="warning">
        <TextBody as="p">
          This feature is currently in development. Please use with caution.
        </TextBody>
      </Banner>
      <TextHeadline as="p" spacingStart={1}>
        Total components: {totalNumberOfProductComponents}
      </TextHeadline>
      <HStack gap={1} justifyContent="space-between">
        <HStack gap={1}>
          {selectedLibraries?.map((library) => (
            <InputChip onPress={() => handleLibraryChange(library)} value={library} />
          ))}
        </HStack>
        <Dropdown
          content={libraryOptions}
          contentPosition={{ placement: 'bottom-end', gap: 1 }}
          onCloseMenu={closeFilterMenu}
          width={300}
        >
          <Chip
            end={
              <Icon
                color="secondaryForeground"
                name={filterMenuOpened ? 'caretDown' : 'caretRight'}
                size="s"
              />
            }
            onPress={openFilterMenu}
          >
            Filter Libraries
          </Chip>
        </Dropdown>
      </HStack>
      <ProductComponentsList data={filteredData} />
    </VStack>
  ) : (
    <PasswordValidation
      onRequestClose={() => setPasswordModalIsVisible(false)}
      onSuccess={handleSuccess}
      visible={passwordModalIsVisible}
    />
  );
};
