import { useEffect } from 'react';

const defaultCfg = {
    noScript: true,
};

const useCSS = (url: string, cfg = defaultCfg): void => {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'style';
        link.onload = function () {
            this.onload = null;
            (this as HTMLLinkElement).rel = 'stylesheet';
        };
        document.head.appendChild(link);

        let htmlEl: HTMLElement;
        if (cfg.noScript) {
            htmlEl = document.createElement('noscript');
            const linkEl = document.createElement('link');
            linkEl.rel = 'stylesheet';
            linkEl.href = url;
            htmlEl.appendChild(linkEl);
            document.head.appendChild(htmlEl);
        }

        return () => {
            !!link && document.head.removeChild(link);
            if (cfg.noScript) {
                !!htmlEl && document.head.removeChild(htmlEl);
            }
        };
    }, [url, cfg]);
};

export default useCSS;
