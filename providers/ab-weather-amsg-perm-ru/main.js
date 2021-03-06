﻿/**
Авиационная метеорологическая
станция гражданская
+7 (342) 2-949-566, usppmeteo@mail.ru
http://amsg.perm.ru/
*/

var g_headers = {
'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
'Accept-Charset':'windows-1251,utf-8;q=0.7,*;q=0.3',
'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
'Connection':'keep-alive',
'User-Agent':'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.187 Mobile Safari/534.11+'
};

function main(){
    var baseurl = "http://amsg.perm.ru/?tmpl=pogoda";

    AnyBalance.setDefaultCharset('utf-8'); 

    var html = AnyBalance.requestPost(baseurl, {
    }, addHeaders({Referer: baseurl})); 

    var result = {success: true};
		getParam(html, result, 'temperature_text', /Температура: <\/span>([^&\s]*)/, replaceTagsAndSpaces, parseBalance);
		getParam(html, result, 'temperature_num', /Температура: <\/span>([^&\s]*)/, replaceTagsAndSpaces, parseBalance);
		getParam(html, result, 'pressure', /Давление: <\/span>([^&\s]*)/, replaceTagsAndSpaces, parseBalance);
		getParam(html, result, 'humidity', /Влажность: <\/span>([^&\s]*)/, replaceTagsAndSpaces, parseBalance);

    result['temperature_text']=Math.round(result['temperature_text']);
    //result['temperature_text']=result['temperature_text'].toFixed(1);

		if (result['temperature_text']>=0){
			result['temperature_text']='+'+result['temperature_text'];
		};
    result['pressure']=Math.round(result['pressure']);
    result['humidity']=Math.round(result['humidity']);
		

    //Возвращаем результат
    AnyBalance.setResult(result);
}
