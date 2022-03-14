import React, {useState, useEffect} from 'react';
import CommonComponent from '../common-component';
import UserInfo from './userInfo';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {getResourceData} from 'redux/actions/cfg';
import {onGetUserList} from 'redux/actions';
import Friend from 'redux/services/friends';

export default function UserEvents() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cfg);
  const allUsers = useSelector((state) =>
    state.userList && state.userList.usersList ? state.userList.usersList : [],
  );
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [reloadData, setReloadData] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {}, [state]);

  useEffect(() => {
    getFriends();
  }, [allUsers, reloadData]);

  useEffect(() => {
    dispatch(onGetUserList({page: 0}));
    getRequests();
  }, [reloadData]);

  const getFriends = async () => {
    const data = await Friend.getFriends();
    const sentFriendRequests = await Friend.getSentFriendRequests();
    if (data) {
      if (data.data) {
        const allFriendsIds = data.data.map((friend) => friend.friend);
        let allFilteredUsers = allUsers.filter(
          (user) => !allFriendsIds.includes(user.id),
        );
        if (sentFriendRequests && sentFriendRequests.data) {
          const allRequestSentIds = sentFriendRequests.data.map(
            (friend) => friend.userId,
          );
          allFilteredUsers = allFilteredUsers.filter(
            (user) => !allRequestSentIds.includes(user.id),
          );
          setFilteredUsers(allFilteredUsers);
        } else setFilteredUsers(allFilteredUsers);
      }
    }
  };

  console.log('all filters userss', filteredUsers);

  const toggleReloadData = () => {
    setReloadData(!reloadData);
  };

  const getRequests = async () => {
    try {
      const data = await Friend.getFriendRequests();
      if (data) {
        if (data.data) {
          setFriendRequests(data.data);
          const friendRequest = await Friend.getFriendRequests();
          console.log('the data of sending request', friendRequest);
          if (friendRequest) {
            if (friendRequest.data) {
              setSentFriendRequests(friendRequest.data);
            }
          }
        }
      }
    } catch (err) {
      console.log('the errrrr', err);
    }
  };

  return (
    <CommonComponent>
      <div>
        <div>
          <h1>Friend Requests</h1>
          <div className='row'>
            {friendRequests.map((request) => {
              return (
                <UserInfo
                  user={
                    allUsers.filter((user) => user.id === request.userId)[0]
                  }
                  addFriend={false}
                  toggleReloadData={toggleReloadData}
                />
              );
            })}
            <UserInfo />
          </div>
        </div>
        <div>
          <h1>People you may know</h1>
          <div className='row'>
            {filteredUsers.map((user) => {
              return (
                <UserInfo
                  user={user}
                  addFriend={true}
                  toggleReloadData={toggleReloadData}
                />
              );
            })}
          </div>
        </div>
      </div>
    </CommonComponent>
  );
}
