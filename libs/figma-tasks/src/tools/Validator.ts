// export class Validator {

//    /** If a nav and ui icon have the same name */
//    private get duplicateNames() {
//     const names = this.parsedItems.map((parsedItem) => `${parsedItem.type}/${parsedItem.name}`);

//     const uniqueNames = new Set(names);
//     return names.filter((icon) => {
//       if (uniqueNames.has(icon)) {
//         uniqueNames.delete(icon);
//         return false;
//       }
//       return true;
//     });
//   }

//     public get warnings() {
//     let warnings = ``;

//     if (this.invalidFillRules.length > 0) {
//       warnings += `
//       There following icons need to use NON-ZERO fill rules.

//       Certain export formats (e.g. TrueType fonts, Android VectorDrawable) only support the 'NONZERO' fill rule.
//       Design can use, https://www.figma.com/community/plugin/771155994770327940/Fill-Rule-Editor,
//       to manually convert even-odd to non-zero to make the exporters for these formats work.
//       \n${this.invalidFillRules.join('\n')}\n
//       `;
//     }

//     if (this.duplicateNames.length > 0) {
//       warnings += `
//       The following icons have duplicate names:
//       \n${this.duplicateNames.join('\n')}\n
//       `;
//     }

//     if (this.invalidChildren.length > 0) {
//       warnings += `
//       The following icons are missing vector children:
//       \n${this.invalidChildren.join('\n')}\n
//       `;
//     }

//     return warnings;
//   }

//   public get warnings() {
//     let warnings = ``;

//     for (const [type, duplicateNames] of Object.entries(this.duplicates)) {
//       if (duplicateNames.length > 0) {
//         warnings += `
//         The following illustrations have duplicate names in ${type}:
//         \n${duplicateNames.join('\n')}\n
//         `;
//       }
//     }

//     if (this.invalidChildren.length > 0) {
//       warnings += `
//       The following icons are missing vector children:
//       \n${this.invalidChildren.join('\n')}\n
//       `;
//     }

//     return warnings;
//   }
// }

export {};
