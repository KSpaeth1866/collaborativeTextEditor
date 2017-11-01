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
    let editorState = EditorState.createEmpty();
    console.log('create: createEmpty: ', editorState);
    let contentState = convertToRaw(editorState.getCurrentContent());
    console.log('create: convertToRaw: ', contentState);
    contentState = JSON.stringify(contentState);
    console.log('create: stringify: ', contentState);
    try {
      let resp = axios.post(SERVER_URL + '/document/new', {
        name: this.state.newDocName,
        contentState,
      })
      console.log(resp);
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
    console.log(this.props.userInfo);
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
          <div
            style={styles.newDocInput}
            >
            <TextField
              style={styles.newDocInputText}
              floatingLabelText="New Document"
              hintText="name"
              onChange={(e) => this.setState({newDocName: e.target.value})}
            />
            <RaisedButton
              style={styles.newDocInputBtn}
              primary={true}
              onClick={() => this.onClickCreate()}
              label={'Create'}
            />
          </div>
          <div
            style={styles.newDocInput}
            >
            <TextField
              style={styles.newDocInputText}
              floatingLabelText="Add By ID"
              hintText="document ID"
              onChange={(e) => this.setState({addDocId: e.target.value})}
            />
            <RaisedButton
              style={styles.newDocInputBtn}
              primary={true}
              onClick={() => this.onClickAdd()}
              label={'Add'}
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
          <RaisedButton
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
