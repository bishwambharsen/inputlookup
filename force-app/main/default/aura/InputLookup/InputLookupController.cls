global with sharing class InputLookupController {
    
    @AuraEnabled
    global static String lookupSearch(String objectName, String keyword, String otherParams) {
        //26/7/18 BS: Prevent potential SOQL injection
        keyword=String.escapeSingleQuotes(keyword);
        keyword = '\'%' + keyword + '%\'';
        String query='';
        system.debug('printing log' + otherParams);
        if(String.isNotBlank(otherParams))
        {
            otherparams=otherparams.replace('\"', '\'');
            query = 'SELECT Id, Name FROM ' + objectName + ' WHERE Name LIKE ' + keyword + ' ' + otherParams+' LIMIT 5';
            system.debug('printing query' + query);
        }
        else
            query = 'SELECT Id, Name FROM ' + objectName + ' WHERE Name LIKE ' + keyword +' LIMIT 5';
        
        
        List<SObject> recordList = Database.query(query);
        
        system.debug('printing recordlist' + recordList);
        
        return JSON.serialize(recordList);
    }
    
}
