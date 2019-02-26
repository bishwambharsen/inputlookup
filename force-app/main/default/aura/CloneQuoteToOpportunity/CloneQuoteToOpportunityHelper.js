({
    cloneQuote: function(cmp, event) {
        var currentQuoteId = cmp.get('v.recordId');
        var cloneToOpptyId = cmp.get('v.opportunityId');
        
        var action = cmp.get('c.cloneQuoteToNewOppty');
        action.setParams({
            quoteId: currentQuoteId,
            opptyId: cloneToOpptyId
        })
        toggleSpinner();
        action.setCallback(this, function(response) {
            var state = response.getState();
            toggleSpinner();
            if (state === "SUCCESS") {
                console.log("Quote successfully cloned to new opportunity");
                $A.get('e.force:closeQuickAction').fire();
                showToast("success","Success","The quote has been sucessfully cloned.");
                
            } else if (state === "ERROR") {
                var error = response.getError();
                console.log("Error encountered: " + JSON.stringify(error));
                $A.get('e.force:closeQuickAction').fire();
                showToast('error',"Error","Something went wrong!");
                
            }
        });
        
        $A.enqueueAction(action);
    },
    
    toggleSpinner: function(cmp, event){
        $A.util.toggleClass(cmp.find('spinner'),'slds-hide');
    },
    
    showToast : function(type,title, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            type:type,
            title:title ,
            message:message 
        });
        toastEvent.fire();
    }
})