function doGet()



{
  
  var tabla
  var chart
  var files
  files = DriveApp.getFilesbyName("Dato2.csv");
  
importFromCSV();
grafico();


function importFromCSV() 

{
  
  var fileName = "Dato2.csv";
  files = DriveApp.getFilesbyName("Dato2.csv");
  //var csvFile = "Dato2.csv";

  


  
  function getFileFromDrive() {
    var filesIterator = DriveApp.getFilesByName ('Dato2.csv');
    while (filesIterator.hasNext()){
      var file = filesIterator.next();
    }}
  
  var csvFile = files // uelve el contenido del archivo como string
         
    }
  
 
  }
   
  var csvData = CSVToArray(files, ","); //Aplica la funcion CSV a Array, pone cada medicion del CSV string como un elemento del vector csvData
   tabla = Charts.newDataTable()
       .addColumn(Charts.ColumnType.STRING, "Hour")
       .addColumn(Charts.ColumnType.NUMBER, "Temperature")
       .addColumn(Charts.ColumnType.NUMBER, "Humidity")

  
  //for (var i = csvData.length -190; i < csvData.length -1 ; i++) 
 
  for (var i = 0   ;  i < csvData.length -1  ; i++) 
  {
    
  var string = String(csvData[i]);
  var array = string.split(",");
  var valor = ([String(array[1])+":"+String(array[2])+":"+String(array[3]),parseFloat(array[7]), parseFloat(array[8])]);
  tabla.addRow(valor);
 

  }
 
 function grafico() {
  
 tabla.build();
 chart = Charts.newLineChart()
        .setTitle('Node 2')
        .setXAxisTitle("Time")
        .setYAxisTitle("Temperature and Humidity")
        .setDimensions(700, 700)
        .setCurveStyle(Charts.CurveStyle.NORMAL)
        .setPointStyle(Charts.PointStyle.TINY)
        .setDataTable(tabla)
        .build();
 
}
  
//return UiApp.createApplication().add(chart);    




function CSVToArray( strData, strDelimiter ) // strData = datos del archivo csv importado como string delimitador coma

{
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    (
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
  );


  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;


  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec( strData )){

    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[ 1 ];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (
      strMatchedDelimiter.length &&
      (strMatchedDelimiter != strDelimiter)
    ){

      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push( [] );

    }


    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[ 2 ]){

      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      var strMatchedValue = arrMatches[ 2 ].replace(
        new RegExp( "\"\"", "g" ),
        "\""
      );

    } else {

      // We found a non-quoted value.
      var strMatchedValue = arrMatches[ 3 ];

    }


    // Now that we have our value string, let's add
    // it to the data array.
    arrData[ arrData.length - 1 ].push( strMatchedValue );
    
    
  }

  // Return the parsed data.
  return( arrData );
 
}


 
 
//}


