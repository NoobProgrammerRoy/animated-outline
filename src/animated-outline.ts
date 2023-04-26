// Type definitions
type Point = {
	x: number;
	y: number;
};
type Outline = Point[];
type Options =
	| {
			delay?: number;
			direction?: 'ltr' | 'rtl';
			style?: 'solid' | 'dashed';
			color?: string;
	  }
	| undefined;

// Function to draw an animated outline of an image
// Takes 3 parameters - 2 required and 1 optional
// 1. canvas - canvas on which image will be drawn
// 2. url - url of the image
// 3. options - object containing list of options (delay, direction, style, color)
function animatedOutline(
	canvas: HTMLCanvasElement,
	url: string,
	options: Options = {
		delay: 1,
		direction: 'ltr',
		style: 'solid',
		color: 'black',
	}
) {
	// Consts and variables
	const ctx = canvas?.getContext('2d');

	if (!ctx) {
		return null;
	}

	// Initialize variables
	const delay = options.delay ?? 1;
	const direction = options.direction ?? 'ltr';
	const style = options.style ?? 'solid';
	const color = options.color ?? 'black';

	// Function to get outline from image
	function getOutlineFromImage() {
		const image = new Image();
		const outline: Outline = [];
		image.src = url;
		image.crossOrigin = 'Anonymous';

		// Function to get outline from onload event listener
		function getOutline() {
			try {
				ctx!.clearRect(0, 0, image.width, image.height);
				ctx!.drawImage(image, 0, 0);
				for (let i = 0; i < image.width; i++) {
					for (let j = 0; j < image.height; j++) {
						const imageData = ctx!.getImageData(i, j, 1, 1);
						const rgba = imageData.data;

						// Push non-white points only
						if (rgba[0] <= 191 && rgba[1] <= 191 && rgba[2] <= 191)
							outline.push({
								x: i,
								y: j,
							});
					}
				}
				ctx!.clearRect(0, 0, image.width, image.height);
				drawOutline(outline);
			} catch {
				throw new Error('Error: could not animate image!');
			} finally {
				image.removeEventListener('load', getOutline);
			}
		}

		// Load image to get outline from image
		image.addEventListener('load', getOutline);
	}

	// Function to draw outline
	async function drawOutline(outline: Outline) {
		// Check for color
		ctx!.strokeStyle = color;
		// Check for style
		const increment = style === 'solid' ? 1 : 2;

		ctx!.beginPath();
		// Check for direction
		if (direction === 'ltr') {
			for (let i = 0; i < outline.length; i += increment) {
				// Check for delay
				if (delay > 0) {
					await timer(delay);
				}
				drawPoint(outline[i]);
				ctx!.stroke();
			}
		} else if (direction === 'rtl') {
			for (let i = outline.length - 1; i >= 0; i -= increment) {
				// Check for delay
				if (delay > 0) {
					await timer(delay);
				}
				drawPoint(outline[i]);
				ctx!.stroke();
			}
		}
		ctx!.closePath();
	}

	// Function to draw outline point
	function drawPoint(pt: Point) {
		ctx!.moveTo(pt.x, pt.y);
		ctx!.lineTo(pt.x + 1, pt.y + 1);
	}

	// Function to create a timer
	function timer(time: number) {
		return new Promise((res) => setTimeout(res, time));
	}

	// Function to start rendering
	function start() {
		getOutlineFromImage();
	}

	return start;
}

export default animatedOutline;
