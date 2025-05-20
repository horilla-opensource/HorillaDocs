
import jQuery from "jquery";

var $ = jQuery;
const updateVersionDisplay = (path) => {
    const versionMatch = path.match(/\/(functional|technical)\/(v\d+\.\d+)/);
    const version = versionMatch ? versionMatch[2] : null;
    if (version) {
        const versionElement = document.querySelector('#activeVersion');
        if (versionElement) {
            versionElement.textContent = version;
        }
    }
};

setTimeout(() => {
    if (typeof window !== 'undefined') {
      updateVersionDisplay(window.location.pathname);
    }
}, 150);
