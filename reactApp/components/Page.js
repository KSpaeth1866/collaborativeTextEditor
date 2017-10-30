import React from 'react';
import { BrowserRouter, Route, Switch, Link, } from 'react-router-dom';

// imported components
import Draft from './Draft';
import Test1 from './Test1';
import Test2 from './Test2';

// class component
class Page extends React.Component {
  render() {
    return (
      <div className={'container'}>
        <Draft />
      </div>
    );
  }
  // render() {
  //   return (
  //     <BrowserRouter>
  //       <div>
  //
  //         <Route path={'/:anything'} render={ () => <Link to={'/'}>Back to Home</Link> }/>
  //         <Route path={'/:anything'} render={ () => <Link to={'/test1'}>Test1</Link> }/>
  //         <Route path={'/:anything'} render={ () => <Link to={'/test2'}>Test2</Link> }/>
  //
  //         <Switch>
  //           <Route path={'/'} exact={true} component={Draft}/>
  //           <Route path={'/test1'} component={Test1}/>
  //           <Route path={'/test2'} component={Test2}/>
  //           <Route render={() => <h1>404</h1>} />
  //         </Switch>
  //
  //       </div>
  //     </BrowserRouter>
  //   );
  // }
};

export default Page;
