import React, {useState, useEffect} from 'react';
import AdminHeader from 'pages/admin-header';
import {Container, Select, MenuItem, TextField} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import ContentEditable from 'react-contenteditable';
import './style.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {KeyboardDatePicker} from '@material-ui/pickers';
import PublishIcon from '@material-ui/icons/Publish';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useParams} from 'react-router-dom';
import formatDate from 'utils/formatDate';
import {createSessionTitle} from 'redux/actions/sessionActions';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom';
import {getContentData, editContent} from 'redux/actions/sessionActions';

export default function Editor() {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Enter a title');
  const [sub_title, setsub_title] = useState('Enter a subtitle');
  const [appliedGroup, setAppliedGroup] = useState('');
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [value, setValue] = useState('');
  const [start_date, setstart_date] = useState(new Date());
  const [end_date, setend_date] = useState(new Date());
  const [status, setStatus] = useState('draft');
  const [total_points, settotal_points] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [createdContentId, setCreatedContentId] = useState(0);
  const [previous_page, setprevious_page] = useState('');
  const [next_page, setnext_page] = useState('');
  const [contentType, setContentType] = useState('');

  const handleEditorChange = (e) => {
    setContent(e);
    setImageData(
      e.split('"').filter((element) => element.startsWith('data:image')),
    );
  };

  const handleKeywordSubmit = (e) => {
    e.preventDefault();
    setKeywords([...keywords, value]);
    setValue('');
  };

  useEffect(() => {
    dispatch(getContentData(params.id));
  }, [params.id]);

  useEffect(() => {
    if (state.titleCreation) {
      setOpen1(true);
    }
    // if (state.createdContent) {
    //     setCreatedContentId(state.createdContent.id)
    // }

    if (state.currentContent) {
      console.log(state.currentContent);
      setTitle(state.currentContent.title);
      setsub_title(state.currentContent.sub_title);
      setContent(state.currentContent.detail);
      setstart_date(new Date(state.currentContent.start_date));
      setend_date(new Date(state.currentContent.end_date));
      setStatus(state.currentContent.status);
      settotal_points(state.currentContent.total_points);
      setKeywords(
        JSON.parse(state.currentContent.tags).map((element) => element.text),
      );
      setnext_page(state.currentContent.next_page);
      setprevious_page(state.currentContent.previous_page);
      setContentType(state.currentContent.type);
    }
    console.log(state.currentContent);
  }, [state]);

  const publish = () => {
    let parent = null;
    if (params.contentHeaderId === 'null') {
      parent = params.id;
    } else {
      parent = params.contentHeaderId;
    }

    const tags = keywords.map((element) => {
      return {
        tag_type: 'keyword',
        text: element,
      };
    });
    console.log({
      id: params.id,
      title,
      sub_title,
      detail: content,
      start_date: formatDate(start_date),
      end_date: formatDate(end_date),
      tags,
      type: contentType,
      total_points,
      next_page,
      previous_page,
    });

    dispatch(
      editContent(
        {
          id: params.id,
          title,
          sub_title,
          detail: content,
          start_date: formatDate(start_date),
          end_date: formatDate(end_date),
          tags: JSON.stringify(tags),
          type: contentType,
          total_points,
          next_page,
          previous_page,
        },
        params.id,
      ),
    );
  };
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
    console.log(content);
  }, [content]);
  return (
    <div className='editor-page-full-container'>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity='success'>
          Record updated successfully.
        </Alert>
      </Snackbar>

      <Container>
        <div className='top-section'>
          <div>
            <div>
              <ContentEditable
                className='ce-title'
                html={title}
                disabled={false}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <ContentEditable
                className='ce-sub-title'
                html={sub_title}
                disabled={false}
                onChange={(e) => setsub_title(e.target.value)}
              />
            </div>
          </div>
          <div className='flex-buttons-publish'>
            <Link to={`/admin/content/display/${params.id}`}>
              <button className='flex-button preview'>
                {' '}
                <VisibilityIcon style={{fill: '#ffffff'}} />{' '}
                <span className='button-text'>Preview</span>
              </button>
            </Link>
            <button className='flex-button publish' onClick={publish}>
              <PublishIcon style={{fill: '#ffffff'}} />{' '}
              <span className='button-text'>Publish</span>
            </button>
          </div>
        </div>
        <div className='editor-container'>
          <div className='editor-side'>
            <SunEditor
              setContents={content}
              setOptions={{
                height: 200,
                buttonList: [
                  ['bold', 'italic', 'underline'],
                  ['list'],
                  ['fontColor'],
                  ['fontSize'],
                  ['font', 'align'],
                  ['video', 'image', 'link', 'audio'],
                ], // Or Array of button list, eg. [['font', 'align'], ['image']]
              }}
              onChange={handleEditorChange}
            />
          </div>

          <div className='options-side'>
            <div>
              <Select
                labelId='demo-customized-select-label'
                id='demo-customized-select'
                value={0}
                onChange={(e) => {
                  setCategories([...categories, e.target.value]);
                }}
                variant='filled'
                fullWidth>
                <MenuItem value={0}>
                  {categories.length > 0
                    ? categories.map((element, index) => {
                        return (
                          <Chip
                            label={element}
                            key={index}
                            className='chip-style'
                            onDelete={() => {
                              setCategories(
                                categories.filter((value) => value !== element),
                              );
                            }}
                          />
                        );
                      })
                    : 'Select a category'}
                </MenuItem>
                <MenuItem value={'CFG Session'}>CFG Session</MenuItem>
                <MenuItem value={'Events'}>Events</MenuItem>
                <MenuItem value={'Quiz'}>Quiz</MenuItem>
                <MenuItem value={'Rewards'}>Rewards</MenuItem>
                <MenuItem value={'CFG Tools'}>CFG Tools</MenuItem>
              </Select>
            </div>
            <br />

            <div>
              <TextField
                variant='filled'
                value={appliedGroup}
                onChange={(e) => setAppliedGroup(e.target.value)}
                fullWidth
                label='Apply to Groups'
                required
              />
            </div>

            <br />
            <div>
              {keywords.map((element, index) => {
                return (
                  <Chip
                    label={element}
                    key={index}
                    className='chip-style'
                    onDelete={() => {
                      setKeywords(
                        keywords.filter((value) => value !== element),
                      );
                    }}
                  />
                );
              })}
            </div>
            <div>
              <form onSubmit={handleKeywordSubmit}>
                <TextField
                  variant='filled'
                  value={value}
                  onSubmit={(e) => setKeywords([...keywords, e.target.value])}
                  onChange={(e) => setValue(e.target.value)}
                  fullWidth
                  label='Key words'
                />
              </form>
            </div>

            <br />
            <div className='dates'>
              <KeyboardDatePicker
                disableToolbar
                variant='filled'
                format='MM/DD/yyyy'
                margin='normal'
                fullWidth={true}
                label='Start Date'
                value={start_date}
                onChange={(e) => setstart_date(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant='filled'
                format='MM/DD/yyyy'
                margin='normal'
                label='End Date'
                value={end_date}
                onChange={(e) => setend_date(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </div>
            <br />
            <div>
              <Select
                variant='filled'
                value={status}
                fullWidth
                onChange={(e) => setStatus(e.target.value)}
                required>
                <MenuItem value='draft'>Draft</MenuItem>
                <MenuItem value='saved'>Saved</MenuItem>
                <MenuItem value={'published'}>Published</MenuItem>
              </Select>
            </div>
            <br />
            <div>
              <TextField
                type='number'
                variant='filled'
                value={total_points}
                onChange={(e) => settotal_points(e.target.value)}
                fullWidth
                label='total_points'
                required
              />
            </div>
            <br />
            <div>
              <TextField
                type='text'
                variant='filled'
                value={previous_page}
                onChange={(e) => setprevious_page(e.target.value)}
                fullWidth
                label='previous page'
                required
              />
            </div>
            <br />
            <div>
              <TextField
                type='text'
                variant='filled'
                value={next_page}
                onChange={(e) => setnext_page(e.target.value)}
                fullWidth
                label='next page'
                required
              />
            </div>
            <br />
            <div>
              <div style={{fontSize: '20px', fontWeight: 600}}>
                Featured Image
              </div>
              <div style={{display: 'flex'}}>
                {imageData.map((element, index) => {
                  return (
                    <div key={index} className='image-preview'>
                      <img src={element} alt='image data' />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}