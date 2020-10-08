import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import MobileRightDrawer from '@material-ui/core/Drawer';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  menustyle: {
    width: 300,
    background: '#f0f5f8',
    height: '100%'
  },
  avatar: {
    display: 'block',
    margin: '0.5rem auto',
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listIconColor: {
    color: 'tan'
  },
  title: {
    paddingTop: '50px',
    fontWeight: 'bold',
    paddingLeft: '5px'
  }
}));

const Toolbar = () => {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const [state, setState] = useState({
    left: false
  });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  // eslint-disable-next-line no-unused-vars
  const sideDrawer = (slider) => (
    <Box
      className={classes.menustyle}
      component="div"
      // onClick={toggleSlider(slider, false)}
    >
      <Typography variant="h4" className={classes.title}>Job sites</Typography>
      <Divider />
      <List style={{ paddingLeft: '60px' }}>
        <Button variant="contained" color="primary" disableElevation>
          Add a Job site
        </Button>

      </List>
      <Box style={{ paddingLeft: '30px' }}>
        <TextField

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          placeholder="Search job sites"
          variant="outlined"
        />
      </Box>
      <Box style={{ paddingLeft: '30px', paddingTop: '15px' }}>
        <TextField
          select
          label="Sort by"
          value={currency}
          onChange={handleChange}
          helperText="Drop down to select"
          variant="outlined"
        >
          <option>Choose your option</option>
          <option value="1">Last Visit</option>
          <option value="2">Alphabetical</option>
        </TextField>
      </Box>
    </Box>
  );

  return (
    <div>
      <Box
        display="flex"
        justifyContent="flex-end"
      >

        <Button
          color="primary"
          variant="contained"
          onClick={toggleSlider('left', true)}
        >
          Job sites
        </Button>
        <MobileRightDrawer
          anchor="right"
          open={state.left}
          onClose={toggleSlider('left', false)}
        >
          {sideDrawer('left')}
        </MobileRightDrawer>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500} />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Toolbar;
