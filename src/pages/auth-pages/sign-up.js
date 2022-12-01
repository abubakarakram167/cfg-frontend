import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {registerAction, setErrorToNull} from '../../redux/actions/authActions';
import {useDispatch} from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux';
import TermsModal from './TermsModal';

export default function SignUp({setView}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [open2, setOpen2] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.auth.error) {
      setOpen2(true);
    }
    if (state.auth.message) {
      setView(4);
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerAction({
        first_name: firstName,
        last_name: lastName,
        email: email,
      }),
    );
  };

  return (
    <div>
      {open2 && (
        <div
          style={{
            color: 'red',
            marginBottom: 10,
            fontWeight: '600',
            fontSize: 14,
          }}>
          <Alert
            severity='error'
            variant='filled'
            onClose={() => setOpen2(null)}>
            {state.auth.error}
          </Alert>
        </div>
      )}

      <form className='forms' onSubmit={handleSubmit}>
        <TextField
          required
          type='text'
          label='First Name'
          fullWidth
          variant='filled'
          style={{marginBottom: '10px'}}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          required
          type='text'
          label='Last Name'
          fullWidth
          variant='filled'
          style={{marginTop: '10px', marginBottom: '10px'}}
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextField
          required
          type='email'
          label='Email'
          fullWidth
          variant='filled'
          style={{marginTop: '10px', marginBottom: '10px'}}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type='submit' className='action-button'>
          Sign Up
        </button>

        <div style={{width: '100%'}}>
          <span style={{color: '#eb1b29'}}>Already have an account? </span>
          <br />
          <span
            style={{color: '#EB1B29', fontWeight: '600', cursor: 'pointer'}}
            onClick={() => setView(1)}>
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
}
