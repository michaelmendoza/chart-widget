import React, { useEffect, useState } from 'react';

const WidgetResizer = (props : any) => {

	let debounceStart : any = new Date();
	const debounceTime = 10; // time in ms
	const minWidth = 400;
	const minHeight = 400;
	const [size, setSize] = useState({ width: props.size.width, height: props.size.height });

	useEffect(() => {
		setSize(props.size);
	}, [props.size]);

	const updateSize = (updatedSize : { width:number, height: number}) => {
		setSize(updatedSize);

		const debounceNow : any = new Date();
		if (debounceNow - debounceStart > debounceTime) {
			debounceStart = new Date();
			props.updateSize(updatedSize);
		}
	};

	const handleDrag = (event : any) => {
		event.preventDefault();
		//const dx = event.pageX - 28;
		const dx = window.innerWidth - event.pageX;
		if (event.pageX > 0 && dx > minWidth) {
			updateSize({width: dx, height: size.height});
		}
	};

	const resizerStyle : any = { position: 'absolute', width: 10, height: size.height, top: 0, left: 12, /*right: -5,*/ opacity: 0,	cursor: 'col-resize' };

	return ( 
		<div style={{ width: size.width }} > 
			{props.children}

			<div draggable style={resizerStyle} onDrag={handleDrag}></div>
		</div>
	);
};

export default WidgetResizer;