
$(document).ready(function () {
    var config = {
        position: 'start',
        draggable: true,
        dropOffBoard: 'snapback',
        sparePieces: true,
        showNotation: true,
        orientation: 'white'
      }
    var board = Chessboard('myBoard', config)
    /*var board = Chessboard('myBoard', {
        draggable: true,
        dropOffBoard: 'snapback',
        sparePieces: true,
        showNotation: true
    })*/

    $('#startBtn').on('click', board.start)
    $('#clearBtn').on('click', board.clear)
    $('#destroyBtn').on('click', board.destroy)
    $('#toggleBtn').on('click', board.flip)
});
