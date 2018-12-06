//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
////using IBM.WMQ;
//using System.Xml;
//using AppedoLT.Core;
//using System.Diagnostics;
//using System.IO;
//using System.Net;
//using System.Net.Cache;
//using System.Net.Sockets;

//namespace AppedoLT.BusinessLogic
//{
//    public class MQ : Request
//    {
        
//        private string _connectionGroup;
//        private IPEndPoint _IPAdress = null;

//        public MQ(XmlNode request, ref Dictionary<string, string> cookies, string ConnectionGroup, IPEndPoint ipaddress, bool storeResult, int bandwidthInKbps)
//        {
//            RequestId = int.Parse(request.Attributes["id"].Value);
//            HasError = false;
//            RequestNode = request;
//            responseTime = new Stopwatch();
//            firstByteTime = new Stopwatch();
//            ResponseStream = new MemoryStream();
//            StoreRequestBody = storeResult;
//            _connectionGroup = ConnectionGroup;
//            _IPAdress = ipaddress;
//            _bandwidthInKbps = bandwidthInKbps;
//            if (_bandwidthInKbps > 0)
//            {
//                // Allocate the buffersize based on the bandwidth
//                _bufferSize = _bandwidthInKbps * 1024 / 8;
//            }
//        }

//        public Boolean ConnectMQ(string strQueueManagerName, string strChannelInfo)
//        {
//            StartTime = DateTime.Now;
//            Boolean strReturn = false;
//            try
//            {
//                char[] separator = { '/' };
//                string[] ChannelParams;
//                ChannelParams = strChannelInfo.Split(separator);
//                string channelName = ChannelParams[0];
//                string transportType = ChannelParams[1];
//                string connectionName = ChannelParams[2];
//                responseTime.Start();
//                //MQQueueManager queueManager = new MQQueueManager(strQueueManagerName, channelName, connectionName);
//                responseTime.Stop();
//                strReturn = true;
//            }
//            catch (MQException exp)
//            {
//                ErrorMessage = exp.Message;
//                ResponseCode = 700;
//                _responseStr = exp.StackTrace;
//                strReturn = false;
//                ExceptionHandler.WritetoEventLog(ErrorMessage+' '+exp.StackTrace);
//            }
//            return strReturn;
//        }

//        public string WriteMsg(string strInputMsg, string strMsgId, string strCorrId, string strReplyQName, int intPersistence, string strQueueName)
//        {
//            string strReturn = "";
//            try
//            {
//                MQQueueManager queueManager = new MQQueueManager();
//                MQQueue queue = queueManager.AccessQueue(strQueueName, MQC.MQOO_OUTPUT + MQC.MQOO_FAIL_IF_QUIESCING, "", "", "");
//                MQMessage queueMessage = new MQMessage
//                {
//                    Format = MQC.MQFMT_STRING,
//                    CharacterSet = 437
//                };
//                queueMessage.WriteString(strInputMsg);
//                queueMessage.Persistence = intPersistence;

//                if (strReplyQName != string.Empty) queueMessage.ReplyToQueueName = strReplyQName;

