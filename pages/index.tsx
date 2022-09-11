import type { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Button from '../componets/Button';
import { useAccountContext } from '../store/account/context';
import { validateEmail } from '../utils/validateEmail';

const StyledAccount = styled.div`
  padding: 0 24px;
  height: 100vh;
  padding-top: 22%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 48px;

  input {
    padding: 8px 0;
    outline: 0;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

    :focus {
      border-bottom: 2px solid ${({ theme }) => theme.colors.turquoise100};
    }

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray100};
      font-size: 16px;
    }

    :nth-child(2) {
      margin-top: 52px;
    }
  }
`;

const StyledSelectLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray100};

  & > select {
    margin-top: 8px;
    padding: 8px 0;
    outline: 0;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray100};
  }
`;

const StyledCredentials = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
  font-weight: 600;
`;

const Home: NextPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    locale: 'en',
  });

  const { email, locale, password, isLoggedIn, actions } = useAccountContext();

  console.log({ email, locale, password, isLoggedIn });

  const handleCredentialChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === 'locale') {
      actions.setLocale(e.target.value);
    }

    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!validateEmail(credentials.email)) return;

    actions.login(credentials);
  };

  const handleLogout = () => {
    actions.logout();
  };

  return (
    <StyledAccount>
      <Head>
        <title>Tapu Case</title>
        <meta name='description' content='Account page for tabu case' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Account:</h1>

        <StyledForm onSubmit={(e) => e.preventDefault()}>
          {isLoggedIn ? (
            <StyledCredentials>
              <p>Email: {email}</p>
              <p>
                Password: {`${password.substring(0, password.length - 4)}****`}
              </p>
              <p>Locale: {locale}</p>
            </StyledCredentials>
          ) : (
            <>
              <input
                onChange={handleCredentialChange}
                value={credentials.email}
                type='email'
                id='email'
                name='email'
                placeholder='E-mail'
              />
              <input
                onChange={handleCredentialChange}
                value={credentials.password}
                type='password'
                id='password'
                name='password'
                placeholder='Password'
              />
            </>
          )}

          <StyledSelectLabel>
            Locale
            <select
              onChange={handleCredentialChange}
              name='locale'
              id='locale'
              defaultValue={credentials.locale}
            >
              <option value='en'>English</option>
              <option value='tr'>Turkce</option>
            </select>
          </StyledSelectLabel>

          {isLoggedIn ? (
            <Button variant='outlined' onClick={handleLogout} color='red100'>
              Logout
            </Button>
          ) : (
            <Button
              onClick={handleLogin}
              variant='contained'
              // TODO: probably use formik and yup for validation
              color={validateEmail(credentials.email) ? 'gray50' : 'red100'}
            >
              Sign Up
            </Button>
          )}
        </StyledForm>
      </main>
    </StyledAccount>
  );
};

export default Home;
