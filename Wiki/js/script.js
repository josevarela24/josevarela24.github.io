//creates a listener for when you press a key
window.onkeyup = keyup;

//creates a global Javascript variable
var inputTextValue;
var x=0;
function keyup(e) {
  //setting your input text to the global Javascript Variable for every key press
  inputTextValue = e.target.value;
  $('#searchValue').text(inputTextValue);
  //listens for you to press the ENTER key, at which point your web address will change to the one you have input in the search box
  if (e.keyCode == 13) {
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + inputTextValue + "&format=json&limit=10&namespace=0&format=json&callback=?";

    var mydiv;
    var aTag;

    $.getJSON(url, function(json){

      if(x==1){
        for(var i = 0; i < json[1].length; i++){
          (function(i){
            setTimeout(function(){
                $('#box'+i).empty();
                $('#box'+i).animate({opacity:0});
            }, 150 * i);
          }(i));
        }
      }

      for(var i = 0; i < json[1].length; i++){
        (function(i){
          setTimeout(function(){
              
              $('<h2>'+json[1][i]+'</h2>').appendTo('#box'+i);
              $('<p>'+json[2][i]+'</p>').appendTo('#box'+i);
              $( "#box"+i ).wrap( "<a href='"+json[3][i]+"' style='text-decoration:none' target='_blank'></a>" );
              $('#box'+i).animate({opacity:1});
          }, 220 * i);
        }(i));
      }
      x=1;
    });
  }
}
