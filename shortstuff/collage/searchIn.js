
   
	 
$(document).ready(function(){
 
/*handle button clicks*/
    $('#butt').click(function() {
      if ($('#tag').val() !== '') {
        instSearch($('#tag').val());
      } else {
         $('#content').html("Please enter some text");
      }
     
    });
    
    $('#tag').keyup(function(event){
       if(event.keyCode == 13){
          $('#butt').click();
        }
    });
    
    
     function instSearch(q) {
		$('#content').empty();
		 
		var tag = q;
		
		$.ajax({
			type: 'POST',
			url: 'instagramsearch.php',
			data: "q="+tag,
			success: function(data){				
				$.each(data, function(i, item) {
					var ncode = '<div class="in"><img src="'+data[i].image+'"></div>';
					$('#content').append(ncode);
				});
			},
			/*if there's an error I'd rather not dig for it*/
			error: function(xhr, type, exception) { 
 				$('#content').html("Error: " + type); 
			}
		});
		
		var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var hr = d.getHours();
        var min = d.getMinutes();

        var datef = d.getFullYear() + '/' +(month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day + " " + hr+":"+ (min<10 ? '0' : '') +min;
        
		$('#cap').html("Search for "+tag+ " at " +datef+". ");
    }

    
});


  
			   