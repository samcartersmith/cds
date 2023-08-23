import { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { NavbarPortalProps } from '@theme/NavbarPortal';

/**
 * The docusaurus Navbar doesn't have any components which are good candidates to
 * swizzle to enable this functionality, so we have to use portal + className.
 */
const NavbarPortal = memo(function NavbarPortal({ children }: NavbarPortalProps) {
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const isBrowser = useIsBrowser();

  useEffect(() => {
    if (isBrowser) {
      const navbar = document.querySelector('.navbar__items--right');
      if (navbar) {
        const portal = document.createElement('div');
        navbar?.prepend(portal);
        if (portal) {
          setPortalEl(portal);
        }
      }
    }
  }, [isBrowser]);

  return portalEl ? createPortal(children, portalEl) : null;
});

export default NavbarPortal;
