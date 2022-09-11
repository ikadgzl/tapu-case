// import original module declarations
import 'styled-components';
import { DefaultTheme } from 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    colors: {
      red100: string;
      black100: string;
      gray10: string;
      gray50: string;
      gray100: string;
      blue100: string;
      turquoise100: string;
      error: string;
    };
  }
}

export const theme: DefaultTheme = {
  borderRadius: '12px',
  colors: {
    black100: '#121212',
    red100: '#E82223',
    gray10: '#F1F3F5',
    gray50: '#BBC3CF',
    gray100: '#64738C',
    blue100: '#0078E3',
    turquoise100: '#0DAFC0',
    error: '#F44336',
  },
};
