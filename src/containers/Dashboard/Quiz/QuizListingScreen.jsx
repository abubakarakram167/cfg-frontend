import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';
import Datatable from '../../../components/Datatable/Datatable';
import { quizList } from '../../../store/actions/quiz.actions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import history from '../../../utils/history';
import _ from 'lodash';

class MultipleListingScreen extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    role: '',
    telephone: '',
    group: '',
    author: '',
    publish_date: '',
    expiry_date: '',
    points: '',
    category: '',
    categories: [],
    status: '',
    quizSuccess: '',
    quizFail: '',
    startDatePlaceHolder: true,
    endDatePlaceHolder: true,
    heads:[]
  };

  componentDidMount() {
    
    this.props['quizList'](`_count=100&_pageNo=1`);
    localStorage.removeItem("session");

  }

  handleSelected = (data) => {
    this.setState({
      heads: data.selectedRows,
    });
  };
  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  editUser = (e) => {
    e.preventDefault();
    if (!this.state.heads.length || this.state.heads.length > 1) {
      toast.error('Please select only one row to edit');
      return;
    }
    history.push({
      pathname: `/edit/${this.props.pathname}`,
      state: { head: this.state.heads[0] },
    });
  };
  onRowClicked = (content) => {
    const locationShould = history?.location?.pathname;
    history.push({
      pathname: locationShould === "/listing/session" ? 
      `/content/detail/session` : `/content/${this.props.pathname}`,
      state: { content },
    });
    localStorage.setItem("session", JSON.stringify(content));
  };

  render() {
    const columns = [
      //   {
      //     name: 'ID',
      //     selector: 'id',
      //     sortable: true,
      //   },
      {
        name: 'Name',
        selector: 'title',
      },
      {
        name: 'Author',
        selector: 'author.first_name',
        cell: (row) => (
          <span>
            {_.get(row, 'author.first_name', undefined) ||
              _.get(row, 'author.user_name', undefined) ||
              _.get(row, 'author.email')}
          </span>
        ),
      },
      {
        name: 'Start Date',
        selector: 'start_date',
      },
      {
        name: 'End Date',
        selector: 'end_date',
      },
      {
        name: 'Total Points',
        selector: 'total_points',
      },
      {
        name: 'Status',
        selector: 'status',
      },
    ];
    const conditionalRowStyles = [
      {
        when: (row) => !row.isEven,
        style: {
          backgroundColor: '#E8F8FF',
        },
      },
    ];
    return (
      <>
        <article>
          <Helmet>
            <title>
              Quiz List
            </title>
            <meta
              name='description'
              content='A React.js Boilerplate application homepage'
            />
          </Helmet>
        </article>
        <Header />
        <main>
          <div className='dash-wrapper'>
            <div className='row dash-session-header'>
              <div className='col-md-8'>
                <label
                  style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                  }}
                >
                  {' '}
                  Quiz List
                </label>
                <Link
                  to={`/add/${this.props.pathname}`}
                  type='button'
                  className='button-title-small button_inline m-l-15 um_primary_button'
                >
                  <i className='fas fa-plus-circle' /> Add new
                </Link>
                <button
                  onClick={this.editUser}
                  type='button'
                  className='button-title-small button_inline m-l-15'
                >
                  <i className='fas fa-edit' /> Edit
                </button>
              </div>
            </div>
            <div className={'row'}>
              {/*<div className={"col-md-1"}/>*/}
              <div className={'col-md-12'}>
                <Datatable
                  data={this.props.data}
                  columns={columns}
                  handleSelected={this.handleSelected}
                  conditionalRowStyles={conditionalRowStyles}
                  onRowClicked={this.onRowClicked}
                />
              </div>
              {/*<div className={"col-md-1"}/>*/}
            </div>
          </div>
        </main>
      </>
    );
  }
}

function mapPropsToState(store) {
  let pathname;
  if (store.router && store.router.location && store.router.location.pathname) {
    pathname = store.router.location.pathname;
    if (~pathname.indexOf('/')) {
      pathname = pathname.split('/');
      pathname = pathname[pathname.length - 1];
    }
  }
  return {
    pathname,
    count: _.get(store, 'dynamic.listing.count', 0),
    data: _.get(store, 'dynamic.listing.data', []),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    quizList: (urlString) => dispatch(quizList(urlString)),
    push: (param) => dispatch(push(param)),
  };
};
export default connect(
  mapPropsToState,
  mapDispatchToProps
)(MultipleListingScreen);
