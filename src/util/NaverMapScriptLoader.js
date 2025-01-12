import { useEffect } from 'react';

const NaverMapScriptLoader = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return null;
};

export default NaverMapScriptLoader;
