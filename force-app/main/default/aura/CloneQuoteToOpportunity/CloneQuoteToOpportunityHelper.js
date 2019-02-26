({
    cloneQuote: function(cmp, event) {
        var currentQuoteId = cmp.get('v.recordId');
        var cloneToOpptyId = cmp.get('v.opportunityId');
        
        var action = cmp.get('c.cloneQuoteToNewOppty');
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                console.log("Quote successfully cloned to new opportunity");
                showToast("Success","The quote has been sucessfully cloned.");
            } else if (state === "ERROR") {
                var error = response.getError();
                console.log("Error encountered: " + JSON.stringify(error));
            }
        });
        
        $A.enqueueAction(action);
    },
    
    showToast : function(title, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title:title ,
            message:message 
        });
        toastEvent.fire();
    }
})