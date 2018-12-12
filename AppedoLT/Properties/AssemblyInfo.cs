using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

// General Information about an assembly is controlled through the following 
// set of attributes. Change these attribute values to modify the information
// associated with an assembly.
[assembly: AssemblyTitle("APPEDO_LT")]
[assembly: AssemblyDescription("")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("Appedo")]
[assembly: AssemblyProduct("APPEDO_LT")]
[assembly: AssemblyCopyright("Copyright © Appedo 2019")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]

// Setting ComVisible to false makes the types in this assembly not visible 
// to COM components.  If you need to access a type in this assembly from 
// COM, set the ComVisible attribute to true on that type.
[assembly: ComVisible(false)]

// The following GUID is for the ID of the typelib if this project is exposed to COM
[assembly: Guid("a56b4e1b-3aa5-4a3d-a93b-0c4b6af37ce6")]

// Version information for an assembly consists of the following four values:
//
//      Major Version
//      Minor Version 
//      Build Number
//      Revision
//
// You can specify all the values or you can default the Build and Revision Numbers 
// by using the '*' as shown below:
// [assembly: AssemblyVersion("1.0.*")]
[assembly: AssemblyVersion("3.3.048.0")]
[assembly: AssemblyFileVersion("3.3.048.0")]
//3.3.048 - When multiple generators are loaded, after the completion of run report not getting generated automatically. Last generator data was not validated due to closure of the connection.
//3.3.047 - When multiple generators are loaded, after the completion of run report not getting generated automatically. Last generator data was not validated due to closure of the connection.
//3.3.046 - In the below fix, ends-width works only with xPath 2.0 and since we are using xpath 1.0, it has been replaced with substring command
//3.3.045 - Browser cache fixed for jspx, jsp files getting cached and log introduced on request that are cached. this is part of appedolt.log file.
//3.3.044 - response data are now inside reportname/script/response_<userid>.log same way variable data. Fixes done on Percentage users of response log. Consistency of Execution of End container execution on Stopping the scenario. 
//3.3.043 - Thinktime is parametrizable using variable manager, Validation on delay is removed for allowing parameter. On failure or wrong data, system assumes 100ms delay. Code re-organized for better control over flow change. global variable introduced for stop action & run status. report tree font changed for better clarity. Missing Think time and parallel connection are made available for load generator. This was missing before.MSMQ is fully removed. 
//3.3.042 - Container Response time is calculated as difference from Max(endtime) - Min(Starttime) to take care parrallel connection effect and it is done at page level then moved to container level to avoid thinktime. Previously it was sum(diff) of all request within container. Changes done at constants.cs in Appedo.Core, hence will have impact in Load generator build, Container response time includes think time excludes think time of first page. When content type chunked and not a gzip, response was not captured. This is resolved.
//          Container Response time does not include think time. Threadpool concept introduced where ever parallel threads are used to ensure thread overhead is avoided while doing multiple iterations or run in duration. This will considerably reduce the overhead. Usercreation is still with normal thread creation as it is very long thread and user count might vary for each run and it is one time activity for entire run.
//3.3.041 - Load generator created users/completed users zero after the first successfull run resolved. Changes done in ScriptExecutor.cs. Variable not cleared after the first run was the issue resolved.
//3.3.040 - Response Log will now have requestId, containerName, ScriptName. All load generator will generate log locally, No need to have MSMQ for Log response. Response log default will have only based on the percentage of user configured, in case of Error responses or assertion, default will be logged only those request for all other users. 
//3.3.039 - When run with concurrent users MQ.put is putting the data to read queue due to gloable declaration of variable
//3.3.038 - Exception on MQ connection handled with proper response. Could not get proper error message before for connection failure of MQ service.
//3.3.037 - Exraction from gZipped response fixed, Extraction failure handled with NOTFOUND static Text, and this fixes of using extracted variable in both js and conditions even when extraction fails, Condition statements validation fixed.
//3.3.036 - Enabled Wait for wait interval. Start time and stop time also added for read message. 
//3.3.035 - Based on review added one more parameter for wait till message is available for read in get messages. Added parameter WaitInterval for this functionality.
//3.3.034 - While writing to the MQ,it adds null character for every character that we send. It has been found that it is because of Character SEt that is defaulted in MQ. We are supposed to use character set 437 and fixed now.
//3.3.033 - ReplyToQueueName and Persistence parameter added based on the review from the Client (mannai-ESB on 10-12-2017)
//3.3.032 - New Module added for load testing IBM Websphere MQ services
//Business logic layer changed, Add MQ.cs new Class
//vuser script XML has to be manually prepared for this services
//Schema Attribute is QueueManagerName, Path Attribute - QueueName, URL Attribute - ChannelInfo, 
//port must define the lisener port default being 1414. MQ uses TCP connection and it is defined as part of Channel Info
//Type must be MQ (capital)
//MQ Server/Client version 7.5 is used for this testing. 
//Where ever appedo LT is running, MQ Client must be installed in that machine
//amqmdnet.dll is referenced to the appedo-business logic layer and it is must to get all the IBM MQ class and methods.
//For PUT - method must be POST, for Read from queue - method must be GET
//to read the message that has been put, extracting message id is important and use that message id as part of reading 
//to be defined as part of the query string parameters.
//Text parameter is used for the content of the message used for put
//sample xml is as below for both read and write
/*
 <?xml version="1.0" encoding="utf-8"?>
<vuscript name="MQTest" id="511923100" type="MQ" exclutionfiletypes="" dynamicreqenable="False">
  <container name="Initialize" id="511923101" />
  <container name="Actions" id="511923102">
    <container name="MQTest" id="511923103">
      <page pagename="/MQPUTPage/" host="localhost" delay="0" id="511923104" name="/MQPut" starttime="636451446752948915">
        <request id="511923106" Method="POST" Path="LocalQueue" Protocal="TCP" Version="1.1&#xD;" name="MyQueue" Schema="MyQueue" Host="localhost" Port="1414" QueryString="" Address="MyQueue.LocalQueue.SvrConChannel/TCP/DESKTOP-0D5EHEU(1414)" Url="SvrConChannel/TCP/DESKTOP-0D5EHEU(1414)" Excludesecondaryreq="true" HasErrorResponse="False" ResponseHeader="" resFilename="511923006_res.xml" reqFilename="" IsEnable="True">
          <headers>
            <header name="Accept" value="text/html, application/xhtml+xml, image/jxr, *//*" />
            <header name="Accept-Language" value="en-IN" />
            <header name="User-Agent" value="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063" />
            <header name="Accept-Encoding" value="gzip, deflate" />
            <header name="Host" value="test.appedo.com" />
            <header name="Proxy-Connection" value="Keep-Alive" />
          </headers>
          <querystringparams>
            <querystringparam name="MessageId" value="" rawname="MessageId" rawvalue="" />
            <querystringparam name="CorrelationId" value="QU1RIE15UXVldWUgICAgIKKMKlogAMwC" rawname="CorrelationId" rawvalue="" />
          </querystringparams>
          <params type="text">
            <Param name="" value="&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;&lt;PublishEXT_CRM_SR xmlns=&quot;http://www.ibm.com/maximo&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; creationDateTime=&quot;2017-11-23T13:46:20+03:00&quot; transLanguage=&quot;EN&quot; baseLanguage=&quot;EN&quot; messageID=&quot;8599690.1511433981616427790&quot; maximoVersion=&quot;7 6 20141117-2230 V7600-218&quot; event=&quot;1&quot;&gt;  &lt;EXT_CRM_SRSet&gt;    &lt;SR action=&quot;Replace&quot;&gt;      &lt;CLASS maxvalue=&quot;SR&quot;&gt;SR&lt;/CLASS&gt;      &lt;EXT_CRMSRID&gt;07012016-0093&lt;/EXT_CRMSRID&gt;      &lt;EXT_DEPARTMENT&gt;$$vr_displayName$$&lt;/EXT_DEPARTMENT&gt;      &lt;REPORTEDBY&gt;CRMINTUSER&lt;/REPORTEDBY&gt;      &lt;REPORTEDEMAIL /&gt;      &lt;REPORTEDPHONE /&gt;      &lt;STATUS changed=&quot;1&quot; maxvalue=&quot;RESOLVED&quot;&gt;RESOLVED&lt;/STATUS&gt;      &lt;STATUSDATE changed=&quot;1&quot;&gt;2017-11-23T13:46:19+03:00&lt;/STATUSDATE&gt;      &lt;TICKETID&gt;10009883&lt;/TICKETID&gt;      &lt;TICKETUID&gt;13344&lt;/TICKETUID&gt;      &lt;PERSON&gt;        &lt;DISPLAYNAME&gt;Mohammed Kamal I. K. Jayusi&lt;/DISPLAYNAME&gt;        &lt;PERSONID&gt;$$vr_displayName$$&lt;/PERSONID&gt;      &lt;/PERSON&gt;      &lt;EXT_REJECTREASON /&gt;    &lt;/SR&gt;  &lt;/EXT_CRM_SRSet&gt;&lt;/PublishEXT_CRM_SR&gt;" />
          </params>
          <extractor name="ex_msgid" start="messageId=" end="," mode="1" selctiontype="single" regex="messageId=(.*?)," groupindex="1" ordinal="1" />
          <extractor name="ex_corrId" start="correlationId=" end=";" mode="1" selctiontype="single" regex="correlationId=(.*?);" groupindex="1" ordinal="1" />
        </request>
      </page>
      <log id="566102547" name="CorrelationId" message="$$ex_corrId$$" />
      <log id="566063801" name="MessageID" message="$$ex_msgid$$" />
      <page pagename="/MQGetPage/" host="localhost" delay="0" id="511923104" name="/MQGet" starttime="636451446752948915">
        <request id="511923106" Method="GET" Path="LocalQueue" Protocal="TCP" Version="1.1&#xD;" name="MyQueue" Schema="MyQueue" Host="localhost" Port="1414" QueryString="" Address="MyQueue.LocalQueue.SvrConChannel/TCP/DESKTOP-0D5EHEU(1414)" Url="SvrConChannel/TCP/DESKTOP-0D5EHEU(1414)" Excludesecondaryreq="true" HasErrorResponse="False" ResponseHeader="" resFilename="511923006_res.xml" reqFilename="" IsEnable="True">
          <headers>
            <header name="Accept" value="text/html, application/xhtml+xml, image/jxr, *//*" />
            <header name="Accept-Language" value="en-IN" />
            <header name="User-Agent" value="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063" />
            <header name="Accept-Encoding" value="gzip, deflate" />
            <header name="Host" value="test.appedo.com" />
            <header name="Proxy-Connection" value="Keep-Alive" />
          </headers>
          <querystringparams>
            <querystringparam name="MessageId" value="" rawname="MessageId" rawvalue="16" />
            <querystringparam name="CorrelationId" value="$$ex_msgid$$" rawname="CorrelationId" rawvalue="16" />
          </querystringparams>
        </request>
      </page>
    </container>
  </container>
  <container name="End" id="511923105" />
</vuscript>
 */


