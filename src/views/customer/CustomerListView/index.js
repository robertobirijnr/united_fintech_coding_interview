import React from 'react';
import {

  Container,
  makeStyles
} from '@material-ui/core';
import Map from 'src/components/Map';
import Page from 'src/components/Page';
// import { GoogleApiWrapper } from 'google-maps-react';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    // minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const CustomerListView = (props) => {
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { google, mapStyle } = props;

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />

        <Map
            // eslint-disable-next-line react/destructuring-assignment
          google={google}
          center={{ lat: 18.5204, lng: 73.8567 }}
          // eslint-disable-next-line react/destructuring-assignment
          styles={mapStyle}
          zoom={15}
        />
      </Container>
    </Page>
  );
};

export default CustomerListView;
