let sample = "941";

function plotIt(sample) {
    var url = "/samples/" + sample;
    d3.json(url).then(function(data) {
        //find first 10 and store in trace
        data['otu_ids'].sort((a,b) => b-a);
        //console.log(data);
        otu_ids = data['otu_ids'].slice(0,10);
        sample_values = data['sample_values'].slice(0,10);
        otu_labels = data['otu_labels'].slice(0,10);

/*
        for (i=1; i<10; i++) {
            Object.entries(data).forEach(([key,value]) => {
                
                if (key === 'otu_ids') {
                    x = value[i];
                    otu_ids.push(x);}
                else if (key === 'sample_values') {
                    x = value[i];
                    sample_values.push(x);}
                else {
                    x = value[i];
                    otu_labels.push(x);
                    console.log(x);}
            });
        };
*/
     trace = [{
        type: 'pie',
        values: sample_values, 
        labels: otu_ids
    }];
    Plotly.newPlot('pie', trace);   

     traceBubble = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            color: otu_ids, 
            size: sample_values
        }
    };

    var bubble = [traceBubble];
    Plotly.newPlot('bubble', bubble);
    });
};

//plotIt(sample);


function metaData() {
    var meta = "http://localhost:5000/metadata/" + sample;
    d3.json(meta).then(function(sample_metadata) {
        Object.entries(sample_metadata).forEach(([key,value]) => {
            var id = document.getElementById("sample-metadata");
            var div = document.createElement("div");
            div.innerHTML = "";
            div.innerHTML = `${key}: ${value}`;
            id.append(div);
        });
    });
};
//metaData(sample);

function sampleList() {
    var names = "http://localhost:5000/names"
    d3.json(names).then(function(samples) {
        //build out dropdown menu
        samples.forEach(function(sample) {
            var menu = document.getElementById("selDataset");
            var item = document.createElement("option");
            item.innerHTML = `${sample}`;
            menu.append(item);
        });
    })
};
sampleList();

function optionChanged(select) {
    var sample = select;
    updates(sample);
}
optionChanged();

function updates(newSample) {
    plotIt(newSample);
    metaData(newSample);
}
