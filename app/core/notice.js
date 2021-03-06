import Events from './events';
import {notify, ui as PlatformUI} from 'Platform';
import Lang from '../lang';

const DEFAULT = {
    chats: 0,
    total: 0,
    message: null,
    sound: false,
    tray: false
};

const EVENT = {
    update: 'notice.update',
};

const update = info => {
    info = Object.assign({}, DEFAULT, info);
    info.total = info.chats + 0;

    if(info.sound && notify.playSound) {
        notify.playSound(info.sound);
    }

    if(notify.setBadgeLabel) {
        notify.setBadgeLabel(info.total || '');
    }

    if(notify.updateTrayIcon) {
        if(info.tray) {
            notify.updateTrayIcon(`${Lang.string('app.title')} - ${info.tray.label}`, info.tray.flash);
        } else {
            notify.updateTrayIcon(Lang.string('app.title'));
        }
    }

    if(info.message && notify.showNotification) {
        notify.showNotification(info.message);
    }

    Events.emit(EVENT.update, info);
};

const isMatchWindowCondition = condition => {
    if(condition === 'onWindowHide') {
        return PlatformUI.isWindowOpen;
    }
    if(condition === 'onWindowBlur') {
        return !PlatformUI.isWindowsFocus;
    }
    return true;
};

const onNoticeUpdate = listener => {
    return Events.on(EVENT.update, listener);
};

export default {
    update,
    onNoticeUpdate,
    isMatchWindowCondition,
};
