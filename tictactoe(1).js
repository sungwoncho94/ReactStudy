function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }
  // Square는 render()함수로만 이뤄져있음 -> 함수형 컴포넌트로 바꿔주기
  
  // class Square extends React.Component {
  // //   Square가 state를 가질 수 있도록 해주기  (1) constructor를 만들어 처음 생성될 때 값을 초기화해준다
  // //   Board로부터 Square의 state를 받아올 것 -> square의 state를 정의하는 constructor를 삭제
  // //   constructor(props) {
  // //     super(props);
  // // //     square는 state라는 값을 가지고 있다.
  // //     this.state = {
  // //       value: null,
  // //     };
  // //   }
    
  //   render() {
  //     return (
  // //       props로 받은 정보를 표시  &  onClick 설정 -> click될 때 마다 state를 값='X'로 변경
  // //       props에서 받은 정보 -> 현재 square의 state정보를 표시
  // //       onClick이 되면 -> props에서 onClick정보를 꺼낸 후, handleClick을 실행
  // //       props로 정보가 온다 -> props에서 정보를 꺼낸다
  //       <button className="square" onClick={() => this.props.onClick()}>
  //         {this.props.value}
  //       </button>
  //     );
  //   }
  // }
  
  class Board extends React.Component {
  //   props를 통해 data전달하기 (Board Comp -> square comp로 i의 값 넘기기)
  //   각 사각형의 value(숫자)를 정해놓고 renderSquare()를 통해 square에 값을 전해줬다 -> 이와 동일하게 Board에서 square의 state를 관리하고 넘겨줄 것.
  //   상위컴포넌트 안에 하위 컴포넌트를 포함시키면 상위->하위로 정보를 전달할 수 있다.
    
  // Game에서 state를 받아올 것이기 때문에 Board의 constructor는 필요 없다
  //   constructor(props) {
  //     super(props);
  // //     9개의 사각형과 일치하는 배열을 만들어서 null값을 채워 초기화한다
  //     this.state = {
  //       squares: Array(9).fill(null),
  // //       'X'를 시작플레이어로 설정 (False일 때 'O'가 플레이 되도록)
  //       xIsNext: true,
  //     };
  //   }
    
  //  handleClick 함수 정의
  //  기존의 배열을 변경하지 않고 복사 (slice사용)  (새로운 squares을 만든 후, X를 채워넣어서 squares에 새로운 squares를 전달한다 (?))
  // Board -> Game 으로 handleClick을 옮겨준다
    
  //   value에 i를 전하는 것이 아니라, board에서 정의한 state가 square에 전달되도록 한다
  //   board를 클릭할 때 마다 onClick -> handleClick이 실행되도록 하여 square에 value, onClick 두 개의 props를 전달한다
    renderSquare(i) {
      return (
        <Square 
               value={this.props.squares[i]} 
               onClick={() => this.props.onClick(i)} />
        );
    }
  
    render() {
      
  //     승자가 결정되면 승자 출력 / 아니면 다음 플레이어 출력
  //     Game에서 상태를 계산할 것이기 때문에 Board에서는 삭제
      // const winner = whoIsWinner(this.state.squares);
      // let status;
      // if (winner) {
      //   status = 'Winner is ' + winner + '!';
      // } else {
      //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // }
  
      return (
        <div>
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
  //   Board의 state를 Game으로 들어올려 최상위 레벨Game에서 모든 정보를 저장하도록 설정
  //   game의 초기 상태 설정
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
      };
    }
    
    handleClick(i) {
  //     내가 되돌리고 싶은 곳 까지만 sice한다
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (whoIsWinner(squares) || squares[i]) {
        return;
      }
  //  삼항연산자 사용해서 X와 O가 번갈아서 state에 등록될 수 있도록 설정
      squares[i] = this.state.xIsNext ? 'X' : 'O';
  //     history에 새로운 현재 history를 추가(concat)한다.
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
  //      현재가 'O'일 때만 xIsNext 값을 보낸다.
        xIsNext: !this.state.xIsNext,
  //       새로운 이동이 있을 때마다 stepNumber를 업데이트한다
        stepNumber: history.length,
      });
    }
    
    jumpTo(step) {
      this.setState({
        stepNumber: step,
  //       xIsNext가 짝수라면 true
        xIsNext: (step % 2) === 0,
      });
    }
    
    render() {
      const history = this.state.history;
  //  const current = history[history.length - 1] 과의 차이점은 뭘까??
  //  이전코드 : button을 클릭했을 때의 상태로 돌아가지 않는다.
  //  이전 : 되돌아가면 되돌아간 상태가 current가 된다 / 현재는 되돌아가도 몇단계인지 유지
      const current = history[this.state.stepNumber];
      const winner = whoIsWinner(current.squares);
      
  //     이동 표시하기
  //     React에서 여러 요소를 표시하기 위해 React 요소의 배열을 전달함. 배열을 build하는 방법으로, 데이터 배열에서 map을 이용할 것
      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
  //         key를 정의해줘야함 (index로 사용하는 것은 비추천)
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      
      let status;
      if (winner) {
        status = 'Winner is ' + winner + '!';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      
      return (
        <div className="game">
          <div className="game-board">
            <Board squares = {current.squares} onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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
  
  // 승자 알려주기
  function whoIsWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }