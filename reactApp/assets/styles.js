const styles = {
  editor: {
    fontFamily: '\'Helvetica\', sans-serif',
    cursor: 'text',
    minHeight: 200,
    padding: 20,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 400,
    padding: 50,
    margin: 50,
  },
  docsListContainer: {
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
    margin: 50,
    backgroundColor: '#eeeeee',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  draftButtonContainer: {
    display: 'flex',
  },
  draftButton: {
    flex: 2,
  },
  draftSpacer: {
    flex: 1,
  },
  toolbar: {
    border: '1px solid black',
    // display: 'flex',
  },
  toolbarButton: {
    margin: 2,
    // flex: 1,
    width: '5%',
    // height: '25px',
  },
};

export default styles;
