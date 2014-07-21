(function(App){
  App.board = App.board || [];
  App.player = App.player || 1;

  var generateLayout = function(){
    var xRow = 6,
        yCol = 9,
        board = [],
        iter = null,
        iter2 = null,
        mainEl = App.mainEl,
        $el = document.createDocumentFragment(),
        blocks = document.createElement('table'),
        row = null,
        col = null,
        el = document.createDocumentFragment();

    for(iter = 0; iter < xRow; iter++){
      board[iter] = new Array(yCol);
      row = document.createElement('tr');
      row.className='row';
      for(iter2=0; iter2< yCol; iter2++){
        col = document.createElement('td');
        col.className = 'block';
        col.setAttribute('data-xrow', iter);
        col.setAttribute('data-ycol', iter2);
        col.innerHTML = '<div class="piece empty-piece"></div>';
        row.appendChild(col);
      }
      blocks.appendChild(row);
    }

    App.board = board;

    document.getElementById(mainEl).appendChild(blocks);

  }

  var addEventsToBoard =  function(){
    var blocks = document.getElementsByClassName('block');
    Array.prototype.forEach.call(blocks, function(block){
      block.addEventListener('click',pieceDrop);
    });
  }

  var calculateHorizontal = App.calculateHorizontal = function(xRow, yCol, player){
    var l1 = App.board[xRow][yCol-1],
        l2 = App.board[xRow][yCol-2],
        l3 = App.board[xRow][yCol-3]
        l4 = App.board[xRow][yCol-4],
        r1 = App.board[xRow][yCol+1],
        r2 = App.board[xRow][yCol+2],
        r3 = App.board[xRow][yCol+3],
        r4 = App.board[xRow][yCol+4]
        wins = (l4 === player && l3 === player && l2 === player && l1 === player) || (l3 === player && l2 === player && l1 === player && r1 == player) || (l2 === player && l1 === player && r1 === player && r2 === player) || (l1 === player && r1 === player && r2 === player && r3 === player) || (r1 === player && r2 === player && r3 === player && r4 === player) ;

    if (wins)
      return true;
    else
      return false;
  }


  var calculateVertical = App.calculateVertical = function(xRow, yCol, player){
    var t1 = App.board[xRow-1] ? App.board[xRow-1][yCol] : 0,
        t2 = App.board[xRow-2] ? App.board[xRow-2][yCol] : 0
        t3 = App.board[xRow-3] ? App.board[xRow-3][yCol] : 0,
        t4 = App.board[xRow-4] ? App.board[xRow-4][yCol] : 0,
        b1 = App.board[xRow+1] ? App.board[xRow+1][yCol] : 0,
        b2 = App.board[xRow+2] ? App.board[xRow+2][yCol] : 0,
        b3 = App.board[xRow+3] ? App.board[xRow+3][yCol] : 0,
        b4 = App.board[xRow+4] ? App.board[xRow+4][yCol] : 0,
        wins = (t4 === player && t3 === player && t2 === player && t1 === player) || (t3 === player && t2 === player && t1 === player && b1 === player) || (t2 === player && t1 === player && b1 === player && b2 === player) || (t1 === player && b1 === player && b2 === player && b3 === player) || (b1 === player && b2 === player && b3 === player && b4 === player);

    if (wins)
      return true;
    else
      return false;
  }

  var calculateDiagonal = App.calculateDiagonal = function(xRow, yCol, player){
    var dtl1 = App.board[xRow-1] ? App.board[xRow-1][yCol-1] : 0,
        dtl2 = App.board[xRow-2] ? App.board[xRow-2][yCol-2] : 0,
        dtl3 = App.board[xRow-3] ? App.board[xRow-3][yCol-3] : 0,
        dtl4 = App.board[xRow-4] ? App.board[xRow-4][yCol-4] : 0,
        dbl1 = App.board[xRow+1] ? App.board[xRow+1][yCol-1] : 0,
        dbl2 = App.board[xRow+2] ? App.board[xRow+2][yCol-2] : 0,
        dbl3 = App.board[xRow+3] ? App.board[xRow+3][yCol-3] : 0,
        dbl4 = App.board[xRow+4] ? App.board[xRow+4][yCol-4] : 0,
        dtr1 = App.board[xRow-1] ? App.board[xRow-1][yCol+1] : 0,
        dtr2 = App.board[xRow-2] ? App.board[xRow-2][yCol+2] : 0,
        dtr3 = App.board[xRow-3] ? App.board[xRow-3][yCol+3] : 0,
        dtr4 = App.board[xRow-4] ? App.board[xRow-4][yCol+4] : 0,
        dbr1 = App.board[xRow+1] ? App.board[xRow+1][yCol+1] : 0,
        dbr2 = App.board[xRow+2] ? App.board[xRow+2][yCol+2] : 0,
        dbr3 = App.board[xRow+3] ? App.board[xRow+3][yCol+3] : 0,
        dbr4 = App.board[xRow+4] ? App.board[xRow+4][yCol+4] : 0;

    var win1 = (dtl4 === player && dtl3 === player && dtl2 === player && dtl1 === player) || ( dtl3 === player && dtl2 === player && dtl1 === player && dbr1 === player) || (dtl2 === player && dtl1 === player && dbr1 === player && dbr2 === player) || (dtl1 === player && dbr1 === player && dbr2 === player && dbr3 === player) || (dbr1 === player && dbr2 === player && dbr3 === player && dbr4 === player),
        win2 = (dbl4 && dbl3 === player && dbl2 === player && dbl1 === player) || (dbl3 === player && dbl2 === player && dbl1 === player && dtr1 === player) || (dbl2 === player && dbl1 === player && dtr1 === player && dtr2 === player) || (dbl1 === player && dtr1 === player && dtr2 === player && dtr3 === player) || (dtr1 === player && dtr2 === player && dtr3 === player && dtr4 === player);

    if (win1 || win2)
      return true;
    else
      return false;
  }

  var calculateScore = App.calculateScore = function(xRow, yCol, player){
    var player = App.player,
        winMessage = 'Player '+player+' wins';
    if (calculateHorizontal(xRow, yCol, player)){
      alert(winMessage+' horizontal');
    } else if (calculateVertical(xRow, yCol, player)){
      alert(winMessage+' vertical');
    } else if (calculateDiagonal(xRow, yCol, player)){
      alert(winMessage+' diagonal');
    }
  }

  var dragItDown = function(xRow, yCol){
    var len = App.board.length;
    for (var i = (len-1); i >= 0 ; i--){
      if (!App.board[i][yCol])
        return i;
    }
    return false;
  }

  var showPlayerInTurn = App.showPlayerInTurn = function(player){
    (document.getElementsByClassName('active-title')[0]).className = (document.getElementsByClassName('active-title')[0]).className.replace(/\s+active-title/gi,'');
    document.getElementById('player'+player+'-title').className +=' active-title';
  }

  var pieceDrop =  function(event){
    var el = Array.isArray(event.target.className.match(/block/gi)) ? event.target : event.target.parentElement,
        newEl = null,
        player = App.player,
        pieceColor =  (player === 1) ? 'red-piece' : 'yellow-piece';
        yCol = parseInt(el.getAttribute('data-ycol')),
        xRow = dragItDown(parseInt(el.getAttribute('data-xrow')), yCol);

    if (!(Array.isArray(App.board[xRow]) && (App.board[xRow][yCol] || App.board[xRow][yCol] === undefined))){
      alert('Error!');
      return false;
    }

    App.board[xRow][yCol] = player;
    newEl = document.querySelector('td[data-xrow="'+xRow+'"][data-ycol="'+yCol+'"]');
    newEl.innerHTML+='<div class="piece '+pieceColor +' active-piece"></div>';
    calculateScore(xRow, yCol, player);
    App.player = player = (player === 1 ) ? 2 : 1;
    showPlayerInTurn(player);
    return;
  }


  generateLayout();
  addEventsToBoard();
})(Connect5)