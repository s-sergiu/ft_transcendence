import React, { useState } from 'react';
import Contacts from './Contacts';
import ChatWindow from './ChatWindow';
import ProfilePage from './ProfilePage';
import Header from './Header';
import logoPic from './pingpong-icon.webp';
import GetFriendList from '../GetFriendList';

const ChatBox = ({ 
  userData,
  setActiveChat,
  onSendFriendRequest,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onSendGameInvite,
  onBlockUser,
  onUnblockUser,
  onDeleteContact,
  onSendMessage,
  onAcceptGameInvite,
  onDeclineGameInvite, 
  activeChat,
  onClose,
  socket }) => {

    const [view, setView] = useState('contacts');
    const [activeProfile, setActiveProfile] = useState(null);
    const { friendList } = GetFriendList(userData);

    const handleViewChange = (view) => setView(view);

    return (
        <div className="chat-box">
            <Header logoPic={logoPic} />
            {view === 'contacts' && friendList && ( 
                <Contacts
                    contacts={friendList}
                    onChat={(contact) => {
                        setActiveChat(contact);
                        handleViewChange('chat');
                    }}
                    onViewProfile={(contact) => {
                        setActiveProfile(contact);
                        handleViewChange('profile');
                    }}
                    onClose={onClose}
                    onSendFriendRequest={onSendFriendRequest}
                    onAcceptFriendRequest={onAcceptFriendRequest}
                    onDeclineFriendRequest={onDeclineFriendRequest}
                    onSendGameInvite={onSendGameInvite}
                    onBlockUser={onBlockUser}
                    onUnblockUser={onUnblockUser}
                    onDeleteContact={onDeleteContact}
                />
            )}
            {view === 'chat' && activeChat && (
                <ChatWindow
                    contact={activeChat}
                    onClose={onClose}
                    onBack={() => {
                        setActiveChat(null);
                        handleViewChange('contacts');
                    }}
                    socket={socket}
                    onSendMessage={onSendMessage}
                    onAcceptGameInvite={onAcceptGameInvite}
                    onDeclineGameInvite={onDeclineGameInvite}
                />
            )}
            {view === 'profile' && activeProfile && (
                <ProfilePage
                    contact={activeProfile}
                    onBack={() => {
                        setActiveProfile(null);
                        handleViewChange('contacts');
                    }}
                />
            )}
        </div>
    );
};

export default ChatBox;
