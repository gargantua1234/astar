class CanvasUtils {

	static prepareCanvas(width, height) {
		let canvas = createCanvas(width, height);
		background(0);
		canvas.parent('sketch-holder');
	}

}