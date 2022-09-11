import styled, { DefaultTheme } from 'styled-components';

type ButtonProps = {
  variant: 'contained' | 'outlined';
  color: keyof DefaultTheme['colors'];
  children: React.ReactNode;
  onClick: () => void;
};

const StyledButton = styled.button<ButtonProps>`
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 14px;
  font-weight: 700;
  padding: 20px 0;

  background-color: ${({ theme, color, variant }) =>
    variant === 'contained' ? theme.colors[color] : 'transparent'};
  color: ${({ theme, color, variant }) =>
    variant === 'contained' ? '#fff' : theme.colors[color]};
  border: ${({ theme, color, variant }) =>
    variant === 'contained' ? 'none' : `1px solid ${theme.colors[color]}`};
`;

const Button = ({ children, color, variant, onClick }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} color={color} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
