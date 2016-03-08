// - Variable setup -
var baseUrl = 'https://'+accountname+'.cloudant.com/'+db; // Base URL of Cloudant
var cloudant_auth = btoa(user + ':' + pass); // Creates a Base64 String of the User and Pass
var httpAuth = user+":"+pass+"@";
var baseHttpAuthUrl = 'https://'+httpAuth+accountname+'.cloudant.com/'+db; // Base URL of Cloudant
var globalPictureCount = 0;
var currentPage = 0;

// - App options -
var picsPerPage = 4; // Pictures per page

$( document ).ready(function() {
  function loadPictures() {
    var docUrl = baseUrl+'/_design/info/_view/docs?limit='+picsPerPage+'&skip='+(picsPerPage*currentPage)+'&reduce=false';

    function parseData(data) {
      console.log(data);
      var myObjects = "";

      for(var i=0; i < data.rows.length; i++) { // Go through each Document and insert into Div
        myObjects += '<div class="picRow">';
        myObjects += '<div class="leftCol"><div class="imgRow"><img src="'+baseHttpAuthUrl+'/'+data.rows[i].value._id+'/cloudandtDocID" class="img"></div>';
        myObjects += '<div class="titleRow">'+data.rows[i].value.Title+'</div></div>';
        myObjects += '<div class="rightCol"><b>Age:</b> '+data.rows[i].value.age+'<br />'+
                                                              '<b>Gender:</b> '+data.rows[i].value.gender+'<br />'+
                                                              '<b>Celebrity:</b> '+data.rows[i].value.celebrity+
                                                              '</div><div style="clear: both;"></div>';
        myObjects += '</div>';
      }
        $('#loadeddata').html(myObjects);
    }
    ajaxGet(docUrl, parseData);
  }

  function loadNumPictures() {
    var docUrl2 = baseUrl+'/_design/aggregates/_view/count?reduce=true';

    function parseData(data) {
      console.log(data);
      globalPictureCount = data.rows[0].value;
      $('#dataptitle').html(globalPictureCount);
      createPageCounter(0);
    }
    ajaxGet(docUrl2, parseData);
  }

  function pageAction(page) {
    currentPage = page;
    loadPictures();
    createPageCounter(page);
  }

  function createPageCounter(currentPage) {
    console.log("CurrentPage: "+currentPage);
    var totalPages = globalPictureCount/picsPerPage;
    var myPages = "";

    if(Number(currentPage) !== 0) { // If we are not already on the first site anyway
      myPages += '<a href="#back" value='+(Number(currentPage)-1)+'>Back </a>';
    }

    for(var i=0; i < totalPages; i++) { // Create a link for each page
      if(i === Number(currentPage)) { // If we are not already on the first site anyway
        myPages += '<b>'+(i+1)+'</b>';
      }else{
        myPages += '<a href="#'+i+' " value='+i+'>'+(i+1)+' </a>';
      }
    }

    if(Number(currentPage) !== (totalPages-1)) { // If we are not already on the last site anyway
      myPages += '<a href="#next" value='+(Number(currentPage)+1)+'>Next</a>';
    }

    $('#pagecounter').html(myPages);

    // - Click Events -
    $('a').click(function(){
      $("html, body").animate({ scrollTop: 0 }, "fast");
      pageAction($(this).attr('value'));
      return false;
    });
  }

  // - ToDo on startup -
  loadNumPictures();
  loadPictures();

}).bind("ajaxSend", function() { // onAjax send
    $(".loader").show();
    console.log("Showing");
}).bind("ajaxStop", function() { // onAjax finish
    $(".loader").hide();
    console.log("hiding");
}).bind("ajaxError", function() { // onAjax error
    $(".loader").hide();
    console.log("hiding with error");
});

// - Helper Functions -
// -- Ajax Get Function --
function ajaxGet(docUrl, func) {
  $.ajax({ // Start AJAX Call
    url: docUrl,
    type: "GET",
    xhrFields: { withCredentials: true },
    dataType: "json",
    crossDomain: true,
    headers: {'Authorization': 'Basic ' + cloudant_auth, 'Content-Type': 'application/json'},
    complete: completeHandler,
  }).done(func);
}

// --- Handle AJAX Completion ---
function completeHandler(jqXHR, textStatus, errorThrown) {
  console.log(jqXHR);
}

// -- Get Image --
function getImage(docID, imageID) {
  var docUrl = baseUrl+'/'+docID+'/'+imageID;

  function parseData(data) {
    console.log(data);
    return data;
  }

  ajaxGet(docUrl, parseData);
}
