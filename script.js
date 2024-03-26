let head = document.querySelector('.head h2'), square = document.querySelectorAll('.item'), current = 'x', finished = false;
let board = [
        '0', '1', '2',
        '3', '4', '5',
        '6', '7', '8'
    ];

square.forEach(sq => {
    sq.onclick = () => {
        let value = sq.getAttribute('value'), squareContent = sq.childNodes[1];

        if (finished || board[value] == 'x' || board[value] == 'o') {
            return;
        }
        squareContent.innerHTML = board[value] = current;
        squareContent.classList.add('animate__animated', 'animate__bounceIn');

        current = (current == 'x' ? 'o' : 'x');
        head.textContent = `${current.toUpperCase()} turn`;
        checkBoard();
    }
});

function checkBoard()
{
    if ((board[0] == board[1] && board[1] == board[2]) || (board[3] == board[4] && board[4] == board[5]) ||
        (board[6] == board[7] && board[7] == board[8]) || (board[0] == board[3] && board[3] == board[6]) ||
        (board[1] == board[4] && board[4] == board[7]) || (board[2] == board[5] && board[5] == board[8]) ||
        (board[2] == board[4] && board[4] == board[6]) || (board[0] == board[4] && board[4] == board[8])) {

            let winner = (current == 'o' ? 'X' : 'O');
            head.textContent = 'Game Over';
            alertify.alert(`${winner} Won!`, '', function () {});
            return finished = true;
        }
    let draw = true;

    for (el of board) {
        if (el != 'x' && el != 'o'){
            draw = false;
            break;
        }
    }
    if(draw) {
        head.textContent = 'Game Over';
        alertify.alert(`Draw`, '', function() {});
    }
}

document.querySelector('.bottom button').onclick = () => reset();

function reset() {    
    let index = 0
    current = 'x';
    finished = false;
    head.textContent = 'X turn';

    for(item of square) {
        let squareContent = item.childNodes[1];

        squareContent.classList.remove('animate__animated', 'animate__bounceIn');
        squareContent.classList.add('animate__animated', 'animate__bounceOut');
        
        
        squareContent.addEventListener('animationend', anim => {        
            if(anim.animationName == 'bounceOut') {
                squareContent.classList.remove('animate__animated', 'animate__bounceOut');
                squareContent.innerHTML = ''
            }  
        });
        index++
    }
    board = [
        '0', '1', '2',
        '3', '4', '5',
        '6', '7', '8'
    ];
}