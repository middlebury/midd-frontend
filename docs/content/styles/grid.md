---
title: Grid 
---


## Intro
Middlebury Design System's grid is based heavily off of [Bootstrap's 12 column grid](https://getbootstrap.com/docs/4.3/layout/grid/) but with some minor feature removals and modifications.

## The Container

The base of the grid system is the `.container` class, which constrains the content to a maximum width.

This container is required before any `.row` is added because it addes the `padding-left`/`padding-right` which the `.row` then expands into with negative margin. This is all to allow columns to have their individual left/right padding set, ultimately creating the gutters.

```scss
$container-max-width: 1440px !default;
```

## Rows

A `.row` is the next element you're able to nest within the `.container` and it is required to wrap any further `.col-*` classes. See the next example for rows in action.

## Columns

Columns are the final element you'll nest within the grid system, allowing you to divy up content vertically, and changed width based on viewport size.

```html example 
<div class="container">
  <div class="row">
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
    <div class="col-1"><span>1</span></div>
  </div>
  <div class="row">
    <div class="col-6"><span>6 cols</span></div>
    <div class="col-6"><span>6 cols</span></div>
  </div>
  <div class="row">
    <div class="col-8"><span>8 cols</span></div>
    <div class="col-4"><span>4 cols</span></div>
  </div>
</div>
<style>
  [class*="col"] span {
    background: #ccc;
    padding: 1rem;
    display: block;
  }
  .row {
    margin-bottom: 1rem;
  }
</style>
```


They follow a pattern of `col-{breakpoint}-{1..12}`

## Responsive Columns

All column classes follow a pattern for changing width based on breakpoint.

`col-{size}-{1...12}` 

### Available sizes

Name|Viewport Width
-|-
xs|0
sm|512px
md|768px
lg|1024px
xl|1280px


### Example

```html example 
<div class="row">
  <div class="col-md-6 col-lg-12"><span>md: 6, lg: 12</span></div>
  <div class="col-md-6 col-lg-12"><span>md: 6, lg: 12</span></div>
</div>
<style>
  [class*="col"] span {
    background: #ccc;
    padding: 1rem;
    display: block;
  }
  .row {
    margin-bottom: 1rem;
  }
</style>
```



## Offsets

Columns can be pushed/pulled by 1-12 column widths.

`.offset-{breakpoint}-{1...12}`


```html example 
<div class="row">
  <div class="offset-md-2 col-6"><span>offset 2</span></div>
</div>
<div class="row">
  <div class="offset-1 col-8"><span>offset 1</span></div>
</div>
<div class="row">
  <div class="offset-8 col-2"><span>offset 8</span></div>
</div>
<style>
  [class*="col"] span {
    background: #ccc;
    padding: 1rem;
    display: block;
  }
  .row {
    margin-bottom: 1rem;
  }
</style>
```


## Variables



```scss
$grid-columns: 12 !default;
$container-max-width: 1440px !default;

$grid-gutter-width: 32px !default;
$grid-gutter-width-lg: 64px !default;

$grid-gutter-widths: (
  xs: $grid-gutter-width,
  lg: $grid-gutter-width-lg
) !default;

$grid-breakpoints: (
  xs: 0,
  sm: $screen-sm,
  md: $screen-md,
  lg: $screen-lg,
  xl: $screen-xl
) !default;
```
