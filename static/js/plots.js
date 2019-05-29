var url = "http://localhost:5000/samples/940";

function plotIt () {
    d3.json(url).then(function(data) {
        //find top 10
        var i;
        for (i = 0; i = 10; i++) {
            console.log(i);
        }
    });
};
plotIt();