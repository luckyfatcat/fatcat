/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAI4FkS9rND45wa5uh7rwJ9'
const secretAccessKey = '4hzTjA9ky4ughQWcFRhAF7knYVfb5J'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey});
let sendMsg = function (PhoneNumbers,content,callback) {
    var defaultCallback = function(){
        console.log("hi")
    };
    //发送短信
    PhoneNumbers = PhoneNumbers || "15102890170";
    content = content || "你好啊";
    callback = callback || defaultCallback;
    smsClient.sendSMS({
        PhoneNumbers: PhoneNumbers,//必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为：国际区号+号码，如“85200000000”
        SignName: '肥肥星猫',//必填:短信签名-可在短信控制台中找到
        TemplateCode: 'SMS_186965800',//必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
        TemplateParam: '{"code":"12345"}'//可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res);
            callback();
        }
    }, function (err) {
        console.log(err)
    })    
}
module.exports = {
    sendMsg: sendMsg
}
