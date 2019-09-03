import { createGlobalStyle, css } from 'styled-components';

export const ThemeStyles = createGlobalStyle(css`
  :root {
    --primary: #0d395f;
    --white: #fff;
    --black: #202020;
    --gray1: #dcdcdc;
    --gray2: #999;
    --lh-solid: 1;
    --lh-body: 1.7;
    --lh-heading: 1.4;
    --f1: 12px;
    --f2: 14px;
    --f3: 16px;
    --f4: 18px;
    --f5: 24px;
    --f6: 32px;
    --f7: 48px;
    --f8: 64px;
    --f9: 88px;
    --space1: 0.25rem;
    --space2: 0.5rem;
    --space3: 1rem;
    --space4: 1.5rem;
    --space5: 2rem;
    --space6: 3rem;
    --space7: 4rem;
    --bp1: 512px;
    --bp2: 768px;
    --bp3: 1024px;
    --bp4: 1280px;
    --bp5: 1440px;
  }
`);
