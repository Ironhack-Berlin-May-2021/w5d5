https://www.mapbox.com/
mapboxgl.accessToken = '<your api token>';

const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/jnrdmnn/ckl1aoosu0afb17r27yya1ti5', // style URL
	center: [13.426, 52.531], // starting position [lng, lat]
	zoom: 9, // starting zoom
	// doubleClickZoom: false
	// pitch: 100
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// const popup = new mapboxgl.Popup({
// 	closeButton: true
// })

// popup.setLngLat([13.426, 52.531])
// 	.setHTML('<h1>Hello Mapbox</h1>')
// 	.setMaxWidth('400px')
// 	.addTo(map);


const coords = [
	[13.405, 52.52],
	[13.6, 52.6]
]

coords.forEach(coord => {
	new mapboxgl.Marker({
		color: 'red'
	})
		.setLngLat(coord)
		.addTo(map);
})

const addMarker = event => {
	new mapboxgl.Marker({
		color: 'yellow',
		draggable: true
	})
		.setLngLat(event.lngLat)
		.addTo(map)
		.on('dragend', e => {
			console.log(e.target._lngLat);
		})
}

// map.on('click', event => { console.log('these are the clicked coords: ', event.lngLat) });
map.on('click', addMarker);

// const marker = new mapboxgl.Marker({
// 	color: 'red',
// 	draggable: true
// })
// 	.setLngLat([13.426, 52.531])
// 	.addTo(map)
// 	.on('dragend', data => {
// 		console.log(data);
// 	})
