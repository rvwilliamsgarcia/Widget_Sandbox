function executeWidgetCode() {
    require(["UWA/Drivers/jQuery", "DS/WAFData/WAFData"], function($, WAFData) {
        var myWidget = {
            dataFull: [],

            displayData: function(arrData) {
				console.log("RASHID" + "displayData");
                var tableHTML =
                    "<div style='height:100%;overflow:auto;'><table><thead><tr><th>Type</th><th>Name</th><th>Revision</th><th>State</th></tr></thead><tbody>";

                for (var i = 0; i < arrData.length; i++) {
                    tableHTML =
                        tableHTML +
                        "<tr><td>" +
                        arrData[i].type +
                        "</td><td>" +
                        arrData[i].name +
                        "</td><td>" +
                        arrData[i].revision +
                        "</td><td>" +
                        arrData[i].current +
                        "</td></tr>";
                }

                tableHTML += "</tbody></table></div>";

                widget.body.innerHTML = tableHTML;
            },

            onLoadWidget: function() {
				console.log("RASHID" + "on load");
                myWidget.callData();
                myWidget.displayData(myWidget.dataFull);
            },

            onSearchWidget: function(searchQuery) {
				console.log("RASHID" + "on search");
                var arrResult = [];
                for (var i = 0; i < myWidget.dataFull.length; i++) {
                    var objData = myWidget.dataFull[i];
                    
                    if (objData.name.indexOf(searchQuery) !== -1) {
						console.log("RASHID" + objData.name);
                        arrResult.push(objData);
                    }
                }
                myWidget.displayData(arrResult);
            },

            onResetSearchWidget: function() {
				console.log("RASHID" + "reset search");
                myWidget.displayData(myWidget.dataFull);
            },

            callData: function() {
                var urlWAF = widget.getValue("urlREST");
                var dataWAF = {
                   type: widget.getValue("typeObj"),
                   selects: "attribute[*],current,name,revision"
                };
                var headerWAF = {
                   SecurityContext: widget.getValue("ctx")
                };
                var methodWAF = "GET";
                WAFData.authenticatedRequest(urlWAF, {
					method: methodWAF,
					headers: headerWAF,
					data: dataWAF,
					type: "json",
					onComplete: function(dataResp) {
						console.log("RASHID" + dataResp.msg);
						if (dataResp.msg === "OK") {
							console.log("RASHID" + "ok");
							myWidget.dataFull = dataResp.data;
							myWidget.displayData(myWidget.dataFull);
						} else {
							console.log("RASHID" + "error in webservice response");
							widget.body.innerHTML += "<p>Error in WebService Response</p>";
							widget.body.innerHTML += "<p>" + JSON.stringify(dataResp) + "</p>";
						}
					},
					onFailure: function(error) {
						console.log("RASHID call failure " + JSON.stringify(error));
						widget.body.innerHTML += "<p>Call Failure</p>";
						widget.body.innerHTML += "<p>" + JSON.stringify(error) + "</p>";
					}
                });
            }
        };

        widget.addEvent("onLoad", myWidget.onLoadWidget);
        widget.addEvent("onRefresh", myWidget.onLoadWidget);
        widget.addEvent("onSearch", myWidget.onSearchWidget);
        widget.addEvent("onResetSearch", myWidget.onResetSearchWidget);
    });
}