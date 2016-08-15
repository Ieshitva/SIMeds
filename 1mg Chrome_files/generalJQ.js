	//////////////////////////////////////////////////////////////////
	// These are functions in global scope hence not defined in .ready
	//////////////////////////////////////////////////////////////////
	/* wrapper function to make the ajax call
	 * if output contains redirect parameter then it will be redirected to the page
	 * url : contains the redirect url
	 * data : contains the post parameters
	 * actionFunction contains the response function
	 */
	function customAjaxCall(url, data, actionFunction){
		$.ajax({ 
			url: url,
	        data: data,
	        type: 'post',
	        dataType: "json",
			beforeSend: function() {
							//to do loading
							$('#loading').show()
				  		},
		    complete: function(){
							//to do loading
		    				$('#loading').hide()
				  	  },	        
	        success: function(output) { 
			    if (output.redirect) {
			        // data.redirect contains the string URL to redirect to
			        window.location.href = output.redirect;
			    } else if(output.dialogMessage){
			    	var dialogText = output.dialogMessage;
					var dialogTitle = 'TAGNPIN';
			    	var buttonsOpts = {};
					buttonsOpts['OK'] = function() {
						$( this ).dialog( "close" );
					};
					deleteDialog(buttonsOpts, dialogText, dialogTitle);
	        	}else {
			        //this is the function defined for the action 
			    	actionFunction(output);
			    	$("img").error(function () {
			  		  $(this).unbind("error").attr("src", "http://"+ document.domain +"/images/default.jpg");
			    	});
			    }
	       }
		});
	}
	
	//Checks whether string consists only of blank spaces 
	function isBlank(pString){
	    if (!pString || pString.length == 0) {
	        return true;
	    }
	    // checks for a non-white space character 
	    return !/[^\s]+/.test(pString);
	}
	
	//delete confirmation dialog
	function deleteDialog(buttonsOpts, dialogText, dialogTitle){
			$( '<div title="' + dialogTitle + '"></div>' ).html(dialogText).dialog({
				resizable: false,
				height:200,
				modal: true,
				buttons: buttonsOpts
			});
	}
	
	//alerts on response
	function alertOutput(outputText, outputTitle){ 
		$( '<div title="' + outputTitle + '"></div>' ).html(outputText).dialog({
			resizable: false,
			height:200,
			modal: true,
			buttons: {
				"Ok": function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}

	//////////////////////////////////////////////
	// These are functions in document.ready scope
	//////////////////////////////////////////////
	$(document).ready(function() {		  
		//tab selection Click Event 
		$("#tabs li a").click(function() {
			$("#tabs li a").removeClass("active"); //Remove any "active" class
			$(this).addClass("active"); //Add "active" class to selected tab
		});

	});
	
	$("img").error(function () {
		  $(this).unbind("error").attr("src", "http://"+ document.domain +"/images/default.jpg");
	});
        
        //////////////////////////////////////////////
        // Qtip 
        /////////////////////////        
        var shared = {
            position: {
                    //my: 'bottom middle', 
                    //at: 'top middle'
            },
            show: 'mouseover',
            hide:{
                  event: 'mouseleave',
                  fixed: true
            },
            style: {
                    width: 150,
                    classes: 'ui-tooltip-rounded ui-tooltip-dark ui-tooltip-shadow',
                    tip: true
			 
            }
            
   };
        