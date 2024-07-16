import { useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { getShadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { ThemeOptions } from '@mui/material/styles';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const memoizedValue = useMemo<ThemeOptions>(
    () => ({
      palette: palette(),
      typography,
      shadows: getShadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
