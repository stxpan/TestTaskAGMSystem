import { DisplayOnBrowserMount } from '@/shared/components/display-on-browser-mount';
import { MaehwaLogo } from '@/shared/components/maehwa-logo';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { Badge } from '@/shared/components/ui/badge';
import { APP_TITLE } from '@/shared/lib/seo/meta';

export const Header = () => {
  return (
    <header className="container">
      <div className="flex items-center justify-between">
        <span className="flex items-center space-x-2">
          <MaehwaLogo className="text-2xl" fill="currentColor" />
          <span className="font-bold capitalize">{APP_TITLE}</span>

          <Badge variant="secondary">Beta</Badge>
        </span>

        <div className="flex items-center space-x-2">
          {/* <Media at="sm">
            <Badge variant="secondary">Beta mobile</Badge>
          </Media>
          <Media greaterThan="sm">
            <Badge variant="secondary">Beta desktop</Badge>
          </Media> */}

          <DisplayOnBrowserMount>
            <ThemeToggle />
          </DisplayOnBrowserMount>
        </div>
      </div>
    </header>
  );
};
