/* eslint-disable no-undef */
describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:5173');
    cy.contains('<h1>','Next player')
  })
})

describe('elements check', () => {
  beforeEach(() => {
    cy.visit('localhost:5173')
  });

  it('elements check', () => {
    cy.get('.game').should('be.visible'),
    cy.get('.restart-btn').should('contain.text', 'Restart Game'),
    cy.get('.status-bar').should('contain.text', 'Next player:'),
    cy.get('.game-board').should('exist'),
    cy.get('.game-board .square').should('have.length', 9)
  });
  it('empty board at the start'),()=> {
    cy.get('square').each(($square)=>{
      expect($square).to.have.text('')
    })
  }
});


describe('Tic Tac Toe Game Simulation with Conditional Move', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should make a move based on the value of the square', () => {
    //move for user for inital action
    const makeMove = (index) => {
      cy.get('.square').eq(index).click();
    };
//check there "o" value is and which next sq is empty and ready for move
    const checkAndMakeMove = (index) => {
      cy.get('.square').eq(index).then(($square) => {
        if ($square.text() === 'O') {
          cy.get('.square').each(($sq, idx) => {
            if ($sq.text() === '') {
              makeMove(idx);
              return false; 
            }
          });
        } else {
          makeMove(index);
        }
      });
    };

// check if there is a winner 
    const checkWinner = (index) => {
      cy.get('.game-info').then(($info) => {
        const text = $info.text();
        if (text.includes('Winner: X')) {
          cy.wrap('Winner: X').should('exist');
        } else if (text.includes('Winner: O')) {
          cy.wrap('Winner: O').should('exist');
        } else {
          cy.wrap('Next player:').should('exist');
          return checkAndMakeMove(index)
        }
      });
    };

    makeMove(0); //x first initial move
    cy.get('.square').eq(0).should('have.text', 'X');
    cy.wait(1000)
    // computer move
    cy.get('.square').contains('O');

    // double check if next action is valid
    checkAndMakeMove(1);
    cy.wait(1000)
    checkAndMakeMove(2);
    cy.wait(1000)
    checkAndMakeMove(3);
    cy.wait(1000)
// cheking game status and going on or stopping 
    checkWinner(4);
    cy.wait(1000)
    checkWinner(5);
    cy.wait(1000)
    checkWinner(6);
    cy.wait(1000)
    checkWinner(7);
    cy.wait(1000)
    checkWinner(8);
  


    // Further moves can be added as needed to continue the test
    // For demonstration, checking the move at index 1 and making a move
    // cy.get('.square').eq(1).then(($square) => {
    //   if ($square.text() === 'X') {
    //     // Validate if X is placed correctly
    //     cy.get('.square').eq(1).should('have.text', 'X');
    //   } else {
    //     // If move was made on a different square, validate the move
    //     cy.get('.square').filter(':empty').should('have.length', 7); // 1 move from each side
    //   }
    // });
    cy.get('.restart-btn').click();
    cy.get('.square').each(($square) => {
      cy.wrap($square).should('have.text', '');
    });
  });
  

});

