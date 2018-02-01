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
[assembly: AssemblyVersion("1.2.041.0")]
[assembly: AssemblyFileVersion("1.2.041.0")]
//1.2.041.0 - Response Log will now have requestId, containerName, ScriptName. All load generator will generate log locally, No need to have MSMQ for Log response. Response log default will have only based on the percentage of user configured, in case of Error responses or assertion, default will be logged only those request for all other users. Changes done in RunScenario.cs
//1.2.040.0 - Changes as mentioned in AppedoLT version 3.3.039 Business logic layer changed, Concurrency issue on MQ.PUT handled
//1.2.039.0 - Changes as mentioned in AppedoLT version 3.3.038 Business logic layer changed, MQ connection error handled properly. 
//1.2.038.0 - Changes as mentioned in AppedoLT version 3.3.037 Business logic layer changed, extraction from gzip format added, extraction failure modified
//1.2.037.0 - Changes as mentioned in AppedoLT version 3.3.035 Business logic layer changed, WaitInterval Parameter Added.
//1.2.036.0 - Changes as mentioned in AppedoLT version 3.3.034 Business logic layer changed, CharacterSet issue fixed.
//1.2.035.0 - Changes as mentioned in AppedoLT version 3.3.033 Business logic layer changed, Two additional Parameters added.
//1.2.034.0 - Changes as mentioned in AppedoLT version 3.3.032 Business logic layer changed, Add MQ.cs new Class