//practice_start
//Retrieve full name, extract wfreq array, and filter null values
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person => person.wfreq).sort((a,b) => b - a);
    filteredWfreq = wfreq.filter(element => element !=null);
    console.log(filteredWfreq);
});
//display metadata for first person
d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});

d3.selectAll("body").on("change", updatePage);

function updatePage() {
  var dropdownMenu = d3.selectAll("#selectOption").node();
  var dropdownMenuID = dropdownMenu.id;
  var selectedOption = dropdownMenu.value;

  console.log(dropdownMenuID);
  console.log(selectedOption);
};
//practice_end


//Challenge
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text("ID: "+ result.id);
      PANEL.append("h6").text("Ethnicity: "+ result.ethnicity);
      PANEL.append("h6").text("Gender: "+result.gender);
      PANEL.append("h6").text("Age: "+result.age);
      PANEL.append("h6").text("Location: "+result.location);
      PANEL.append("h6").text("BBtype: "+result.bbtype);
      PANEL.append("h6").text("WFREQ: "+result.wfreq);
    });
  }


function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
  
    sample_values = result.sample_values.sort((a,b) => a.sample_values - b.sample_values).reverse();
    sample_values = result.sample_values
    topten_sample_values = sample_values.slice(0,10);
    otu_ids = result.otu_ids
    topten_otu_ids = otu_ids.slice(0,10);

    console.log(result);
    console.log(sample_values);
    console.log(topten_sample_values);
    console.log(otu_ids);
    console.log(topten_otu_ids);

  var data = [{
    type: 'bar',
    x: topten_sample_values,
    y: topten_otu_ids,
    orientation: 'h'
  }];
  var layout = {
    yaxis: {type:'category'}

  };
  Plotly.newPlot("bar", data, layout);

//bubble
  var trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_ids,
    mode: 'markers',
    
    marker: {
      color: otu_ids,
      size: sample_values
    }
  };
  
  var data1 = [trace1];
  
  var layout1 = {
    
    showlegend: false,
        height: 600,
    width: 1000
  };
  
  Plotly.newPlot('bubble', data1, layout1);
//end bubble

//gauge

  d3.json("samples.json").then((data2) => {
    var metadata2 = data2.metadata;
    var resultArray2 = metadata2.filter(sampleObj2 => sampleObj2.id == sample);
    var result2 = resultArray2[0];
  //var PANEL = d3.select("#sample-metadata");

    var wfreqValue=result2.wfreq;
  
    console.log(wfreqValue);

    var data3 = [
      {
        domain: { x: [0, 9], y: [0, 9] },
        value: wfreqValue,
        title: { text: "WFREQ" },
        type: "indicator",
        mode: "gauge+number"
      }
    ];

    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data3, layout3);
  });

//end gauge


  
});
}



