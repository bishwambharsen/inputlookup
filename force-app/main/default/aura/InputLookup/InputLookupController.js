({
    init: function(component, event, helper) {},
    onLookupControlFocus: function(component, event, helper) {
        console.log('>>onLookupControlFocus');

        component.set('v.isLookupFocus', true);
        var lookupControl = component.find('LookupControl');
        $A.util.addClass(lookupControl, 'slds-is-open');
        helper.lookupSearch(component, event, helper);

    },
    onLookupControlBlur: function(component, event, helper) {
        console.log('>>onLookupControlBlur');
        window.setTimeout(function() {
            //$A.getCallback(function(){
            var lookupControl = component.find('LookupControl');
            $A.util.removeClass(lookupControl, 'slds-is-open');
            //});
        }, 500);
    },

    onLookupControlKeyup: function(component, event, helper) {
        console.log('>>onLookupControlKeyup');
        var lookupControl = component.find('LookupControl');
        if (event.getParams().keyCode == 27) {
            $A.util.removeClass(lookupControl, 'slds-is-open');
        } else {
            $A.util.addClass(lookupControl, 'slds-is-open');
            helper.lookupSearch(component, event, helper);
        }
    },
    onLookupItemClick: function(component, event, helper) {
        console.log('>>onLookupItemClick');
        //BS:5th June 2018. Extracting both id and name to store value as an object
        var selectedId = event.currentTarget.getAttribute('data-id');
        var selectedName = event.currentTarget.getAttribute('data-name');
        var selectedValue = { Id: selectedId, Name: selectedName };
        component.set('v.selectedValue', selectedValue);
        component.set('v.value', selectedId);
        $A.util.removeClass(component.find('LookupControl'), 'slds-is-open');
    },
    onLookupCloseClick: function(component, event, helper) {
        console.log('>>onLookupCloseClick');
        component.set('v.value', '');
        component.set('v.value', null);
        //class should be removed not added.BS:25/5/2018.
        $A.util.removeClass(component.find('LookupControl'), 'slds-is-open');
    },

    onDivMouseout: function(component, event, helper) {
        console.log('>>onMouseout');
        //component.set('v.isLookupFocus', false);
        var lookupControl = component.find('LookupControl');
        $A.util.removeClass(lookupControl, 'slds-is-open');
    }
})