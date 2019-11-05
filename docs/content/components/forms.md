---
title: Forms
---

## General guidelines

- Use vertical aligned forms (label above field)
- Try to supply example content via the `placeholder` attribute when possible
- Use [help text](#help-text) for fields with complex requirements
- Group multiple checkboxes/radio inputs in [fieldset with legend](#checkboxes-and-radios)
- Error messaging must be next to the related field
- Use checkboxes or radios instead of a dropdown with 2-3 options
- Use descriptive submit button labels ("Do the thing" not "Submit")
- Avoid reset/clear buttons
- Use proper `for` attributes on `label`s

<!-- - Right align long form submit buttons  -->


```html example
<form>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" required>
  </div>
  <div class="form-group">
    <label for="name">Name (optional)</label>
    <input type="text" class="form-control" id="name">
  </div>
  <div class="form-group">
    <label for="topic">Topic</label>
    <select class="form-control" id="topic" required>
      <option selected>Choose a topic...</option>
      <option value="">Found a bug</option>
    </select>
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea class="form-control" id="message" required></textarea>
  </div>
  <div class="form-group">
    <button type="submit" class="button button--primary">Send message</button>
  </div>
</form>
```


## Dropdowns
```html example
<div class="form-group">
  <label for="">Choose a country</label>
  <select class="form-control">
    <option value="">United States</option>
  </select>
</div>
```


## Checkboxes and radios

Group multiple checkboxes and radios with `fieldset` and `legend` since each input should have its own label.

### Checkboxes

```html example
<fieldset>
  <legend class="label">Status</legend>

  <div class="form-check">
    <input type="checkbox" name="status" class="form-check__input" id="open">
    <label for="open" class="form-check__label">Open</label>
  </div>
  <div class="form-check">
    <input type="checkbox" name="status" class="form-check__input" id="closed">
    <label for="closed" class="form-check__label">Closed</label>
  </div>
  <div class="form-check">
    <input type="checkbox" name="status" class="form-check__input" id="pending">
    <label for="pending" class="form-check__label">Pending</label>
  </div>
</fieldset>
```

### Radios

```html example
<fieldset>
  <legend class="label">Frequency</legend>

  <div class="form-check">
    <input type="radio" name="frequency" class="form-check__input" id="daily">
    <label for="daily" class="form-check__label">Daily</label>
  </div>
  <div class="form-check">
    <input type="radio" name="frequency" class="form-check__input" id="weekly">
    <label for="weekly" class="form-check__label">Weekly</label>
  </div>
  <div class="form-check">
    <input type="radio" name="frequency" class="form-check__input" id="monthly">
    <label for="monthly" class="form-check__label">Monthly</label>
  </div>
</fieldset>
```

<!-- ## File browser

```html example
<div class="form-file">
  <input type="file" class="form-file__input" id="customFile">
  <label class="form-file__label button button--primary" for="customFile">Choose file</label>
</div>
``` -->

## Help text

```html example
<div class="form-group">
  <label for="help-text-username">Username</label>
  <input type="text" class="form-control" id="help-text-username" aria-describedby="help-text-username-form-text">
  <p class="form-text" id="help-text-username-form-text">Letters and numbers only</p>
</div>
```

<!-- ## Required fields 
Use `<abbr title="required">*</abbr>` to denote required fields.

```html example
<div class="form-group">
  <label> Email <abbr title="required">*</abbr></label>
  <input type="email" class="form-control">
</div>
``` -->

## Validation

### Form errors

Display error messages alongside their field.

```html example
<div class="form-group">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control form-control--is-error" value="test example.com" required>
  <p class="form-feedback form-feedback--is-error">Email is not valid</p>
</div>
```

### Optional vs. required fields

- Mark all required fields with an asterisk after the label and all optional fields with `(optional)`. Doing so ensures the field's requirement is clear across varying screen sizes.
- Use `required` attribute on required fields
- Ensure your form's submit button has `type="submit"` attribute whether it is an `input` or `button`

```html example
<form>
  <div class="form-group">
    <label for="email">Email*</label>
    <input type="email" class="form-control" required>
  </div>
  <div class="form-group">
    <label for="name">Name (optional)</label>
    <input type="text" class="form-control">
  </div>
  <div class="form-group">
    <button type="submit" class="button button--primary">Subscribe</button>
  </div>
</form>
```
