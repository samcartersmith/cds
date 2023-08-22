# Design System Package Decomposition

## FAQ's

### When should a subcomponent of a decomped component be moved to the new package?

To clarify, a subcomponent is a component rendered by another component with specialized placement, styling, or shared business logic.

1. If it's tightly coupled to the parent component through Context.
2. If it's a component that is exclusively used in the parent component, and nowhere else in the design system.

For example: `SidebarMoreMenu` renders `SidebarItem`. `SidebarItem` should not be decomposed because it's used in other places in the design system, like `Sidebar`, and it shares no logic or context with `SidebarMoreMenu`.
