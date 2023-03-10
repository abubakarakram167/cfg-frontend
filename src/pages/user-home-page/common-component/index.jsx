import React, {useState, useEffect} from 'react';
import UserHomeHeader from '../user-page-header';
import {socket} from '../../../socket';
import './style.css';
import {socketEnums} from 'utils/socketEnums';

export default function CommonComponent(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };
  useEffect(() => {
    socket.connectAction();
    console.log(socket.onAction(socketEnums.post));
  }, []);
  const [scroll, setScroll] = useState(0);
  return (
    <div>
      <UserHomeHeader />
      <div className='user-home-page-content'>
        <div className='user-home-left'>{props.left}</div>
        <div
          className='user-home-center'
          onScroll={() => {
            if (props.scroll) {
              console.log(scroll);

              if (scroll === 4) {
                setTimeout(props.scrollAction(), 2000);
                setScroll(0);
              } else {
                setScroll(scroll + 1);
              }
            }
          }}>
          {props.children}
        </div>
        <div className='user-home-right'>{props.right}</div>
      </div>
    </div>
  );
}
