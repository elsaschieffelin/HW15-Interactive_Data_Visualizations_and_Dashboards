var url = "http://localhost:5000/samples/940";

function plotIt () {
    d3.json(url).then(function(data) {
        //find first 10 and store in trace
        var keys = [];
        var values = [];
        for (i=1; i<10; i++) {
            Object.entries(data).forEach(([key,value]) => {

                if (key === 'otu_ids') {
                    keys.push(key);
                    x = value[i];
                    values.push(x);}
                else if (key === 'sample_values') {
                    keys.push(key);
                    x = value[i];
                    values.push(x);
                }
                else {
                    keys.push(key);
                    x = value[i];
                    values.push(x);
                }
            });
        };
    console.log(keys);
    console.log(values);
    var topTen = keys.map(function(e,i) {
        return [e, values[i]];
    })
    console.log(topTen);
    var trace = {
        
    }

});
};

plotIt();