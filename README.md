# Animated-outline - Draw animated outlines for your images.

- Convert your image into an outline version of it.
- Draw an animated outline from it.
- Customize the animation with options for direction, style, color and delay
- Typed API

## Code Example

```js
import animatedOutline from 'animated-outline';

const canvas = document.querySelector('canvas');
const image = 'map.png';

const start = animatedOutline(canvas, image);
start();
```

## API Reference

```js
const start = animatedOutline(canvas: HTMLCanvasElement, url: string, options: {
			delay?: number;
			direction?: 'ltr' | 'rtl';
			style?: 'solid' | 'dashed';
			color?: string;
	  }
	| undefined)
```
