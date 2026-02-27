import { createPortal } from 'react-dom';

import { Notification as NotificationComponent } from '@/components';

export const NotificationPortal = ({ children }: { children: string }) => {
  return createPortal(
    <NotificationComponent>{children}</NotificationComponent>,
    document.body,
  );
};
