({
	generateChart : function(component, event, helper){   
        var chartdata = {
            labels: component.get("v.chartXValues"),
            datasets: [
            {
            	label:component.get("v.xAxisLabel"),
                data: component.get("v.chartYValues"),
                borderColor:'rgba(62, 159, 222, 1)',
                fill: false,
                pointBackgroundColor: "#FFFFFF",
                pointBorderWidth: 4,
                pointHoverRadius: 5,
                pointRadius: 3,
                bezierCurve: true,
                pointHitRadius: 10
            }
            ]
        }
        
        //Get the context of the canvas element we want to select
        var context = component.find("linechart").getElement();
        var lineChart = new Chart(context,
        {
            type: 'line',
            data: chartdata,
            options: 
            {	
                legend:
                {
                    position: 'bottom',
                    padding: 10,
                },
                responsive: true
            }
        });       
	}
})