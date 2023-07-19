/**
 * 
 */

 
 
function executeWidgetCode() {
    require(["UWA/Drivers/jQuery", "DS/TagNavigatorProxy/TagNavigatorProxy"], function($, TagNavigatorProxy) {
		var myWidget = {
	        onLoad: function(){
				console.log("loading...");
			},
			
			initTagger: function(){
				if(!myWidget.taggerProxy) {
					var options = {
						widgetID: widget.id,
						filteringMode: "WithFilteringServices"	//set filtering mode option
					};
					myWidget.taggerProxy = TagNavigatorProxy.createProxy(options);
					myWidget.setTags(myWidget.dataFull);
					myWidget.taggerProxy.addEvent("onFilterSubjectsChange", myWidget.onFilterSubjectsChange);
						//taggerProxy responds to onFilterSubjectsChange event
				}
			},
			
			setTags: function(arrData) {
				var tags = myWidget.tagsData; // shortcut for script
				
				tags = {};	//initialize tags object
				
				for(var i=0; i<arrData.length; i++) {
					var objData = arrData[i];
					var uId = objData.userId;
					tags[uId] = [];	//declare empty array at uId
					tags[uId].push({	//append to array
						object: objData.firstName
					})
				}
				
				myWidget.taggerProxy.setSubjectsTags(tags);
			},
			
	        onSearch: function(searchQuery){	// filter search results here
				var arrResult = [];
				
				
				/*
				for (var i=0; i < myWidget.dataFull.length; i++){
					var objData = myWidget.dataFull[i];
					if (objData.Title.indexOf(searchQuery) !== -1 || objData.Name.indexOf(searchQuery) !== -1){
						arrResult.push(objData);
					}
				}*/
	        	myWidget.displayData(arrResult);
			},
			
			onSearchReset: function(){
	        	console.log("resetting...");
			},
			
			displayData: function(arrData) {
	                var tableHTML = "<table><thead><tr><th>Type</th><th>Title</th><th>Name</th></tr></thead><tbody>";
	
	                for (var i = 0; i < arrData.length; i++) {
	                    tableHTML =
	                        tableHTML + "<tr><td>" + arrData[i].Type + "</td><td>" + arrData[i].Title + "</td><td>" + arrData[i].Name + "</td></tr>";
	                }
	
	                tableHTML += "</tbody></table>";
	
	                widget.body.innerHTML = tableHTML;
	        },
	    };

	    widget.addEvent("onLoad", myWidget.onLoad);
	    widget.addEvent("onSearch", myWidget.onSearch);
	    widget.addEvent("onSearchReset", myWidget.onSearchReset);
	}
	);
}