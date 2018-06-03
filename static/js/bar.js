Plotly.d3.json("/shots", function(error, response) {
  if (error)
    return console.warn(error);

  var players = []

  for (var i = 0; i < response.length; i++) {
    players.push(response[i]['player']);

  }

  console.log(players);
  var p = [...new Set(players)]
  console.log(p);
  var shots = [];
  for (let value of p) {
    console.log(value);
    var count = 0;
    for (var i = 0; i < players.length; i++) {
      if (players[i] === value) {
        count++;
      }
    }
    shots.push(count)
  }

  console.log(shots);

//1) combine the arrays:
var list = [];
for (var j = 0; j < p.length; j++)
    list.push({'player': p[j], 'shots': shots[j]});

console.log(list);

//2) sort:
list.sort(function(a, b) {
    return ((a.shots > b.shots) ? -1 : ((a.shots == b.shots) ? 0 : 1));
    //Sort could be modified to, for example, sort on the age
    // if the name is the same.
});
console.log(list);
//3) separate them back out:
for (var k = 0; k < list.length; k++) {
    p[k] = list[k].player;
    shots[k] = list[k].shots;
}

console.log(p);
console.log(shots);

  var data = [
    {
      x: p,
      y: shots,
      type: 'bar'
    }
  ];

  var BAR = document.getElementById('bar');

  Plotly.newPlot(BAR, data);
})
