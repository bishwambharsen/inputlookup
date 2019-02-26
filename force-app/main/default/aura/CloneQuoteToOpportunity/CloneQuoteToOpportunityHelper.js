({
    cloneQuote: function(cmp, event) {
        var currentQuoteId = cmp.get('v.recordId');
        var cloneToOpptyId = cmp.get('v.opportunityId');

        var action = cmp.get('c.cloneQuoteToNewOppty');

        action.setCallback(this, function(response) {
            var state = response.getState();

            if (state === "SUCCESS") {
                console.log("Quote successfully cloned to new opportunity");
            } else if (state === "ERROR") {
                var error = response.getError();
                console.log("Error encountered: " + JSON.stringify(error));
            }
        });

        $A.enqueueAction(action);
    }
})