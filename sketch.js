class Grid {
  constructor(row, col) {
    this.cols = col;
    this.rows = row;
    this.start = false;
    this.cell_size = 30;
    this.cells = this.createboard();
  }

  // Initilize the board with 0
  createboard() {
    let cells = new Array(this.rows);
    for (let row = 0; row < this.rows; row++) {
      cells[row] = new Array(this.cols).fill(0);
    }
    return cells;
  }

  // Draw the game board
  drawgameboard() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.cells[y][x] == 1) {
          if (x < 5) {
            fill(255, 255, 255);//white
          } else if (x < 10 && x >= 5) {
            fill(255, 0, 0);//red
          } else if (x < 15 && x >= 10) {
            fill(255, 128, 0);//orange         	       
          } else if (x < 20 && x >= 15) {
            fill(255, 255, 0);//yellow
          } else if (x < 25 && x >= 20) {
            fill(0, 255, 0);//green
          } else if (x < 30 && x >= 25) {
            fill(0, 0, 255);//blue
          } else if (x < 35 && x >= 30) {
            fill(128, 0, 128);//purple 	
          } else {
            fill(0, 0, 0);//black
          }

        } else {
          if (this.start) {
            fill(0);
            stroke(25);

          } else {
            fill(200);
            stroke(75);
          }
        }
        rect(x * this.cell_size, y * this.cell_size, this.cell_size, this.cell_size);
      }
    }
  }

  // Count the number of neighbors next to given cell location
  countneighbors(row, col) {
    let count = 0;
    let backrow = row - 1;
    let frontrow = row + 1;
    let backcol = col - 1;
    let frontcol = col + 1;
    let col_ = 0;
    let row_ = 0;
    for (let r = backrow; r <= frontrow; r++) {
      if (r < 0) {
        row_ = this.rows - 1;
      } else if (r > this.rows - 1) {
        row_ = 0;
      } else {
        row_ = r;
      }
      for (let c = backcol; c <= frontcol; c++) {
        if (c < 0) {
          col_ = this.cols - 1;
        } else if (c > this.cols - 1) {
          col_ = 0;
        } else {
          col_ = c;
        }
        if (((col_ != col) || (row_ != row)) && (this.cells[row_][col_] == 1)) {
          count += 1;

        }
      }
    }
    return count
  };

  // Calculate the next generation of cells
  nextgen() {
    let nextboard = this.createboard();

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let output = 0;
        if (this.cells[row][col] == 0) {
          if (this.countneighbors(row, col) == 3) {
            output = 1;
          }
        }
        else {
          if (this.countneighbors(row, col) == 2 || this.countneighbors(row, col) == 3) {
            output = 1;
          }
        }
        nextboard[row][col] = output;
      }
    }

    this.cells = nextboard;
  };

  // Handles the mouse input
  handleMouse() {
    if (!this.start) {
      let x = floor(mouseX / this.cell_size);
      let y = floor(mouseY / this.cell_size);

      if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) {
        return;
      }
      this.cells[y][x] = 1;

    }
  }


}


let gameboard;

function mouseDragged() {
  gameboard.handleMouse();
}

function mouseClicked() {
  gameboard.handleMouse();
}


// Handle keyboard imputs
let fps = 10; // sets default frame rate of the game
function keyPressed() {
  //Start the game
  if (keyCode == 32) { // space key
    if (gameboard.start) {
      gameboard.start = false;
    } else {
      gameboard.start = true;

    }
  }
  //Clear the board
  if (keyCode == 67) { // 'C' key
    gameboard.cells = gameboard.createboard();
  }

  // Increase the speed
  if (keyCode == 38) {
    if (fps >= 145) {

    } else {
      fps += 5;
      frameRate(fps);

    }
  }
  // Decrease the speed
  if (keyCode == 40) { // 'Down Arrow' key
    if (fps <= 5) {

    } else {
      fps -= 5;
      frameRate(fps);

    }
  }
}

function setup() {
  createCanvas(1300, 420);
  gameboard = new Grid(30, 25);
  frameRate(fps);

}

function draw() {
  background(255);
  gameboard.drawgameboard();
  if (gameboard.start) {
    gameboard.nextgen();
  }
  fill(0);
  noStroke();
  textSize(20);
  text("Press 'Space' to start the game", 820, 20);
  text("Press 'C' to clear the board", 820, 50);
  text("Press 'Up Arrow' to increase the speed", 820, 80);
  text("Press 'Down Arrow' to decrease the speed", 820, 110);
  text("Current speed: " + fps, 820, 140);
  text("Click and drag to add cells", 820, 170);


}
