const isTypeAlias = require('./isTypeAlias');
const shouldAddToParentTypes = require('./shouldAddToParentTypes');

/**
 *
 * This is a callback function that gets called for each doc the plugin has parsed and allows us to transform
 * that data based on our needs. The only requirement is that we return the data in the same shape it was
 * provided to us.
 *
 * If you want to...
 * 1. show prop in the props table - include the prop in the doc's props array.
 * 2. hide prop in the props table - filter the prop from the doc's props array.
 * 3. show prop in parentTypes UI - call addToParentTypes with the prop in processDoc
 * 4. hide prop in the props table + show prop in parentTypes UI - do both #2 and #3 above
 */
function onProcessDoc(doc, { addToSharedTypeAliases, addToParentTypes, formatString }) {
  const props = doc.props
    .map((prop) => {
      let parentType = prop.parent;
      /** Let's minimize noise in "Extends from..." UI. Some parent types are redudant like
       * AccessibilityPropsIOS and AccessibilityPropsAndroid. We don't have to get that specific for
       * our documentation.
       */
      if (prop.parent.includes('AccessibilityProps')) parentType = 'AccessibilityProps';
      if (prop.parent.includes('HTMLAttributes')) parentType = 'HTMLAttributes';
      if (prop.parent.includes('TVViewProps')) parentType = 'TVViewProps';
      if (prop.parent.includes('ScrollViewProps')) parentType = 'ScrollViewProps';
      if (prop.parent.includes('ViewProps')) parentType = 'ViewProps';
      return { ...prop, parent: parentType };
    })
    .map((prop) => {
      if (isTypeAlias(prop)) {
        const { raw: alias, value } = prop.type;
        const formattedValue = formatString(value.map((item) => item.value).join(' | '));
        addToSharedTypeAliases(alias, formattedValue);
        return { ...prop, type: alias };
      }
      return { ...prop, type: prop.type.raw };
    })
    /** Example of us filtering out parent types from surfacing in props table UI */
    .filter((prop) => {
      if (shouldAddToParentTypes(doc, prop)) {
        addToParentTypes(prop);
        // Exclude parentType from main props display
        return false;
      }
      return true;
    });

  return { ...doc, props };
}

module.exports = onProcessDoc;
