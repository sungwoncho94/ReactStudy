import * as React from 'react';
import Profile from './components/Profile';
import Counter from './components/Counter';

class App extends React.Component {
  render() {
    return (
      // render 안에는 하나의 <div>만 있어야 한다
      <div>
        <Profile
          name= "조뮁"
          job= "SSAFY"
        />
        <Counter />
      </div>
    );
  }
}

export default App;