({
    lookupSearch: function(component, event, helper) {
        console.log('printing extraquery' + component.get("v.extraQuery"));
        var searchAction = component.get('c.lookupSearch');
        searchAction.setParams({
            objectName: component.get('v.object'),
            keyword: component.get('v.keyword'),
            otherParams: component.get("v.extraQuery")
        });

        searchAction.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var records = JSON.parse(response.getReturnValue());
                component.set('v.data', records);
            } else {
                console.log(response.getError());
            }
        });

        $A.enqueueAction(searchAction);
    },

    closeLookup: function(component, event, helper) {
        console.log('>>oncloseLookup');

        var lookupControl = component.find('LookupControl');
        $A.util.removeClass(lookupControl, 'slds-is-open');

    }
})