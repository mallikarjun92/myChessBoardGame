$(document).ready(function () {
    board = null
    game = new Chess()
    algo = undefined;
    var whiteSquareGrey = '#a9a9a9'
    var blackSquareGrey = '#696969'

    //game visualization & handling
    //highlight legal moves only
    function removeGreySquares() {
        $('#myBoard .square-55d63').css('background', '')
    }

    function greySquare(square) {
        var $square = $('#myBoard .square-' + square)

        var background = whiteSquareGrey
        if ($square.hasClass('black-3c85d')) {
            background = blackSquareGrey
        }

        $square.css('background', background)
    }

    function onMouseoverSquare(square, piece) {
        // get list of possible moves for this square
        var moves = game.moves({
            square: square,
            verbose: true,
        })

        // exit if there are no moves available for this square
        if (moves.length === 0) {
            return
        }

        // highlight the square they moused over
        greySquare(square)

        // highlight the possible squares for this piece
        for (var i = 0; i < moves.length; i++) {
            greySquare(moves[i].to)
        }
    }

    function onMouseoutSquare(square, piece) {
        removeGreySquares()
    }


    function onDragStart(source, piece, position, orientation) {
        /*/ do not pick up pieces if the game is over
        if (game.game_over() === true || piece.search(/^b/)) {
             alert('game over');
               return false
         }*/

        /* board visualization and games state handling */


        if (game.in_checkmate() === true || game.in_draw() === true ||
            piece.search(/^b/) !== -1) {
            alert("game is over!");
            return false;
        }

        // only pick up pieces for White
        if (piece.search(/^b/) !== -1) return false
    }



    /*    //make random moves
        function makeRandomMove() {
            var possibleMoves = game.moves()
    
            // game over
            if (possibleMoves.length === 0) return
    
            var randomIdx = Math.floor(Math.random() * possibleMoves.length)
            game.move(possibleMoves[randomIdx])
            board.position(game.fen())
    
        }
    
        
        function onDrop(source, target) {
            removeGreySquares()
            // see if the move is legal
            var move = game.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
            })
    
            // illegal move
            if (move === null) return 'snapback'
            //updateStatus()
    
            // make random legal move for black
            window.setTimeout(makeRandomMove, 250)
        }
    */

    // Handles what to do after human makes move.
    // Computer automatically makes next move
    var onDrop = function (source, target) {

        removeGreySquares();
        // see if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // If illegal move, snapback
        if (move === null) return 'snapback';

        // Log the move
        console.log(move)


        // make move for black
        window.setTimeout(function () {
            //alert('window.setTimout Success');
            makeMove(algo, 3);
        }, 250);
    };


    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    function onSnapEnd() {
        board.position(game.fen())
    }

    function onMoveEnd(oldPos, newPos) {
        console.log('Move animation complete:')
        console.log('Old position: ' + Chessboard.objToFen(oldPos));
        console.log('New position: ' + Chessboard.objToFen(newPos));
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        console.log(game.board());
        //mat=game.board();
        //console.log(mat);
        //$('#status').html('Old position: ' + Chessboard.objToFen(oldPos)+'<br>'+"WHITE' TURN" );
        //$('#fen').html(Chessboard.objToFen(newPos));
        if (game.game_over()) {
            //alert('end')
            //$('#status').html('Old position: ' + Chessboard.objToFen(oldPos) + '<br>GAME OVER');
            console.log('Game Over');
        }

    }

    //configure board
    var config = {
        position: '',
        draggable: true,
        dropOffBoard: 'snapback',
        sparePieces: true,
        showNotation: true,
        orientation: 'white',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMoveEnd: onMoveEnd,
        onMouseoutSquare: '',
        onMouseoverSquare: '',
        onSnapEnd: onSnapEnd

    }
    board = Chessboard('myBoard', config),
        //strat btn function
        $('#startBtn').click(function () {
            $('#diffLevel').show();
            $('#startBtn').hide();
            $('#clearBtn').show();
            board.start(),
                board.position(game.reset()),
                config.onMouseoutSquare = onMouseoutSquare,
                config.onMouseoverSquare = onMouseoverSquare
        });

    $('#clearBtn').click(function () {
        board.clear(),
        $('#startBtn').show();
        $('#diffLevel').hide();
        $('#clearBtn').hide();
        board.position(game.reset()),
            config.onMouseoutSquare = '',
            config.onMouseoverSquare = ''
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        $('#status').html('<br>GAME RESET');

    });
    //$('#toggleBtn').on('click', board.flip);


    //selecting difficulty level

    $('#easy').click(function () {
        algo = 1;
        $('#diffLevel').hide();
        $('#clearBtn').show();
    });

    $('#medium').click(function () {
        algo = 2;
        $('#diffLevel').hide();
        $('#clearBtn').show();
    });

    $('#hard').click(function () {
        algo = 3;
        $('#diffLevel').hide();
        $('#clearBtn').show();
    });


}); //do not erase end of document ready func
