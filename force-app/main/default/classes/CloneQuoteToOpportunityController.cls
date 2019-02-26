public with sharing class CloneQuoteToOpportunityController {
    @AuraEnabled
    public static void cloneQuoteToNewOppty(Id quoteId, Id opptyId){
        Quote currentQuote=[select Name, ExpirationDate, OpportunityId, AccountId, Status,
                            Description, BillingAddress, BillingName, ContactId, Discount,
                            ShippingAddress, ShippingName,  
                            Email, ShippingHandling, Tax, PriceBook2Id,
                            (select ServiceDate, Discount, Description, ListPrice, Product2Id,
                             Quantity, QuoteId,UnitPrice,Subtotal, TotalPrice, PriceBookEntryId     
                             from QuoteLineItems)     
                            from Quote 
                            where Id=:quoteId];
        
        List<QuoteLineItem> currentLineItems=currentQuote.QuoteLineItems;
        
        Quote clonedQuote=currentQuote.clone(false, true, false, false);
        clonedQuote.OpportunityId=opptyId;
        
        insert clonedQuote;
        
        List<QuoteLineItem> clonedLineItems=currentLineItems.deepClone(false);
        for(QuoteLineItem qi:clonedLineItems){
            qi.QuoteId=clonedQuote.Id;
        }
        
        
        if(!clonedLineItems.isEmpty())insert clonedLineItems;
    }
}