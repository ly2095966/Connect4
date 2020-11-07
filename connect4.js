document.addEventListener("DOMContentLoaded",() =>{
    var gameBoard;
    let redTurn = true;
    let plays = 0;
    let firstPlay = true;
    let gameWin = false;

    document.getElementById('col1').addEventListener("click", function(){addCol(0);});
    document.getElementById('col2').addEventListener("click", function(){addCol(1);});
    document.getElementById('col3').addEventListener("click", function(){addCol(2);});
    document.getElementById('col4').addEventListener("click", function(){addCol(3);});
    document.getElementById('col5').addEventListener("click", function(){addCol(4);});
    document.getElementById('col6').addEventListener("click", function(){addCol(5);});
    document.getElementById('col7').addEventListener("click", function(){addCol(6);});
    document.getElementById('reButton').addEventListener("click", function(){reset();});

    if(firstPlay)
    {
        document.getElementById('playerTurns').innerHTML = "Press start to begin!";
    }


    function addCol(numCol)
    {
        console.log(numCol);
        if(plays >= 42)
        {
            document.getElementById('playerTurns').innerHTML = "Max turns reached, please restart!";
        }
        else if(!gameWin)    //Ensure that players do not take turns after winning
        {
            let foundRow = false;
            let searchRow = 0;
            for(x = 5; x >= 0; x--)  //Find the next blank point in the selected column
            {
                if(gameBoard[x][numCol] == 0 && !foundRow)
                {
                   searchRow = x;
                   console.log(searchRow);
                   foundRow = true;
                }
            }

            if(foundRow)
            {
                if(redTurn)
                 {
                     gameBoard[searchRow][numCol] = 1    //Enter into an array
                     document.getElementById('spot'+searchRow+numCol).className = "red";
                     if(checkWin(1))    //Check all possible winning combinations before allowing the next round
                     {
                         gameWin = true;
                         document.getElementById('playerTurns').innerHTML = "Player1 Wins!";
                     }
                     else
                     {
                         document.getElementById('playerTurns').innerHTML = "Player2's Turn";
                     }
                 }
                 else
                 {
                     gameBoard[searchRow][numCol] = 2;    //Input into array
                     document.getElementById('spot'+searchRow+numCol).className = "blue";
                     if(checkWin(2))    //Check all possible winning combinations before allowing the next round
                     {
                         gameWin = true;
                         document.getElementById('playerTurns').innerHTML = "Player2 Wins!";
                     }
                     else
                     {
                         document.getElementById('playerTurns').innerHTML = "Player1's Turn";
                     }
                 }
                 plays++;    //Increase the number of playbacks to not exceed the maximum
                 console.log(plays);
                 redTurn = !redTurn;    //Swap turnover Boolean value
            }
        }
    }

    function reset()    
    {
        gameWin = false;
        firstPlay = false;
        gameBoard = [];
        for(x = 0; x <= 5; x++)
        {
           for(y = 0; y <= 6; y++)
               document.getElementById('spot' + x + y).className = "spot";    
           gameBoard.push([0,0,0,0,0,0,0]);    
        }
        redTurn = true;
        plays = 0;
        document.getElementById('playerTurns').innerHTML = "Player1's Turn";
    }

    function checkWin(player) 
    {
        for(x = 0; x < 7; x++)
        {
           for(y = 0; y < 3; y++)
           {
               if(gameBoard[y][x] == player && gameBoard[y + 1][x] == player && gameBoard[y + 2][x] == player && gameBoard[y + 3][x] == player)
                   return true;
           }
        }

        for(y = 0; y < 6; y++)
        {
           for(x = 0; x < 4; x++)
           {
               if(gameBoard[y][x] == player && gameBoard[y][x + 1] == player && gameBoard[y][x + 2] == player && gameBoard[y][x + 3] == player)
                   return true;
           }
        }

        for(x = 0; x < 4; x++)
        {
           for(y = 3; y < 6; y++)
           {
               if(gameBoard[y][x] == player && gameBoard[y - 1][x + 1] == player && gameBoard[y - 2][x + 2] == player && gameBoard[y - 3][x + 3] == player)
                   return true;
           }
        }

        for(x = 3; x < 7; x++)
        {
           for(y = 3; y < 6; y++)
           {
               if(gameBoard[y][x] == player && gameBoard[y - 1][x - 1] == player && gameBoard[y - 2][x - 2] == player && gameBoard[y - 3][x - 3] == player)
                   return true;
           }
        }
    }
});