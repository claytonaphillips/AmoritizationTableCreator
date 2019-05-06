({
	createTableData : function(component, event, helper){
		var loanInputs = event.getParam("loanInputs");
  		var purchasePrice = loanInputs.purchasePrice;
  		var downPayment = loanInputs.downPayment;
        var loanAmount = purchasePrice - downPayment;
  		var monthlyPayment = loanInputs.monthlyPayment;
        var numberOfPayments = loanAmount/monthlyPayment;
        
        var tableRows = [];
        var newLoanAmount = loanAmount; 
		for(var i = 0; i < numberOfPayments -1; i++){ 
            newLoanAmount = newLoanAmount - monthlyPayment;
            var tableRow = {
  				currentMonth: i + 1,
            	monthlyPayment: monthlyPayment,
  				loanAmount: newLoanAmount
			};
            tableRows.push(tableRow);
		}
        
        var lastTableRow = {
  				currentMonth: tableRows.length + 1,
            	monthlyPayment: newLoanAmount,
  				loanAmount: 0
		};
         
        tableRows.push(lastTableRow);
        
        var tableColumns = [{label: 'Current Month', fieldName: 'currentMonth', type: 'number'},
                			{label: 'Monthly Payment', fieldName: 'monthlyPayment', type: 'currency'},
                			{label: 'Loan Amount Remaining', fieldName: 'loanAmount', type: 'currency'}
            			   ];
        
        this.createTableComponent(component, event, helper, tableColumns, tableRows);
        this.createLineChartComponent(component, event, helper, tableColumns, tableRows);
        
	},
    
    createTableComponent : function(component, event, helper, tableColumns, tableRows){
    	$A.createComponent(
            "c:GenericTableComponent",
            {
                "aura:Id": "genericTableComponentId",
                "tableColumns": tableColumns,
                "tableData" : tableRows
            },
            function(auraDynCmp, status, errorMessage){
                if(component.isValid() && status === "SUCCESS"){
                    component.set("v.tablePlaceHolder", []);
                    var table = component.get("v.tablePlaceHolder");
                    table.push(auraDynCmp);
                    component.set("v.tablePlaceHolder", table);
                }
                else if(status === "INCOMPLETE"){
                    
                }
                else if(status === "ERROR"){
                    
                }
            }    
        );	    
    },
    
    createLineChartComponent : function(component, event, helper, tableColumns, tableRows){
        var chartXValues = [];
        var chartYValues = [];
        for(var i = 0; i < tableRows.length; i++){ 
        	var chartXValue = i + 1;
            chartXValues.push(chartXValue.toString());
            var chartYValue = tableRows[i].loanAmount;
            chartYValues.push(chartYValue);
        }    
       
    	$A.createComponent(
            "c:GenericLineChartComp",
            {
                "aura:Id": "genericLineChartCompId",
                "xAxisLabel": "Current Month",
                "chartXValues" : chartXValues,
                "chartYValues" : chartYValues
            },
            function(auraDynCmp, status, errorMessage){
                if(component.isValid() && status === "SUCCESS"){
                    component.set("v.paymentChartPlaceHolder", []);
                    var paymentChart = component.get("v.paymentChartPlaceHolder");
                    paymentChart.push(auraDynCmp);
                    component.set("v.paymentChartPlaceHolder", paymentChart);
                }
                else if(status === "INCOMPLETE"){
                    
                }
                else if(status === "ERROR"){
                    
                }
            }    
        );
    }
})