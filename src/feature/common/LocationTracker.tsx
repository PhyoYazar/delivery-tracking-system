import { useEffect, useState } from 'react';

const LocationTracker = () => {
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);

	useEffect(() => {
		const getLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						setLatitude(position.coords.latitude);
						setLongitude(position.coords.longitude);
					},
					(error) => {
						console.error('Error getting geolocation:', error);
					},
				);
			} else {
				console.error('Geolocation is not supported by this browser.');
			}
		};

		getLocation();
	}, []);

	return (
		<div>
			{latitude && longitude ? (
				<p>
					Latitude: {latitude}, Longitude: {longitude}
				</p>
			) : (
				<p>Loading location...</p>
			)}
		</div>
	);
};

export default LocationTracker;
