---
title: Spacing
---

import theme from '../../src/gatsby-plugin-theme-ui';

Spacing is based on an 8-point grid system for a few core reasons.

- It defines a consistent system to base spacing on instead of arbitrary 5px here, 20px there. 
- 8px divides and multiples well for web, especially when it comes to retina sizing and an (in most cases) inherit 16px base body font size.

You can [read about the benefits of an 8 point grid](https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632).

<table>
  <thead>
    <th>Variable</th>
    <th>Scale</th>
    <th>Value</th>
  </thead>
  {theme.space.map((n,i) =>
    <tr key={n}>
      <td>$spacing-{i}</td>
      <td>{i}</td>
      <td>{n}px</td>
    </tr>
  )}
</table>

See [spacing utilities](/utilities/spacing) for applying spacing via a class.
