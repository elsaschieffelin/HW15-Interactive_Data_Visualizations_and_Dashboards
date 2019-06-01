let sample = "940";

function plotIt(sample) {
    var url = "/samples/" + sample;
    d3.json(url).then(function(data) {
        //find first 10 and store in trace
        var data = [data];
        function compare(a,b) {
            if (a.otu_ids < b.otu_ids){
                return 1;
            }
            if (a.otu_ids > b.otu_ids){
                return -1;
            }
            return 0;
        }
        data.sort(compare);
        //define variables
        otu_ids = data[0]['otu_ids'].slice(-10);
        sample_values = data[0]['sample_values'].slice(-10);
        otu_labels = data[0]['otu_labels'].slice(-10);
        //pie plot
        trace = [{
            type: 'pie',
            values: sample_values,
            text: otu_labels,
            hoverinfo: 'text',
            textinfo: "percent"
        }];
        Plotly.newPlot('pie', trace);   
        //bubble plot
        traceBubble = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                color: otu_ids, 
                size: sample_values
            },
            text: otu_labels
        };
        var bubble = [traceBubble];
        Plotly.newPlot('bubble', bubble);

       


    });
};

//plotIt(sample);

function metaData(sample) {
    var meta = "/metadata/" + sample;
    d3.json(meta).then(function(sample_metadata) {
        Object.entries(sample_metadata).forEach(([key,value]) => {
            var id = document.getElementById("sample-metadata");
            var div = document.createElement("div");
            div.innerHTML = `${key}: ${value}`;
            id.append(div);
        });
    });
};  
//metaData(sample);

function sampleList() {
    var names = "/names"
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
    document.getElementById('sample-metadata').innerHTML = " ";
    updates(sample);
}
optionChanged();

function updates(newSample) {
    plotIt(newSample);
    metaData(newSample);
}