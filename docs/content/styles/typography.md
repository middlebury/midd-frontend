---
title: Typography
---

import theme from '../../src/gatsby-plugin-theme-ui';

export const TypeBox = ({children}) => <div sx={{p: 3,bg: 'white' }}> {children} </div>



## Font family

MDS uses Whitney and Sentital web fonts provided by [typography.com]().


## Sans-serif font stack
```scss
$font-family-sans-serif: 'sentinel ssm a', 'sentinel ssm b', georgia, serif;
```

## Serif font stack

```scss
$font-family-serif: 'whitney ssm a', 'whitney ssm b', Tahoma, Geneva, sans-serif;
```


## Font sizes

Variable|Scale|Value
-|-|-
`$typescale-1`|1|12px
`$typescale-2`|2|14px
`$typescale-3`|3|16px
`$typescale-4`|4|18px
`$typescale-5`|5|20px
`$typescale-6`|6|24px
`$typescale-7`|7|28px
`$typescale-8`|8|36px
`$typescale-9`|9|48px
`$typescale-10`|10|64px


## Examples

<TypeBox>
{theme.fontSizes.map((n,i) =>
  <div key={n}>
    <p style={{
      fontSize: n,
      lineHeight: 1.7
    }}>Whitney ({n})</p>
  </div>
)}
</TypeBox>


## Font weight


Variable|value
-|-
$font-weight-light|300
$font-weight-normal|400
$font-weight-medium|500
$font-weight-semibold|600
$font-weight-bold|700


## Line heights

Name|Sass|value
-|-|-
Body text|$line-height-body|1.7
Headings|$line-height-heading|1.2
Solid|$line-height-solid|1


## Letter spacing

In most cases where text is transformed to `uppercase`, we use a set letter spacing relative to the font size of the text.

Sass|value
-|-
$letter-spacing|0.1em


## Headings

TODO: h1,h2,h3,h4,h5,h6


