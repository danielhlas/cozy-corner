import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
};

// 2. get curret value
const getSnapshot = () => window.innerWidth;

// 3. value for server/hydratation
const getServerSnapshot = () => 0;


export function useWindowWidth() {
    return useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );
}