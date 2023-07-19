function executeWidgetCode() {
    require(["UWA/Drivers/jQuery", "DS/WAFData/WAFData"], function($, WAFData) {
        var myWidget = {
            dataFull: [],

            displayData: function(arrData) {
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
                myWidget.callData();
                myWidget.displayData(myWidget.dataFull);
            },

            onSearchWidget: function(searchQuery) {
                var arrResult = [];
                for (var i = 0; i < myWidget.dataFull.length; i++) {
                    var objData = myWidget.dataFull[i];
                    if (objData.name.indexOf(searchQuery) !== -1) {
                        arrResult.push(objData);
                    }
                }
                myWidget.displayData(arrResult);
            },

            onResetSearchWidget: function() {
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
						if (dataResp.msg === "OK") {
							myWidget.dataFull = dataResp.data;
							myWidget.displayData(myWidget.dataFull);
						} else {
							widget.body.innerHTML += "<p>Error in WebService Response</p>";
							widget.body.innerHTML += "<p>" + JSON.stringify(dataResp) + "</p>";
						}
					},
					onFailure: function(error) {
						widget.body.innerHTML += "<p>Call Faillure</p>";
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
