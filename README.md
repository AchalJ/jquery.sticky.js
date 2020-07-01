jquery.sticky.js
================
A simple jQuery extension to make any HTML element sticky on scroll.

## Installation
Just download the script and include it in your HTML:

```html
<script type="text/javascript" src="path/to/jquery.sticky.js"></script>
```

## Example
Here's how easy to make any element sticky:

```html
<script type="text/javascript">
	jQuery('.your-element').sticky();
</script>
```

#### With additional offset

```js
jQuery('.your-element').sticky({
	offsetY: 50
});
```

#### With outerWidth

```js
jQuery('.your-element').sticky({
	offsetY: 50,
	outerWidth: true
});
```

### Destroy
```js
jQuery('.your-element').sticky('destroy');
```

## Options
- `offsetY` (number) - Additional vertical offset. `default: 0`
- `outerWidth` (boolean) - Whether to use element's outerWidth or normal width. `default: false`
- `zIndex` (number) - To make sticky element overlap other elements. `default: 99`
- `cssClass` (string) - A custom CSS class to apply on sticky element on scroll. `default: element-sticky`