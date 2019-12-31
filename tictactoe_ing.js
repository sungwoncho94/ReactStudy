// Square 컴포넌트를 board안에 넣어서 board에서 관리되게 해야함
class Square extends React.Component {
    //   Square 각각의 상태(state)를 가질 것
    //   먼저 state를 초기화해준다
    // Square가 state를 가지지 않고, onClick때마다 board에서 정의된 state를 가지고 올것
      // constructor(props) {
      //   super(props);
      //   this.state = {
      //     value: null,
      //   };
      // }
      
      render() {
        return (
    //       this.state.value -> 초기state 값 : null
    //       클릭 시 state를 'X'로 바꾼다
    //       setState : 상태가 바뀔때마다 호출됨
          <button className="square" onClick={() => this.props.onClick()}>
            {this.props.value}
          </button>
        );
      }
    }
    
    class Board extends React.Component {
    //   9개의 Square(하위컴포넌트)로부터 데이터를 모으거라 두 개의 하위 컴포넌트들이 서로 통신하길 원할 때, 상위 컴포넌트 안으로 satte를 이동시키기
      constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
        };
      }
    //   value prop을 전달하도록 수정
      renderSquare(i) {
        return (
    //       board -> square로 value, onClick 두 개의 props를 전달
          <Square 
            value={this.state.squares[i]} 
            onClick = {() => this.handleClick(i)}
            />
        );
      }
    
      render() {
        const status = 'Next player: X';
    
        return (
          <div>
            <div className="status">{status}</div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
      }
    }
    
    class Game extends React.Component {
      render() {
        return (
          <div className="game">
            <div className="game-board">
              <Board />
            </div>
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
        );
      }
    }
    
    // ========================================
    
    ReactDOM.render(
      <Game />,
      document.getElementById('root')
    );
    