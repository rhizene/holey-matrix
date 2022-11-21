import logo from './logo.svg';
import './App.css';
import React from 'react';
import Tip from './Tip';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      matrixString:  '',
      matrix: [],
    };
  }

  getLineHoles(line) {
    const holeFilter = '00';
    const hole = '0';
    const lineHoles = [];
    let lineHole = [];
    for(let i=0; i<line.length;i++) {
      const current = line[i];
      const previous = line[i-1]+current;
      const next = current + line[i+1];
      
      if(previous === holeFilter || next === holeFilter) {
        lineHole.push(i);
      }
      
      if(lineHole.length > 0 &&
        (current !== hole || i+1 === line.length)
        ){
        lineHoles.push(lineHole);
        lineHole = [];
      }
    }
    
    return lineHoles;
  }

  getVerticalHoles(columnIndex) {
    const matrix = this.state.matrix;
    let verticalLine = '';
    for(let i = 0; i < matrix.length; i++) {
      verticalLine += matrix[i][columnIndex];
    }

    const verticalHoles = this.getLineHoles(verticalLine);
    return verticalHoles;
  }

  isMatrixValid(matrix) {
    const uniqueLineLengths = new Set(
      matrix.map(item => item.length)
    );
    return uniqueLineLengths.size === 1;
  }

  updateMatrixString(matrixString) {
    const SEPARATOR = ', ';
    const matrix = matrixString.split(SEPARATOR);
    if(this.isMatrixValid(matrix)) {
      this.setState({matrix, matrixString});
    } else {
      this.setState({matrixString});
    }
  }



  render() {
    const matrix = [...this.state.matrix];
    let horizontalHoles = [];
    let verticalHoles = [];

    for(const element of matrix) {
      const line= element;
      const horizontals = this.getLineHoles(line);
      if(horizontals.length > 0) {
        horizontalHoles = horizontalHoles.concat(horizontals)
      };
      
    }
    
    const firstLine = matrix[0];
    if(firstLine != null) {
      for(let columnIndex = 0; columnIndex < firstLine.length; columnIndex++) {
        const verticals = this.getVerticalHoles(columnIndex);
      
        if(verticals.length > 0) {
          verticalHoles = verticalHoles.concat(verticals);
        }
      }
    }
    
    
    const holeCount = horizontalHoles.length + verticalHoles.length;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span
            className="App-link"
          >
            Enter the Matrix:
          </span>
  
          
          <input type='text' id='matrixInput' placeholder='111, 000, 011' value={this.state.matrixString} onChange={(e)=> this.updateMatrixString(e.target.value)} />
          <br/>
  
          <span>
            matrix: <Tip text='A matrix is a collection of 1s and 0s of the same length separated by a comma' />
          </span>
          <br/>
          <pre className='matrix tip'><code>{matrix.join("\n")}</code></pre>
          <br/>
          <span>
            Holes: <Tip text='The number of consecutive 0s horizontally / vertically ' />
          </span>
          
          {holeCount}
        </header>
      </div>
    );
  }
}

export default App;
