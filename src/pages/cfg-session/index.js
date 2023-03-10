import React, {useState, useEffect} from 'react';
import AdminHeader from 'pages/admin-header';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ControlPoint from '@material-ui/icons/ControlPoint';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';
import CustomTablePagination from '../user-management/pagination';
import moment from 'moment';
import jsCookie from 'js-cookie';
import FilterList from '@material-ui/icons/FilterList';
import {useHistory} from 'react-router-dom';
import {
  Dialog,
  List,
  ListItem,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers';
import formatDate from 'utils/formatDate';
import MediaGroup from 'redux/services/mediagroup';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useDispatch, useSelector} from 'react-redux';
import {
  createSession,
  getSessionData,
  editContent,
} from 'redux/actions/sessionActions';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Show_Message} from '../../shared/constants/ActionTypes';
import Categories from 'modules/dashboard/CRM/MonthlyEarning/Categories';

const CustomSelect = withStyles((theme) => ({
  select: {
    paddingLeft: 12,
    paddingBottom: 17,
    paddingTop: 17,
    backgroundColor: '#eaeaea',
    color: '#232424',
  },
}))(Select);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'none',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTextField = withStyles((theme) => ({}))(TextField);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    '& .MuiInputBase-root': {
      height: 45,
      paddingLeft: 10,
      color: '#020101',
    },
  },
  secondRoot: {
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
});

