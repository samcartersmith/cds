# Incremental Migration: Component Groups

This guide lists component groups that should be migrated together when using the incremental migration approach. Running related components in the same pass avoids broken props, missing styles, and inconsistent APIs.

## Modal components

When migrating any modal-related component, migrate the full set together:

- Modal
- ModalHeader
- ModalBody
- ModalFooter
