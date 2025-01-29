import React from 'react';
import { useTheme } from 'next-themes';
import { RiComputerLine, RiMoonLine, RiSunLine } from 'react-icons/ri';

import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const themeIcons: Record<string, React.ComponentType> = {
  light: RiSunLine,
  dark: RiMoonLine,
  system: RiComputerLine,
};

export const ThemeToggle = () => {
  const { theme = 'light', setTheme } = useTheme();

  const ThemeIcon = themeIcons[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Change theme</span>
          <ThemeIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
