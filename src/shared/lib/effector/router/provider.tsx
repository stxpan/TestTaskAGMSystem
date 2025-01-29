import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useUnit } from 'effector-react';

import * as routerModel from './model';

export const AttachRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setup, sanitize } = useUnit({ setup: routerModel.setup, sanitize: routerModel.sanitize });

  useEffect(() => {
    if (!router.isReady) return;

    setup({
      router,
      searchParams,
      pathname,
      asPath: router.asPath,
    });

    return () => {
      sanitize();
    };
  }, [router, pathname, searchParams]);

  return null;
};
