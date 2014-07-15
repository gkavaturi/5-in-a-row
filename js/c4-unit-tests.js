(function(App){

  QUnit.test('All blocks in place', function(assert) {
    var rows = App.board.length,
        expectedRows = 6, 
        expectedCols = 7;
    assert.ok(rows === expectedRows, 'all rows check');
    for (var i = 0; i < rows; i++){
      assert.ok(App.board[i].length === expectedCols, i+' row has '+expectedCols+' columns');
    }
  });

  QUnit.test('blocks DOM all set', function(assert) {
    var rows = document.getElementsByClassName('row'),
        expectedRows = 6, 
        expectedCols = 7;
    assert.ok(rows.length === expectedRows, 'All rows DOM ok');
    for (var i = 0; i < rows.length; i++){
      var cols = rows[i].getElementsByTagName('td');
      assert.ok(cols.length === expectedCols, 'Expected '+j+' cols for '+ i+'row Check');
      for (var j = 0; j < cols.length; j++ ){
        assert.ok(cols[j].className === 'block', j+' col className check');
      }
    }
  });

  QUnit.test('Score check', function(assert){

    App.board[5][0] = App.board[5][1] = App.board[5][2] = App.board[5][3] = 2;
    assert.ok(App.calculateHorizontal(5, 4, 2) === true, 'Vertical true check');

    assert.ok(App.calculateHorizontal(1, 4, 2) === false, 'Vertical false check');

    App.board[3][0] = App.board[3][1] = App.board[3][2] = App.board[3][3] = 2;
    assert.ok(App.calculateHorizontal(3, 4, 2) === true, 'Horizontal true check');

    assert.ok(App.calculateHorizontal(2, 4, 1) === false, 'Horizontal false check');

    App.board[0][0] = App.board[1][1] = App.board[2][2] = App.board[3][3] = 1;
    assert.ok(App.calculateDiagonal(4, 4, 1) === true, 'Diagonal true check');

    assert.ok(App.calculateDiagonal(5, 4, 1) === false, 'Diagonal false check');
  });

  QUnit.test('Players action emulation check', function(assert){

    // document.querySelector('td[data-xrow="5"][data-ycol="2"]').click();

    var playerName = 'Player '+App.player,
        activePlayerName = document.getElementsByClassName('active-title')[0].innerHTML,
        activeCell =  document.querySelector('td[data-xrow="5"][data-ycol="0"]').getElementsByClassName('active-piece').length;
    assert.ok(playerName === activePlayerName, 'Title Highlight Check');
    assert.ok( activeCell > 0, 'Ball sinks to lowest level Check');
  });

})(Connect4)