export default function CfgTool(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const permissions = useSelector((state) => state.roles.permissions);
  const [content, setContent] = useState([]);
  const [checked, setChecked] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [start_date, setstart_date] = useState(new Date());
  const [publishDate, setPublishDate] = useState(new Date());
  const [end_date, setend_date] = useState(new Date());
  const [total_points, settotal_points] = useState('');
  const [status, setStatus] = useState('draft');
  const [edit, setEdit] = useState(false);
  const [currentIds, setCurrentIds] = useState([]);
  const [singleId, setSingleId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const userList = useSelector((state) => state.userList);
  const [currentCheckState, setCurrentCheckState] = useState(false);
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [publishDateFilter, setPublishdateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [totalPointsFilter, settotalPointsFilter] = useState('');
  const [category, setCategories] = useState([]);
  const [group, setGroup] = useState('candidate');
  const [value, setValue] = useState('');
  const history = useHistory();

  useEffect(() => {
    setContent(state.content);
  }, [state]);

  useEffect(() => {
    dispatch(getSessionData());
    setAuthor(JSON.parse(jsCookie.get('user')).user_name);
  }, [dispatch]);

  useEffect(() => {
    if (!permissions.cfgSession.view) {
      history.push({
        pathname: '/unAuthorizedPage',
      });
    }
  }, []);

  const toggleCheckbox = (id) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((element) => element !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const toggleAll = () => {
    if (!currentCheckState) {
      let arr = [];
      content.forEach((element) => {
        arr.push(element.id);
      });
      setChecked(arr);
      setCurrentCheckState(true);
    } else {
      setCurrentCheckState(false);
      setChecked([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      dispatch(
        editContent({
          title,
          type: 'session',
          start_date,
          total_points,
          end_date,
          status,
          assigned_group: group,
          categories: JSON.stringify(category),
          id: singleId,
          group_id: selectedMediaGroup,
        }),
      ).then((res) => {
        if (res) {
          const allContent = content.map((content) => {
            if (content.id === singleId) {
              return {
                ...content,
                title,
                total_points,
                status,
                start_date: moment(start_date).format('YYYY-MM-DD'),
                end_date: moment(end_date).format('YYYY-MM-DD'),
                assigned_group: group,
              };
            } else return content;
          });
          toggleCheckbox(singleId);
          setSingleId(null);
          setContent(allContent);
        }
      });
    } else {
      let allContents = state.content;
      if (allContents.filter((content) => content.title === title).length > 0) {
        dispatch({
          type: Show_Message,
          payload: {message: 'Title already Exist', success: false},
        });
      } else {
        dispatch(
          createSession({
            title,
            author,
            start_date: formatDate(start_date),
            end_date: formatDate(end_date),
            total_points,
            status,
            assigned_group: group,
            categories: JSON.stringify(category),
            group_id: selectedMediaGroup,
          }),
        );
      }
    }

    setTitle('');
    setAuthor('');
    setstart_date(new Date());
    setend_date(new Date());
    settotal_points('');
    setStatus('');
    setDialogOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
    dispatch({type: Show_Message, payload: {message: null, success: false}});
  };

  const handleKeywordSubmit = (e) => {
    e.preventDefault();
    setCategories([...category, value]);
    setValue('');
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      setCategories([...category, e.target.value]);
      setValue('');
      e.preventDefault();
    }
  };

  const [groupModal, setGroupModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [mediaGroups, setMediaGroups] = useState([]);
  const [selectedMediaGroup, setSelectedMediaGroup] = useState(0);
  useEffect(() => {
    getMediaGroups();
  }, []);
  function handleCloseGroup() {
    setGroupModal(false);
  }

  const getMediaGroups = async () => {
    const data = await MediaGroup.getMediaGroup();
    setMediaGroups(data.data);
  };

  const createMediaGroup = async () => {
    const data = await MediaGroup.createGroup({
      name: groupName,
      type: 'private',
    });
    setSelectedMediaGroup(data.data.id);
    setGroupModal(false);
    getMediaGroups();
  };

  return (
    <div>
      <Dialog
        open={groupModal}
        onClose={handleCloseGroup}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Create Group</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Group Name</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Enter group name'
            type='text'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGroup} color='primary'>
            Cancel
          </Button>
          <Button onClick={createMediaGroup} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpen}>
        <DialogTitle>
          <div style={{minWidth: '400px'}}>Add New CFG Session</div>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem>
              <TextField
                label='Name'
                variant='filled'
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
                required
                value={title}
              />
            </ListItem>
            <ListItem>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/DD/yyyy'
                margin='normal'
                fullWidth={true}
                label='Start Date'
                value={moment(start_date).format('MM/DD/yyyy')}
                onChange={(e) => setstart_date(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                required
              />
            </ListItem>
            <ListItem>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/DD/yyyy'
                margin='normal'
                fullWidth={true}
                label='End Date'
                value={moment(end_date).format('MM/DD/yyyy')}
                onChange={(e) => setend_date(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                required
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Total Points'
                variant='filled'
                fullWidth
                onChange={(e) => settotal_points(e.target.value)}
                required
                value={total_points}
                type='number'
              />
            </ListItem>
            <ListItem>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                onChange={(e) => setGroup(e.target.value)}
                variant='filled'
                fullWidth
                value={group}
                label='Group'
                required>
                <MenuItem value={'candidate'}>Candidate</MenuItem>
                <MenuItem value={'facilitator'}>Facilitator</MenuItem>
                <MenuItem value={'content-manager'}>Content Manager</MenuItem>
                <MenuItem value={'support'}>Support</MenuItem>
                <MenuItem value={'reviewer'}>Reviewer</MenuItem>
                <MenuItem value={'system-administrator'}>
                  System Adminsitrator
                </MenuItem>
                <MenuItem value={'auditor'}>Auditor</MenuItem>
              </Select>
            </ListItem>
            <ListItem>
              <div>
                {category &&
                  category.map((element, index) => {
                    return (
                      <Chip
                        label={element}
                        key={index}
                        className='chip-style'
                        onDelete={() => {
                          setCategories(
                            category.filter((value) => value !== element),
                          );
                        }}
                      />
                    );
                  })}
              </div>
            </ListItem>
            <ListItem>
              <div style={{width: '100%'}}>
                <TextField
                  className={classes.secondRoot}
                  variant='filled'
                  value={value}
                  onKeyDown={keyPress}
                  onChange={(e) => setValue(e.target.value)}
                  fullWidth
                  label='Categories'
                />
              </div>
            </ListItem>
            <ListItem>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                variant='filled'
                fullWidth
                value={status}
                label='status'
                required>
                <MenuItem value={''}>
                  <em>Status</em>
                </MenuItem>
                <MenuItem value={'saved'}>Saved</MenuItem>
                <MenuItem value={'draft'}>Draft</MenuItem>
                <MenuItem value={'published'}>Published</MenuItem>
              </Select>
            </ListItem>
            <ListItem>
              <CustomSelect
                fullWidth
                placeholder='Media Group'
                onChange={(e) => {
                  setSelectedMediaGroup(e.target.value);
                }}
                value={selectedMediaGroup}>
                <MenuItem value={0}>Select Media Group</MenuItem>
                <MenuItem onClick={() => setGroupModal(true)}>
                  + Add Group
                </MenuItem>
                {mediaGroups.map((element, index) => {
                  return (
                    <MenuItem value={element.id} key={index}>
                      {element.name}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
            </ListItem>
            <ListItem>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Button size='large' onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button size='large' type='submit'>
                  Save
                </Button>
              </div>
            </ListItem>
          </List>
        </form>
      </Dialog>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />
      <br />
      <Container
        style={{
          maxWidth: 5000,
          width: '96%',
        }}>
        <Snackbar
          open={userList.message}
          autoHideDuration={6000}
          onClose={handleClose1}>
          <Alert
            variant='filled'
            onClose={handleClose1}
            severity={userList.success ? 'success' : 'error'}>
            {userList.message}
          </Alert>
        </Snackbar>
        <div className='options'>
          <Typography variant='h6'>CFG Session</Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            disabled={!permissions.cfgSession.create}
            label={'ADD NEW'}
            className='chip-style'
            onClick={() => {
              if (singleId) toggleCheckbox(singleId);
              setSingleId(null);
              setEdit(false);
              setDialogOpen(true);
              setTitle('');
              setstart_date(new Date());
              setend_date(new Date());
              settotal_points('');
              setStatus('draft');
              setCategories([]);
              setValue('');
            }}
          />
          <Chip
            icon={<EditIcon style={{fill: 'white', fontSize: 20}} />}
            label={'EDIT'}
            disabled={!permissions.cfgSession.update}
            className='chip-style gray-chip'
            onClick={() => {
              setEdit(true);
              if (singleId) setDialogOpen(true);
            }}
          />
        </div>
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Checkbox checked={currentCheckState} onChange={toggleAll} />
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Name </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Name'
                      placeholder=''
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Author </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Author'
                      placeholder=''
                      value={authorFilter}
                      onChange={(e) => setAuthorFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Publish Date </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: 40,
                    }}>
                    <KeyboardDatePicker
                      disableToolbar
                      style={{backgroundColor: '#eaeaea'}}
                      variant='filled'
                      format='YYYY-MM-DD'
                      autoOk={true}
                      value={
                        publishDateFilter === '' ? null : publishDateFilter
                      }
                      fullWidth={true}
                      placeholder='Publish date'
                      className={classes.root}
                      onChange={(e) => {
                        if (e && e !== '')
                          setPublishdateFilter(
                            moment(e).format('YYYY-MM-DD').toString(),
                          );
                        else setPublishdateFilter('');
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                {/* <StyledTableCell>
                  <span className='column-heading'> End Date </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: 40,
                    }}>
                    <KeyboardDatePicker
                      disableToolbar
                      style={{backgroundColor: '#eaeaea'}}
                      variant='filled'
                      format='YYYY-MM-DD'
                      autoOk={true}
                      value={endDateFilter === '' ? null : endDateFilter}
                      fullWidth={true}
                      placeholder='End date'
                      className={classes.root}
                      onChange={(e) => {
                        if (e && e !== '')
                          setEnddateFilter(
                            moment(e).format('YYYY-MM-DD').toString(),
                          );
                        else setEnddateFilter('');
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell> */}
                <StyledTableCell>
                  <span className='column-heading'> Total Points </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Total Points'
                      placeholder=''
                      value={totalPointsFilter}
                      onChange={(e) => settotalPointsFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Status </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Status'
                      placeholder=''
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.length > 0 &&
                rowsPerPage > 0 &&
                content
                  .sort(function (a, b) {
                    return new Date(b.created_at) - new Date(a.created_at);
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((element) =>
                    (element.title ? element.title : '')
                      .toLowerCase()
                      .startsWith(nameFilter),
                  )
                  .filter((element) =>
                    (element.author ? element.author.user_name : '')
                      .toLowerCase()
                      .startsWith(authorFilter),
                  )
                  .filter((element) =>
                    (element.status ? element.status : '')
                      .toLowerCase()
                      .startsWith(statusFilter),
                  )
                  .filter((element) =>
                    (element.total_points
                      ? element.total_points.toString()
                      : ''
                    )
                      .toLowerCase()
                      .startsWith(totalPointsFilter),
                  )
                  .filter((element) =>
                    (element.created_at ? element.created_at.toString() : '')
                      .toLowerCase()
                      .startsWith(publishDateFilter),
                  )
                  .map((row, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <Checkbox
                            checked={checked.includes(row.id)}
                            onChange={() => {
                              const {author} = row;
                              let allIds = currentIds.length ? currentIds : [];
                              if (!allIds.includes(row.id)) allIds.push(row.id);
                              else {
                                allIds = allIds.filter(
                                  (userId) => userId !== row.id,
                                );
                              }
                              setSingleId(row.id);
                              setCurrentIds(allIds);
                              setTitle(row.title);
                              setPublishDate(row.created_at);
                              setstart_date(row.start_date);
                              setend_date(row.end_date);
                              settotal_points(row.total_points);
                              setStatus(row.status);
                              setGroup(row.assigned_group);
                              setCategories(JSON.parse(row.categories));
                              toggleCheckbox(row.id);
                              setSelectedMediaGroup(row.group_id);
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          {' '}
                          <Link to={`/admin/cfg-session/${row.id}`}>
                            {row.title}
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.author
                            ? row.author.user_name
                            : 'Name Not Present'}
                        </StyledTableCell>
                        <StyledTableCell>
                          {moment(row.created_at).format('YYYY-MM-DD')}
                        </StyledTableCell>
                        {/* <StyledTableCell>{row.end_date}</StyledTableCell> */}
                        <StyledTableCell>{row.total_points}</StyledTableCell>
                        <StyledTableCell>{row.status}</StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              <StyledTableRow style={{width: 200}}>
                <CustomTablePagination
                  rowsPerPage={rowsPerPage}
                  page={page}
                  userData={content}
                  style={{width: 200}}
                  setPage={(page) => setPage(page)}
                  setRowsPerPage={(page) => setRowsPerPage(page)}
                />
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