//                if (strMsgId != string.Empty)
//                {
//                    try
//                    {
//                        byte[] bytArrMsgId = System.Convert.FromBase64String(strMsgId);
//                        queueMessage.MessageId = bytArrMsgId;
//                    }
//                    catch (Exception ex)
//                    {
//                        if (ErrorMessage == string.Empty) ErrorMessage = ex.Message;
//                        else ErrorMessage += ex.Message;
//                    }
//                }
//                if (strCorrId != string.Empty)
//                {
//                    try
//                    {
//                        byte[] bytArrCorrId = System.Convert.FromBase64String(strCorrId);
//                        queueMessage.CorrelationId = bytArrCorrId;
//                    }
//                    catch (Exception ex)
//                    {
//                        if (ErrorMessage == string.Empty) ErrorMessage = ex.Message;
//                        else ErrorMessage += ex.Message;
//                    }
//                }
//                queueMessage.Format = MQC.MQFMT_STRING;
//                MQPutMessageOptions queuePutMessageOptions = new MQPutMessageOptions();
//                responseTime.Start();
//                firstByteTime.Start();
//                queue.Put(queueMessage, queuePutMessageOptions);
//                firstByteTime.Stop();
//                responseTime.Stop();
//                String msgID = Convert.ToBase64String(queueMessage.MessageId);
//                String corrID = Convert.ToBase64String(queueMessage.CorrelationId);
//                //byte[] CorrID = System.Convert.FromBase64String(msgID);
//                strReturn = _responseStr = "messageId="+ msgID+", correlationId="+corrID+";";
//                Success = true;
//                ResponseCode = 200;
//                ResponseSize = strReturn.Length * 8;
//            }
//            catch (MQException MQexp)
//            {
//                ResponseCode = 700;
//                strReturn = _responseStr = ErrorMessage += "Exception: " + MQexp.Message;
//                Success = false;
//            }
//            catch (Exception exp)
//            {
//                ResponseCode = 700;
//                strReturn = _responseStr = ErrorMessage += "Exception: " + exp.Message;
//                Success = false;
//            }
//            finally
//            {
//                if (responseTime.IsRunning) responseTime.Stop();
//                if (firstByteTime.IsRunning) firstByteTime.Stop();
//            }
//            return strReturn;
//        }
//        public string ReadMsg(string strMsgId, string strCorrId, int intWaitInterval, string strQueueName)
//        {
//            String strReturn = "";
//            try
//            {
//                MQGetMessageOptions queueGetMessageOptions = new MQGetMessageOptions();
//                MQQueueManager queueManager = new MQQueueManager();
//                MQQueue queue = queueManager.AccessQueue(strQueueName, MQC.MQOO_INPUT_AS_Q_DEF + MQC.MQOO_FAIL_IF_QUIESCING);
//                // int openOptions = MQC.MQOO_INPUT_AS_Q_DEF | MQC.MQOO_FAIL_IF_QUIESCING;
//                //queue = queueManager.AccessQueue(QueueName, openOptions);
//                MQMessage queueMessage = new MQMessage();
//                if (intWaitInterval > 0)
//                {
//                    queueGetMessageOptions.Options = MQC.MQGMO_WAIT;
//                    queueGetMessageOptions.WaitInterval = intWaitInterval;
//                }
//                queueMessage.Format = MQC.MQFMT_STRING;
//                if (strMsgId != string.Empty)
//                {
//                    try
//                    {
//                        byte[] bytArrMsgId = System.Convert.FromBase64String(strMsgId);
//                        queueMessage.MessageId = bytArrMsgId;
//                        queueGetMessageOptions.MatchOptions = MQC.MQMO_MATCH_MSG_ID;
//                    }
//                    catch (Exception ex)
//                    {
//                        if (ErrorMessage == string.Empty) ErrorMessage = ex.Message;
//                        else ErrorMessage += ex.Message;
//                    }
//                }
//                if (strCorrId != string.Empty)
//                {
//                    try
//                    {
//                        byte[] bytArrCorrId = System.Convert.FromBase64String(strCorrId);
//                        queueMessage.CorrelationId = bytArrCorrId;
//                        queueGetMessageOptions.MatchOptions = MQC.MQMO_MATCH_CORREL_ID;
//                    }
//                    catch (Exception ex)
//                    {
//                        if (ErrorMessage == string.Empty) ErrorMessage = ex.Message;
//                        else ErrorMessage += ex.Message;
//                    }
//                }
////                queueGetMessageOptions = new MQGetMessageOptions();
//                responseTime.Start();
//                firstByteTime.Start();
//                queue.Get(queueMessage, queueGetMessageOptions);
//                strReturn = _responseStr = queueMessage.ReadString(queueMessage.MessageLength);
//                firstByteTime.Stop();
//                responseTime.Stop();
//                Success = true;
//                ResponseCode = 200;
//                ResponseSize = strReturn.Length * 8;
//            }
//            catch (MQException MQexp)
//            {
//                ResponseCode = 700;
//                ErrorMessage = MQexp.Message;
//                strReturn = _responseStr = ErrorMessage += "Exception: " + MQexp.Message + MQexp.StackTrace;
//                Success = false;
//            }
//            catch (Exception exp)
//            {
//                ResponseCode = 700;
//                ErrorMessage = exp.Message; 
//                strReturn = _responseStr = ErrorMessage += "Exception: " + exp.Message + exp.StackTrace;
//                Success = false;
//            }
//            return strReturn;
//        }

//        public override void GetResponse()
//        {
//            throw new NotImplementedException();
//        }

//        public override void PerformAssertion()
//        {
//            throw new NotImplementedException();
//        }
//        public override void Abort()
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
