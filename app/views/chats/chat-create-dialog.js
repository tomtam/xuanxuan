import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../components/modal';
import ChatCreateView from './chat-create';
import Lang from '../../lang';
import App from '../../core';

const show = (chat, callback) => {
    const modalId = 'app-chat-create-dialog';
    return Modal.show({
        id: modalId,
        title: Lang.string('chat.create.title'),
        style: {
            left: 10,
            right: 10,
            bottom: 0,
            top: 10
        },
        className: 'dock primary-pale',
        actions: false,
        content: <ChatCreateView onRequestClose={() => {
            Modal.hide(modalId);
        }}/>
    }, callback);
};

export default {
    show,
};
