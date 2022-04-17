import React, {useState, useEffect, lazy} from 'react';
import {
  ExpandMore,
  ExpandLess,
  GroupAdd,
  Mail,
  AddCircle,
} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import Friend from 'redux/services/friends';
import GroupIcon from '@material-ui/icons/Group';
import {Link} from 'react-router-dom';
import './style.css';
import {render} from 'react-dom';

const CommonComponent = lazy(() => import('../common-component'));
const UserDetails = lazy(() => import('./user-details'));
const UserInfoBox = lazy(() => import('./user-info-box'));
const UserPageHeader = lazy(() => import('../user-page-header'));

export default function UserConnections() {
  const [requestsExpanded, setRequestsExpanded] = useState(true);
  const [requestSent, setRequestsSent] = useState(true);
  const [connectionsView, setConnectionView] = useState(true);
  const [currentlySelected, setCurrentlySelected] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [reloadData, setReloadData] = useState(true);
  const [errorCount, setErrorCount] = useState(0);
  const [selectAvatarImage, setSelectAvatarImage] = useState(null);

  const toggleReloadData = () => {
    setReloadData(!reloadData);
  };
  const setSelected = (element) => {
    setCurrentlySelected(element.userData);
    setSelectAvatarImage(element.avatarImage);
  };
  const toggleConnectionView = () => {
    setConnectionView(!connectionsView);
  };

  const toggleRequestsSent = () => {
    setRequestsSent(!requestSent);
  };

  const toggleRequestsExpanded = () => {
    setRequestsExpanded(!requestsExpanded);
  };

  async function getRequests() {
    const data = await Friend.getFriendRequests();
    console.log('the dataaa::', data);
    if (data) {
      if (data.data) {
        setFriendRequests(data.data);
      }
    }
  }

  async function getSentRequests() {
    const data = await Friend.getSentFriendRequests();
    console.log('the data of sending request', data);
    if (data) {
      if (data.data) {
        setSentFriendRequests(data.data);
      }
    }
  }

  async function getFriends() {
    const data = await Friend.getFriends();
    console.log('all get frienbds', data);
    if (data) {
      if (data.data) {
        // let fakeFriends = []
        // fakeFriends.push(data.data[0])
        // fakeFriends.push(data.data[0])
        // fakeFriends.push(data.data[0])
        // fakeFriends.push(data.data[0])
        // fakeFriends.push(data.data[0])
        // fakeFriends.push(data.data[0])
        // fakeFriends.push(data.data[0])
        // fakeFriends.push(data.data[0])
        setFriends(data.data);
      }
    }
  }

  useEffect(() => {
    getFriends();
    getRequests();
    getSentRequests();
  }, [reloadData]);

  function HandleErrorClick() {
    setErrorCount((prevValue) => {
      return prevValue + 1;
    });
  }
  function Bomb() {
    throw new Error('💥 CABOOM 💥');
  }

  const left = (
    <div>
      <div className='requests-section'>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <GroupAdd style={{color: 'green', marginRight: '5px'}} />
          <strong>Connection Requests</strong>
        </div>
        {!requestsExpanded ? (
          <ExpandMore onClick={toggleRequestsExpanded} />
        ) : (
          <ExpandLess onClick={toggleRequestsExpanded} />
        )}
      </div>
      {requestsExpanded && (
        <div className='requests-section-list'>
          {friendRequests.map((element, index) => {
            return (
              <UserInfoBox
                key={index}
                type={'request'}
                userId={element.userId}
                setSelected={setSelected}
                toggleReloadData={toggleReloadData}
              />
            );
          })}
        </div>
      )}
      <br />
      <div className='requests-section'>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Mail style={{color: '#E09B3B', marginRight: '5px'}} />
          <strong>Requests Sent</strong>
        </div>
        {!requestSent ? (
          <ExpandMore onClick={toggleRequestsSent} />
        ) : (
          <ExpandLess onClick={toggleRequestsSent} />
        )}
      </div>
      <div className='requests-section-list'>
        {requestSent &&
          sentFriendRequests.map((element, index) => {
            return (
              <UserInfoBox
                key={index}
                userId={element.userId}
                setSelected={setSelected}
                type={'sent'}
                toggleReloadData={toggleReloadData}
              />
            );
          })}
      </div>
    </div>
  );

  const right = (
    <div>
      <div className='people-button-container'>
        <Link style={{fontSize: 17, color: 'black'}} to='/home/friends'>
          <GroupIcon
            style={{color: 'green', fontSize: 20, marginRight: '5px'}}
          />
          <strong style={{fontSize: 15}}>Peoples</strong>
        </Link>
      </div>
      <div className='requests-section'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Mail style={{color: '#E09B3B', marginRight: '5px'}} />
          <strong>My Connections</strong>
        </div>
        {!connectionsView ? (
          <ExpandMore onClick={toggleConnectionView} />
        ) : (
          <ExpandLess onClick={toggleConnectionView} />
        )}{' '}
      </div>
      <div className='requests-section-list'>
        {connectionsView &&
          friends.map((element, index) => {
            console.log('the fri4end', element);
            return (
              <UserInfoBox
                userId={element.friend}
                type={'connection'}
                key={index}
                setSelected={setSelected}
                toggleReloadData={toggleReloadData}
              />
            );
          })}
      </div>
      <br />
      {/* <Button color='secondary' variant='contained' fullWidth>
        Add Friend
      </Button> */}
      {/* <h1 onClick={HandleErrorClick}>{errorCount}</h1>; */}
    </div>
  );

  return (
    <CommonComponent left={left} right={right}>
      {currentlySelected && (
        <UserDetails
          avatarImage={selectAvatarImage}
          element={currentlySelected}
        />
      )}

      {errorCount === 5 ? <Bomb /> : null}
      <div className='mobile-connections-view'>
        {left}
        {right}
      </div>
    </CommonComponent>
  );
}
