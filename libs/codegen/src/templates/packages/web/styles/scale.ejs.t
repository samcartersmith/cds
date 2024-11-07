---
to: packages/web/src/styles/scale.ts
force: true
---
<%
  // Use https://ionicabizau.github.io/ejs-playground/ to debug

  const scale = styles.scale;
  const numberOfScales = Object.keys(scale).length;
  const denseScales = { xSmall: scale.xSmall, small: scale.small, medium: scale.medium }
  const normalScales = { large: scale.large, xLarge: scale.xLarge, xxLarge: scale.xxLarge, xxxLarge: scale.xxxLarge }

  
  const isShared = (key, value) => {
      return Object.values(scale).every(item => item[key] === value);
  }
  
  const isDenseOnly = (key, value) => {
      if (isShared(key, value)) return false;
      return Object.values(denseScales).every(item => item[key] === value);
  }
  
  const isNormalOnly = (key, value) => {
      if (isShared(key, value)) return false;
      return Object.values(normalScales).every(item => item[key] === value);
  }
  
  function filterScaleItems(filterFn) {
      return Object.entries(scale).reduce((prev, [scaleName, scaleValues]) => {
          return {
              ...prev,
              ...Object.entries(scaleValues).reduce((prev, nextChild) => {
                  if (filterFn(...nextChild)) {
                    return {
                        ...prev,
                        [nextChild[0]]: nextChild[1]
                    }
                  } else {
                      return prev;
                  }
              }, {})
          }
          
      }, {})
  }
  
  function shouldIncludeItem({scale, key, value}) {
      const isSharedDense = !!denseScales[scale] && isDenseOnly(key, value);
      const isSharedNormal = !!normalScales[scale] && isNormalOnly(key, value);
      const isSharedDenseAndNormal = isShared(key, value);
      return !isSharedDense && !isSharedNormal && !isSharedDenseAndNormal;
  }
%>
import { css } from 'linaria';

const sharedVariables = {
 <%_ Object.entries(filterScaleItems(isShared)).map(([key, value]) => { _%>
    '<%= key %>': '<%- value %>',
 <%_ }) _%>
};

const sharedDenseVariables = {
 <%_ Object.entries(filterScaleItems(isDenseOnly)).map(([key, value]) => { _%>
    '<%= key %>': '<%- value %>',
 <%_ }) _%>
};

const sharedNormalVariables = {
 <%_ Object.entries(filterScaleItems(isNormalOnly)).map(([key, value]) => { _%>
    '<%= key %>': '<%- value %>',
 <%_ }) _%>
};

<%_ Object.entries(scale).map(([scaleName, scaleValues]) => { _%>
  export const <%- scaleName %>Variables = {
    ...sharedVariables,
    <% if (!!denseScales[scaleName]) { _%>
    ...sharedDenseVariables,
    <% } _%>
    <% if (!!normalScales[scaleName]) { _%>
    ...sharedNormalVariables,
    <% } _%>
    <%_ Object.entries(scaleValues).map(([key, value]) => { _%>
        <% if (shouldIncludeItem({scale: scaleName, key, value })) { _%>
          '<%= key %>': '<%- value %>',
        <% } _%>
    <%_ }) _%>
  };
<%_ }) _%>

<%_ Object.entries(scale).map(([key, value]) => { _%>
export const <%- key %> = css`${<%- key %>Variables}`;
<%_ }) %>