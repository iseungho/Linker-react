export const initializeMap = (mapRef, naver, location) => {
    const mapOptions = {
        center: location,
        zoom: 16,
    };
    const newMap = new naver.maps.Map(mapRef.current, mapOptions);
    const newMarker = new naver.maps.Marker({
        position: location,
        map: newMap,
    });
    return { newMap, newMarker };
};

export const updateMapLocation = (map, marker, naver, location, mapRef) => {
    if (map && marker) {
        map.setCenter(location);
        marker.setPosition(location);
    } else {
        const { newMap, newMarker } = initializeMap(mapRef, naver, location);
        map = newMap;
        marker = newMarker;
    }
    return { map, marker };
};

export const addMapClickListener = (map, marker, naver, onLocationSelect) => {
    naver.maps.Event.addListener(map, "click", function (e) {
        const clickedLocation = e.latlng;
        marker.setPosition(clickedLocation);

        reverseGeocodeAddress(clickedLocation, naver, onLocationSelect);
    });
};

export const geocodeAddress = (address, naver, callback) => {
    naver.maps.Service.geocode({ query: address }, (status, response) => {
        if (status === naver.maps.Service.Status.OK && response.v2.addresses.length > 0) {
            const result = response.v2.addresses[0];
            const lat = parseFloat(result.y);
            const lng = parseFloat(result.x);
            const location = new naver.maps.LatLng(lat, lng);
            callback(location);
        } else {
            alert("올바른 주소를 입력하세요.");
        }
    });
};

export const reverseGeocodeAddress = (location, naver, callback) => {
    naver.maps.Service.reverseGeocode(
        { coords: location, orders: naver.maps.Service.OrderType.ROAD_ADDR },
        (status, response) => {
            if (status === naver.maps.Service.Status.OK) {
                const result = response.v2.address;
                const roadAddress = result.roadAddress || result.jibunAddress;
                callback(roadAddress);
            } else {
                alert("올바른 주소를 입력하세요.");

            }
        }
    );
};
