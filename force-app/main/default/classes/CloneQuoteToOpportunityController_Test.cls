@isTest
public class CloneQuoteToOpportunityController_Test {
    
    @testSetup
    static void setup(){
        Opportunity op=new Opportunity();
        op.Name='Test oppty 1';
        op.CloseDate=system.date.today();
        op.StageName='Prospecting';
        insert op;
        
        Quote q=new Quote();
        q.Name='test quote 1';
        q.PriceBook2Id=Test.getStandardPricebookId();
        q.OpportunityId=op.Id;
        insert q;
        
        Product2 p=new Product2();
        p.Name='Test product 1';
        p.IsActive=true;
        insert p;
        
        PriceBookEntry pbe=new PriceBookEntry();
        pbe.IsActive=true;
        pbe.Pricebook2Id=Test.getStandardPricebookId();
        pbe.Product2Id=p.Id;
        pbe.UnitPrice=20;
        insert pbe;
        
        QuoteLineItem qLi=new QuoteLineItem();
        qLi.QuoteId=q.Id;
        qLi.ServiceDate=system.today();
        qLi.Discount=10;
        qLi.PricebookEntryId=pbe.Id; 
        qLi.Quantity=2; 
        qLi.UnitPrice=pbe.UnitPrice; 
        qLi.Product2Id=pbe.Product2Id;
        
        insert qLi;
    }

    @isTest
    static void cloneQuoteToNewOppty_Test(){
        Opportunity op=new Opportunity();
        op.Name='Test oppty 2';
        op.CloseDate=system.date.today();
        op.StageName='Prospecting';
        insert op;
        
        Quote currentQuote=[select Id from Quote limit 1];
        
        CloneQuoteToOpportunityController.cloneQuoteToNewOppty(currentQuote.Id, op.Id);
        
        Quote clonedQuote=[select Id from Quote where OpportunityId=:op.Id limit 1];
        
        system.assert(clonedQuote!=null);
        
        QuoteLineItem li=[select Id from QuoteLineItem where QuoteId=:clonedQuote.Id];
        
        system.assert(li!=null);
    }
}