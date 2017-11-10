# Resileo-LT
Resileo Labs Load Testing tool code base

## AppedoLT 3.2.029 - Appedo Load Generator 1.1.032: 10-Nov-2017

### Changelog 

**AppedoLT 3.2.029**
* Changed to save response body during run for Chunked Transfer-encoding as Assertion was failing

## Known Issues

**AppedoLT 3.2.029**
* AppedoLT will continue to show status as 'Running' if Loadgen is disconnected during the run
* Multipart/form-data (File Upload) is returning loopback in Oracle ADF servers
* Bandwidth emulation not working with file upload scenarios
* Creating large Response log file for large response body

**AppedoLT Cloud Processing**
* VUser count graph in Run report showing incorrect count