using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

// General Information about an assembly is controlled through the following 
// set of attributes. Change these attribute values to modify the information
// associated with an assembly.
[assembly: AssemblyTitle("AppedoLT.LoadGenerator")]
[assembly: AssemblyDescription("")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("Microsoft")]
[assembly: AssemblyProduct("StartLoadGenerator")]
[assembly: AssemblyCopyright("Copyright © Microsoft 2013")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]

// Setting ComVisible to false makes the types in this assembly not visible 
// to COM components.  If you need to access a type in this assembly from 
// COM, set the ComVisible attribute to true on that type.
[assembly: ComVisible(false)]

// The following GUID is for the ID of the typelib if this project is exposed to COM
[assembly: Guid("60349585-72ba-4b31-bd5a-2759023b9f65")]

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
[assembly: AssemblyVersion("1.2.049.0")]
[assembly: AssemblyFileVersion("1.2.049.0")]
//1.2.049.0 - Corrected the status that is not getting updated due to completed user and created user mismatch. This has been corrected
//1.2.048.0 - In the below fix, ends-width works only with xPath 2.0 and since we are using xpath 1.0, it has been replaced with substring command
//1.2.047.0 - Browser cache fixed for jspx, jsp files getting cached and log introduced on request that are cached. this is part of appedolt.log file.
//1.2.046.0 - response data are now inside reportname/script/response_<userid>.log same way variable data. Fixes done on Percentage users of response log. Consistency of Execution of End container execution on Stopping the scenario. In LT gen, log responses was coming only for the first run fixed. 
//1.2.045.0 - Introduced Thinktime and parallel connection. code optimization done and removed lot of unwanted codes. 
//1.2.044.0 - Constants.cs - Changes done on query to take care of container response time calculation for parallel request. Issue in getting the response stream when content type is chuncked and not gzipped. WriteResponsefile and variable data now uses threadpool instead of plain thread. 
//1.2.043.0 - Load generator created users/completed users zero after the first successfull run resolved. Changes done in ScriptExecutor.cs. Variable not cleared after the first run was the issue resolved.
//1.2.042.0 - Queue was piling up due to wrong logic at ResponseMessageWriter Method (_responseDetailQueue.Count == 0 || _variableDetailQueue.Count == 0) used instead of (_responseDetailQueue.Count == 0 && _variableDetailQueue.Count == 0), if we donot use varible, queue was piling up and crashing the system.
//1.2.041.0 - Response Log will now have requestId, containerName, ScriptName. All load generator will generate log locally, No need to have MSMQ for Log response. Response log default will have only based on the percentage of user configured, in case of Error responses or assertion, default will be logged only those request for all other users. Changes done in RunScenario.cs
//1.2.040.0 - Changes as mentioned in AppedoLT version 3.3.039 Business logic layer changed, Concurrency issue on MQ.PUT handled
//1.2.039.0 - Changes as mentioned in AppedoLT version 3.3.038 Business logic layer changed, MQ connection error handled properly. 
//1.2.038.0 - Changes as mentioned in AppedoLT version 3.3.037 Business logic layer changed, extraction from gzip format added, extraction failure modified
//1.2.037.0 - Changes as mentioned in AppedoLT version 3.3.035 Business logic layer changed, WaitInterval Parameter Added.
//1.2.036.0 - Changes as mentioned in AppedoLT version 3.3.034 Business logic layer changed, CharacterSet issue fixed.
//1.2.035.0 - Changes as mentioned in AppedoLT version 3.3.033 Business logic layer changed, Two additional Parameters added.
//1.2.034.0 - Changes as mentioned in AppedoLT version 3.3.032 Business logic layer changed, Add MQ.cs new Class