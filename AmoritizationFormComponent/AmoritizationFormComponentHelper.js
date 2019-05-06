({
	createTable : function(component, event, helper){
		var purchasePriceVar = component.find("purchasePriceInputId").get("v.value");
        var downPaymentVar = component.find("downPaymentInputId").get("v.value");
        var monthlyPaymentVar = component.find("monthlyPaymentInputId").get("v.value");
        
        var loanInputs = {
  			purchasePrice: purchasePriceVar,
  			downPayment: downPaymentVar,
  			monthlyPayment: monthlyPaymentVar
		};
        
        var createTableEvent = component.getEvent("createTableEvent");
        createTableEvent.setParams({
            "loanInputs" : loanInputs});
        createTableEvent.fire();	
	}
})