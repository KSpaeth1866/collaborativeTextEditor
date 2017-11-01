// packages
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import {
  List,
  ListItem
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import {blue500, yellow600} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField'

// css styles
import styles from '../assets/styles'

// dispatch actions
import {
  logout,
} from '../actions/index';

class DocsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDocName: '',
      addDocId: '',
    }
  }

  async onClickLogout() {
    try {
      let logout = await axios.get(SERVER_URL + '/logout')
      this.props.onLogout();
    }
    catch(e) {
      console.log(e);
    }
  }

  async onClickAdd() {
    console.log('add');
  }

  async onClickCreate() {
    console.log('create');
  }

  render() {
    return (
      <div>
        <Paper
          zDepth={2}
          style={styles.docsListBody}
          >
          <div
            style={styles.docsListHeader}>
            Welcome to your docs, {this.props.userInfo.user.username}
          </div>
          <br />
          <Divider inset={true}/>
          <List
            style={styles.docsListContainer}
            >
            <Subheader>Files</Subheader>
            <Divider/>

            <ListItem
              style={styles.listItem}
              leftAvatar={
                <Avatar
                  icon={<ActionAssignment />}
                  backgroundColor={blue500}
                />
              }
              // rightIcon={<ActionInfo />}
              primaryText="Vacation itinerary"
              secondaryText="Jan 20, 2014"
            />
            <Divider/>

            <ListItem
              style={styles.listItem}
              leftAvatar={
                <Avatar
                  icon={<ActionAssignment />}
                  backgroundColor={blue500}
                />
              }
              // rightIcon={<ActionInfo />}
              primaryText="Vacation itinerary"
              secondaryText="Jan 20, 2014"
            />
            <Divider/>

            <ListItem
              style={styles.listItem}
              leftAvatar={
                <Avatar
                  icon={<ActionAssignment />}
                  backgroundColor={blue500}
                />
              }
              // rightIcon={<ActionInfo />}
              primaryText="Vacation itinerary"
              secondaryText="Jan 20, 2014"
            />
            <Divider/>

          </List>
          <br />
          <br />
          <div
            style={styles.newDocInput}
            >
            <TextField
              floatingLabelText="New Document"
              hintText="name"
              onChange={(e) => this.setState({newDocName: e.target.value})}
            />
            <RaisedButton
              style={styles.newDocInputBtn}
              primary={true}
              onClick={() => this.onClickCreate()}
              label={'Create Document'}
            />
          </div>
          <div
            style={styles.newDocInput}
            >
            <TextField
              floatingLabelText="Add By ID"
              hintText="document ID"
              onChange={(e) => this.setState({addDocId: e.target.value})}
            />
            <RaisedButton
              style={styles.newDocInputBtn}
              primary={true}
              onClick={() => this.onClickAdd()}
              label={'Add Document'}
            />
          </div>
          <br />
          <br />
          <RaisedButton
            // style={styles.styleButton}
            primary={true}
            onClick={() => this.onClickLogout()}
            label={'Logout'}
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocsList);
