const styles = {
  editor: {
    fontFamily: '\'Helvetica\', sans-serif',
    cursor: 'text',
    // minHeight: 400,
    padding: 20,
    alignSelf: 'stretch',
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10,
    margin: 15,
    fontFamily: '\'Helvetica\', sans-serif',
  },
  draftHeader: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  authHeader: {
    fontSize: 30,
    fontFamily: '\'Helvetica\', sans-serif',
  },
  authSubHeader: {
    fontSize: 15,
    fontFamily: '\'Helvetica\', sans-serif',
  },
  docsListHeader: {
    fontSize: 25,
    fontFamily: '\'Helvetica\', sans-serif',
  },
  controlContainer: {
    padding: 10,
    margin: 15,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  authContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 400,
    padding: 50,
    margin: 50,
  },
  docsListContainer: {
    paddingTop: 20,
  },
  listItem: {
    textDecoration: 'none',
  },
  newDocInput: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  newDocInputBtnContainer: {
    display: 'flex',
  },
  newDocInputBtn: {
    flex: 5,
  },
  newDocInputSpacer: {
    flex: 2,
  },
  newDocInputText: {
    // flex: 3,
  },
  logoutContainer: {
    display: 'flex',
  },
  logoutBtn: {
    flex: 1,
  },
  logoutSpacer: {
    flex: 3,
  },
  docsListBody: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: 500,
    alignItems: 'stretch',
    padding: 50,
    margin: 50,
  },
  draftBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    marginLeft: 150,
    marginRight: 150,
    marginTop: 20,
    backgroundColor: '#eeeeee',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#eeeeee',
    height: '100vh',
  },
  draftButtonContainer: {
    display: 'flex',
  },
  toolbarButton: {
    margin: 1,
    // flex: 1,
    width: 36,
    // height: '28px',
    display: 'inline',
  },
  buttonIcon: {
    fontSize: '20px',
  },
};

export default styles;
