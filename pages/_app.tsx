import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Navbar from '../componets/Navbar';
import { CartContextManager } from '../store/cart/context';
import { AccountContextManager } from '../store/account/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountContextManager>
      <CartContextManager>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <footer>
            <Navbar />
          </footer>
        </ThemeProvider>
      </CartContextManager>
    </AccountContextManager>
  );
}

export default MyApp;
