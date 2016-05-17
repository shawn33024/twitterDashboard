// sanitise a string so that it can be used safely in a Lucene search
var sanitise = function(str, quote) {
  var s = str.replace(/'/g,"");
  s = s.replace(/\W/g," ");
  if(quote) {
    return '"' + s + '"';
  } else {
    return s;
  }
}

// var doSearch = function(searchText) {
// //  disableAllCheckBoxes();
//   console.log(searchText);
//   $('#loading').show();
//   var q = "";
//   var sort = null;
//   if(searchText.length>0) {
//     q = sanitise(searchText, false);
//   } else {
//     q = "*:*";
//   }
//   console.log(q);
//   return q;
// };
// $(document).ready(function (){
// 	// as soon as application page loads
	
//    $('#btn').click(function (){
//        $("#btn").removeClass("selected");
//         $(this).addClass("selected");
//        var cloudantURL = "https://20286ffc-8fbc-4a9e-9a15-aedf10b3a0a8-bluemix.cloudant.com/nodered/_design/library/_search/searchPayload?q="+doSearch($("#search_input").val());
//         var obj = {
//         url: cloudantURL,
//         dataType: "json",
//         method: "get"
//         };
       
//         $.ajax(obj).done(function(data) {
//           //console.log(data);
//           $('#loading').hide();
//           displayHtml(data);
//           // if (callback) {
//           //   callback(null, data);
//           // }
//         }).fail(function(err,msg,e) {
//           console.log("ERROR",msg);
//         });
        
//         // $.get(cloudantURL, function(result){
//         // 	//console.log(result);
//         //   	$('#loading').hide();
//         //   	displayHtml(data);
//         // }).fail(function(error){
//         // 	alert("error");
//         // })
        
//         cloudantURL = "https://20286ffc-8fbc-4a9e-9a15-aedf10b3a0a8-bluemix.cloudant.com/nodered/_design/library/_view/view_name?limit=20&reduce=false"
//         var data2 = { profileIMG: "profile_background_image_url", name: "name" }
//         $.post(cloudantURL, data2, function(result){
//         	console.log(result);
//         }).fail(function(error){
//         	alert(error);
//         });
       
//         var renderFacetGroup = function(facet, title, datacounts) {
//             var html = '<h4>' + title + '</h4>';
//             var i=0;
//             for(var j in datacounts["rows"]) {
//               // console.log(j);
//               // console.log(datacounts["rows"][j]["fields"]["default"]);
//               html += '<div class="row facet-row">';
//               html += '  <div class="col-xs-12">';
//               html += '    <a href="Javascript: applyFilter(\'' + facet+ '\',\''+j +'\')">' + j + ' (' + datacounts["rows"][j]["fields"]["default"]+ ')</a>';    
//               html += '  </div>';    
//               html += '</div>';    
//               i++;
//             }
//             return html;
//         }
//         // var renderSerps = function(data, searchterm, filter) {
            
//         //     var html = "";
//         //       for(var i in data.rows) {
//         //           var doc = data.rows[i].doc;
//         //           html += '<div class="row">';
//         //           html += '  <div class="col-xs-12">';   
                  
//         //       }
//         // }
//         function displayHtml(data){
//           // $('#serps').html(html);
         
//           var html = '';
//             html += '<div class="col-xs-12">';  
//             html += renderFacetGroup("payload","Payload",data);
//              html += '</div>';
//              console.log(html);
//             $('#facets').html(html);

//           //  var html = '';
//           //   searchterm = sanitise(searchterm, false);
//           // if (searchterm.length == 0 ) {
//           //     searchterm = "*"
//           // };
         
//           // html += '<h2>Search for "' + searchterm+ '" &nbsp; ';
//           // if(searchterm !="*" || filter.length>0) {
//           //   html += '<button type="button" class="btn" onclick="clearAll();">';
//           //   html += '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
//           //   html += '</button>';
//           // }   
//         }
//     });

// });

$(document).ready(function() {

//send data to index.php 
  $('#btn').click(function () {
    $('#facets').text(''); 
    var data = {
      'data': sanitise($("#search_input").val())
    } 
    console.log(data);

    $.ajax({
      type: "POST",
      url: 'php/get_tweets.php',
      data: data,
      dataType: 'json',
      success: function(returnData) {
         console.log(returnData.statuses);
         for (var key in returnData.statuses) {
          var text = returnData.statuses[key].text;
          var userImage = returnData.statuses[key].user.profile_image_url;
          var date = returnData.statuses[key].created_at;
          var userName = returnData.statuses[key].user.name;
          var tProfile = 'https://twitter.com/' + returnData.statuses[key].user.screen_name;

          var html = '<div class="post">' +
                      '<div class="cont">' + '<h2>' + userName + '</h2>' +
                      '<a href="' + tProfile + '""><img class="userPic" src="' + userImage + '"></a>' + 
                      '</div>' +
                      '<div class="date">' + date + '</div>' +
                      '<p class="postText"><br>' + text + '</p>' +
                    '</div>';

          $('#facets').append(html);
         }
      }
    });

    
      
  });

});
 