import { createPortal } from 'react-dom';

import { Notification as NotificationComponent } from '@/components';

const portalRoot = document.getElementById('portals');

export const NotificationPortal = ({ children }: { children: string }) => {
  if (!portalRoot) {
    return null;
  }
  return createPortal(
    <NotificationComponent>{children}</NotificationComponent>,
    portalRoot,
  );
};
