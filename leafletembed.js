var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

function initmap() {
    // set up the map
    map = new L.Map('map');

    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMapa> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});

    // start the map in South-East England
    map.setView(new L.LatLng(23.01823,120.219646),16);
    map.addLayer(osm);
    //var marker=L.marker([23.01823,120.219646]).addTo(map);
    var data = readTextFile("case_set.csv");
    // addPoints(data);
    var data2 = readTextFile("single_rule_result_2.txt");
    generatePolygon(data2,"RuleB");
    var data1 = readTextFile("single_rule_result_1.txt");
    generatePolygon(data1,"RuleA");
}

function generatePolygon(data,rulename){
	//var test_data =['120.219646', '120.220064', '23.01749', '23.01823']
	var lines = data.split('\n');				//split each line (each object)
    for (var i=0;i<lines.length;i++){
    if (lines[i] === "") {
        continue
    }
		var line_split_data = lines[i].split('\t');	//split id and points info
    console.log(line_split_data[0])
		var points = line_split_data[1].replace(/[^0-9.,]/g,"").split(',');	//keep only points, remove parentheses & space
		//console.log(points);
		var points_float;
		for(var i2=0;i2<points.length;i2++){
        	var  polygon_obj = L.polygon([
							[parseFloat(points[3]),parseFloat(points[0])],
							[parseFloat(points[3]),parseFloat(points[1])],
							[parseFloat(points[2]),parseFloat(points[1])],
							[parseFloat(points[2]),parseFloat(points[0])],
						   ],{className: rulename}).addTo(map);
            //console.log(each_polygon);
		}
	}
}
function addPoints(data){
    var lines = data.split('\n');
    for (var i=0;i<lines.length;i++){
        var line_split_data = lines[i].split(',');
        for(var i2=0;i2<line_split_data.length;i2++){
            var circle = L.circle([parseFloat(line_split_data[2]),parseFloat(line_split_data[3])],3, {
                            "color": '#9a9696',
                            "fillColor": '#421010',
                            "fill-opacity": 1
                        }).addTo(map);
        }
    }
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                //console.log(allText);

            }
        }
    }
    rawFile.send(null);
    return allText;
}
