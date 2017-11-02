// packages
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
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
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';

// css styles
import styles from '../assets/styles'

// dispatch actions
import {
  logout,
  refresh,
} from '../actions/index';

class DocsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDocName: '',
      addDocId: '',
      createOpen: false,
      addOpen: false,
    }
  }

  handleOpenAdd() {
    this.setState({addOpen: true});
  };

  handleCloseAdd() {
    this.setState({addOpen: false});
  };

  handleOpenCreate() {
    this.setState({createOpen: true});
  };

  handleCloseCreate() {
    this.setState({createOpen: false});
  };

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
    if (this.state.addDocId === '') return
    try {
      let resp = await axios.get(SERVER_URL + '/document/add/' + this.state.addDocId)
      this.setState({addOpen: false})
      if (resp.data.success) {
        let newUserInfo = await axios.get(SERVER_URL + '/document/list', {
          withCredentials: true,
        })
        this.props.onRefresh(newUserInfo.data.user)
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async onClickCreate() {
    if (this.state.newDocName === '') return
    let editorState = EditorState.createEmpty();
    let contentState = convertToRaw(editorState.getCurrentContent());
    contentState = JSON.stringify(contentState);
    try {
      let resp = await axios.post(SERVER_URL + '/document/new', {
        name: this.state.newDocName,
        contentState,
      })
      this.setState({createOpen: false})
      if (resp.data.success) {
        let newUserInfo = await axios.get(SERVER_URL + '/document/list', {
          withCredentials: true,
        })
        this.props.onRefresh(newUserInfo.data.user)
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  parseTS(ts) {
    let d = new Date(ts);
    let n = d.toString().split(' ');
    let time = n[4].split(':')
    n = n[0] + ', ' + n[1] + ' ' + n[2] + ', ' + n[3]

    if (time[0] > 12) {
      time = (time[0] - 12) + ':' + time[1] + 'pm'
    }
    else time = time[0] + ':' + time[1] + 'am'

    n += ' at ' + time
    return n
  }

  render() {
    return (
      <div>
        <Dialog
          title="Create New Doc"
          actions={[
            <FlatButton
              label="Create"
              onClick={() => this.onClickCreate()}
            />,
            <FlatButton
              label="Close"
              onClick={() => this.handleCloseCreate()}
            />]
          }
          modal={false}
          open={this.state.createOpen}
          onRequestClose={() => this.handleCloseCreate()}
          >
            <TextField
              style={styles.newDocInputText}
              floatingLabelText="New Document Name"
              value={this.state.newDocName}
              onChange={(e) => this.setState({newDocName: e.target.value})}
            />
        </Dialog>
        <Dialog
          title="Add Doc By ID"
          actions={[
            <FlatButton
              label="Add"
              onClick={() => this.onClickAdd()}
            />,
            <FlatButton
              label="Close"
              onClick={() => this.handleCloseAdd()}
            />]
          }
          modal={false}
          open={this.state.addOpen}
          onRequestClose={() => this.handleCloseAdd()}
          >
          <TextField
            style={styles.newDocInputText}
            floatingLabelText="Existing Document ID"
            value={this.state.addDocId}
            onChange={(e) => this.setState({addDocId: e.target.value})}
          />
        </Dialog>
        <Paper
          zDepth={2}
          style={styles.docsListBody}
          >
          <div
            style={styles.docsListHeader}>
            Welcome to your docs, {this.props.userInfo.user.username}
          </div>
          <br />
          <br />
          <div
            style={styles.newDocInputBtnContainer}
            >
            <RaisedButton
              style={styles.newDocInputBtn}
              primary={true}
              onClick={() => this.handleOpenCreate()}
              label={'Create New Doc'}
            />
            <div style={styles.newDocInputSpacer}></div>
            <RaisedButton
              style={styles.newDocInputBtn}
              primary={true}
              onClick={() => this.handleOpenAdd()}
              label={'Add Existing Doc'}
            />
          </div>
          <br />
          <List
            style={styles.docsListContainer}
            >
            <Subheader>Files</Subheader>
            <Divider/>

            {this.props.userInfo.user.docsList.map(doc =>
                <div
                  key={doc._id}
                  >
                  <Link
                    style={{textDecoration: 'none'}}
                    to={'/document/' + doc._id}>
                    <ListItem
                      style={styles.listItem}
                      leftAvatar={
                        <Avatar
                          icon={<ActionAssignment />}
                          backgroundColor={blue500}
                        />
                      }
                      primaryText={doc.name}
                      secondaryText={this.parseTS(doc.ts)}
                    />
                  </Link>
                  <Divider />
                </div>
              )
            }
          </List>
          <br />
          <br />
          <div style={styles.logoutContainer}>
            <div style={styles.logoutSpacer}></div>
            <RaisedButton
              style={styles.logoutBtn}
              primary={true}
              onClick={() => this.onClickLogout()}
              label={'Logout'}
            />
          </div>
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
    onRefresh: (user) => dispatch(refresh(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocsList);
