import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {getContentData} from 'redux/actions/sessionActions';
import AdminHeader from 'pages/admin-header';
import './style.css';
import {Link} from 'react-router-dom';

export default function ContentDisplay() {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const [data, setData] = useState(null);
  useEffect(() => {
    dispatch(getContentData(params.id));
  }, [params.id, dispatch]);
  useEffect(() => {
    if (state.currentContent) {
      setData(state.currentContent);
    }
  }, [state]);

  return (
    <div className='content-display-body'>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>

      <br />

      <div className='titles-container-display-page'>
        <div className='title-display-container'>
          <h1>{data && data.title}</h1>
          <h6>{data && data.sub_title}</h6>
        </div>
      </div>

      <div className='display-content-container'>
        <br />
        <br />

        <div
          className='display-content'
          dangerouslySetInnerHTML={{__html: data ? data.detail : ''}}></div>
      </div>

      <div className='content-display-buttons-container'>
        <div className='content-display-buttons'>
          {data && data.previous_page && (
            <Link to={`/admin/content/display/${data.previous_page}`}>
              <button className='next-prev-button'>Previous</button>
            </Link>
          )}
          {data && data.next_page && (
            <Link to={`/admin/content/display/${data.next_page}`}>
              <button className='next-prev-button'>Next</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
