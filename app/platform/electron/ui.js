import {
    shell,
    remote as Remote,
    nativeImage as NativeImage,
} from 'electron';
import remote from './remote';
import env from './env';

let _appRoot = null;
remote.call('appRoot').then(path => {
    _appRoot = path;
});

const userDataPath = Remote.app.getPath('userData');
const browserWindow = Remote.getCurrentWindow();

let onRequestQuitListener = null;

const makeFileUrl = url => {
    return url;
};

const setBadgeLabel = (label = '') => {
    return remote.call('dockBadgeLabel', (label || '') + '');
};

const setShowInTaskbar = flag => {
    return browserWindow.setSkipTaskbar(!flag);
};

const setTrayTooltip = tooltip => {
    return remote.call('trayTooltip', tooltip);
};

const flashTrayIcon = (flash = true) => {
    return remote.call('flashTrayIcon', flash);
};

const showWindow = () => {
    browserWindow.show();
};

const hideWindow = () => {
    browserWindow.hide();
};

const focusWindow = () => {
    browserWindow.focus();
};

const showAndFocusWindow = () => {
    showWindow();
    focusWindow();
};

const quit = (delay = 1000) => {
    if(delay !== true && onRequestQuitListener) {
        if(onRequestQuitListener() === false) {
            return;
        }
    }
    hideWindow();
    if(delay) {
        setTimeout(() => {
            remote.call('quit');
        }, delay);
    } else {
        remote.call('quit');
    }
};

const onRequestQuit = listener => {
    onRequestQuitListener = listener;
};

const onWindowFocus = listener => {
    browserWindow.on('focus', listener);
};

remote.onRequestQuit(() => {
    quit();
});

export default {
    userDataPath,
    browserWindow,
    makeFileUrl,
    openExternal: shell.openExternal,
    showItemInFolder: shell.showItemInFolder,
    openFileItem: shell.openItem,
    setBadgeLabel,
    setShowInTaskbar,
    setTrayTooltip,
    flashTrayIcon,
    onRequestQuit,
    onWindowFocus,

    showWindow,
    hideWindow,
    focusWindow,
    showAndFocusWindow,
    quit,

    get isWindowsFocus() {
        return browserWindow.isFocused();
    },

    get isWindowOpen() {
        return !browserWindow.isMinimized() && browserWindow.isVisible();
    },

    get isWindowOpenAndFocus() {
        return browserWindow.isFocused() && !browserWindow.isMinimized() && browserWindow.isVisible();
    },

    get appRoot() {
        return _appRoot;
    },
};
