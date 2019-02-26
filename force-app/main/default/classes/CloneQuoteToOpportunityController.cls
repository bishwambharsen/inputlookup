public with sharing class CloneQuoteToOpportunityController {
    @AuraEnabled
    public static void cloneQuoteToNewOppty(Id quoteId, Id opptyId){
        Quote currentQuote=[select Name from Quote where Id=:quoteId];
        
    }
}