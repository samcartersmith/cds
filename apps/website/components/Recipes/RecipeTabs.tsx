import { Tabs, ValuesProps } from '../Tabs';

type RecipeTabsProps = {
  values: ValuesProps<string>[];
};

export const RecipeTabs = ({ values }: RecipeTabsProps) => {
  return <Tabs id="recipes" defaultTab="implementation" values={values} />;
};
