!function($){function log(){$.fn.ajaxSubmit.debug&&window.console&&window.console.log&&window.console.log("[jquery.form] "+Array.prototype.join.call(arguments,""))}$.fn.ajaxSubmit=function(options){function fileUpload(){function cb(){if(!cbInvoked++){io.detachEvent?io.detachEvent("onload",cb):io.removeEventListener("load",cb,!1);var operaHack=0,ok=!0;try{if(timedOut)throw"timeout";var data,doc;if(doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document,null==doc.body&&!operaHack&&$.browser.opera)return operaHack=1,cbInvoked--,void setTimeout(cb,100);if(xhr.responseText=doc.body?doc.body.innerHTML:null,xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc,xhr.getResponseHeader=function(header){var headers={"content-type":opts.dataType};return headers[header]},"json"==opts.dataType||"script"==opts.dataType){var ta=doc.getElementsByTagName("textarea")[0];xhr.responseText=ta?ta.value:xhr.responseText}else"xml"!=opts.dataType||xhr.responseXML||null==xhr.responseText||(xhr.responseXML=toXml(xhr.responseText));data=$.httpData(xhr,opts.dataType)}catch(e){ok=!1,$.handleError(opts,xhr,"error",e)}ok&&(opts.success(data,"success"),g&&$.event.trigger("ajaxSuccess",[xhr,opts])),g&&$.event.trigger("ajaxComplete",[xhr,opts]),g&&!--$.active&&$.event.trigger("ajaxStop"),opts.complete&&opts.complete(xhr,ok?"success":"error"),setTimeout(function(){$io.remove(),xhr.responseXML=null},100)}}function toXml(s,doc){return window.ActiveXObject?(doc=new ActiveXObject("Microsoft.XMLDOM"),doc.async="false",doc.loadXML(s)):doc=(new DOMParser).parseFromString(s,"text/xml"),doc&&doc.documentElement&&"parsererror"!=doc.documentElement.tagName?doc:null}var form=$form[0];if($(":input[@name=submit]",form).length)return void alert('Error: Form elements must not be named "submit".');var opts=$.extend({},$.ajaxSettings,options),s=jQuery.extend(!0,{},$.extend(!0,{},$.ajaxSettings),opts),id="jqFormIO"+(new Date).getTime(),$io=$('<iframe id="'+id+'" name="'+id+'" />'),io=$io[0];($.browser.msie||$.browser.opera)&&(io.src='javascript:false;document.write("");'),$io.css({position:"absolute",top:"-1000px",left:"-1000px"});var xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1,$io.attr("src","about:blank")}},g=opts.global;if(g&&!$.active++&&$.event.trigger("ajaxStart"),g&&$.event.trigger("ajaxSend",[xhr,opts]),s.beforeSend&&s.beforeSend(xhr,s)===!1)return void(s.global&&jQuery.active--);if(!xhr.aborted){var cbInvoked=0,timedOut=0,sub=form.clk;if(sub){var n=sub.name;n&&!sub.disabled&&(options.extraData=options.extraData||{},options.extraData[n]=sub.value,"image"==sub.type&&(options.extraData[name+".x"]=form.clk_x,options.extraData[name+".y"]=form.clk_y))}setTimeout(function(){var t=$form.attr("target"),a=$form.attr("action");$form.attr({target:id,method:"POST",action:opts.url}),options.skipEncodingOverride||$form.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),opts.timeout&&setTimeout(function(){timedOut=!0,cb()},opts.timeout);var extraInputs=[];try{if(options.extraData)for(var n in options.extraData)extraInputs.push($('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />').appendTo(form)[0]);$io.appendTo("body"),io.attachEvent?io.attachEvent("onload",cb):io.addEventListener("load",cb,!1),form.submit()}finally{$form.attr("action",a),t?$form.attr("target",t):$form.removeAttr("target"),$(extraInputs).remove()}},10)}}if(!this.length)return log("ajaxSubmit: skipping submit process - no element selected"),this;"function"==typeof options&&(options={success:options}),options=$.extend({url:this.attr("action")||window.location.toString(),type:this.attr("method")||"GET"},options||{});var veto={};if(this.trigger("form-pre-serialize",[this,options,veto]),veto.veto)return log("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(options.beforeSerialize&&options.beforeSerialize(this,options)===!1)return log("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var a=this.formToArray(options.semantic);if(options.data){options.extraData=options.data;for(var n in options.data)if(options.data[n]instanceof Array)for(var k in options.data[n])a.push({name:n,value:options.data[n][k]});else a.push({name:n,value:options.data[n]})}if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===!1)return log("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[a,this,options,veto]),veto.veto)return log("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var q=$.param(a);"GET"==options.type.toUpperCase()?(options.url+=(options.url.indexOf("?")>=0?"&":"?")+q,options.data=null):options.data=q;var $form=this,callbacks=[];if(options.resetForm&&callbacks.push(function(){$form.resetForm()}),options.clearForm&&callbacks.push(function(){$form.clearForm()}),!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){$(options.target).html(data).each(oldSuccess,arguments)})}else options.success&&callbacks.push(options.success);options.success=function(data,status){for(var i=0,max=callbacks.length;max>i;i++)callbacks[i].apply(options,[data,status,$form])};for(var files=$("input:file",this).fieldValue(),found=!1,j=0;j<files.length;j++)files[j]&&(found=!0);return options.iframe||found?$.browser.safari&&options.closeKeepAlive?$.get(options.closeKeepAlive,fileUpload):fileUpload():$.ajax(options),this.trigger("form-submit-notify",[this,options]),this},$.fn.ajaxForm=function(options){return this.ajaxFormUnbind().bind("submit.form-plugin",function(){return $(this).ajaxSubmit(options),!1}).each(function(){$(":submit,input:image",this).bind("click.form-plugin",function(e){var form=this.form;if(form.clk=this,"image"==this.type)if(void 0!=e.offsetX)form.clk_x=e.offsetX,form.clk_y=e.offsetY;else if("function"==typeof $.fn.offset){var offset=$(this).offset();form.clk_x=e.pageX-offset.left,form.clk_y=e.pageY-offset.top}else form.clk_x=e.pageX-this.offsetLeft,form.clk_y=e.pageY-this.offsetTop;setTimeout(function(){form.clk=form.clk_x=form.clk_y=null},10)})})},$.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin"),this.each(function(){$(":submit,input:image",this).unbind("click.form-plugin")})},$.fn.formToArray=function(semantic){var a=[];if(0==this.length)return a;var form=this[0],els=semantic?form.getElementsByTagName("*"):form.elements;if(!els)return a;for(var i=0,max=els.length;max>i;i++){var el=els[i],n=el.name;if(n)if(semantic&&form.clk&&"image"==el.type)el.disabled||form.clk!=el||a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});else{var v=$.fieldValue(el,!0);if(v&&v.constructor==Array)for(var j=0,jmax=v.length;jmax>j;j++)a.push({name:n,value:v[j]});else null!==v&&"undefined"!=typeof v&&a.push({name:n,value:v})}}if(!semantic&&form.clk)for(var inputs=form.getElementsByTagName("input"),i=0,max=inputs.length;max>i;i++){var input=inputs[i],n=input.name;n&&!input.disabled&&"image"==input.type&&form.clk==input&&a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y})}return a},$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic))},$.fn.fieldSerialize=function(successful){var a=[];return this.each(function(){var n=this.name;if(n){var v=$.fieldValue(this,successful);if(v&&v.constructor==Array)for(var i=0,max=v.length;max>i;i++)a.push({name:n,value:v[i]});else null!==v&&"undefined"!=typeof v&&a.push({name:this.name,value:v})}}),$.param(a)},$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;max>i;i++){var el=this[i],v=$.fieldValue(el,successful);null===v||"undefined"==typeof v||v.constructor==Array&&!v.length||(v.constructor==Array?$.merge(val,v):val.push(v))}return val},$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if("undefined"==typeof successful&&(successful=!0),successful&&(!n||el.disabled||"reset"==t||"button"==t||("checkbox"==t||"radio"==t)&&!el.checked||("submit"==t||"image"==t)&&el.form&&el.form.clk!=el||"select"==tag&&-1==el.selectedIndex))return null;if("select"==tag){var index=el.selectedIndex;if(0>index)return null;for(var a=[],ops=el.options,one="select-one"==t,max=one?index+1:ops.length,i=one?index:0;max>i;i++){var op=ops[i];if(op.selected){var v=$.browser.msie&&!op.attributes.value.specified?op.text:op.value;if(one)return v;a.push(v)}}return a}return el.value},$.fn.clearForm=function(){return this.each(function(){$("input,select,textarea",this).clearFields()})},$.fn.clearFields=$.fn.clearInputs=function(){return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();"text"==t||"password"==t||"textarea"==tag?this.value="":"checkbox"==t||"radio"==t?this.checked=!1:"select"==tag&&(this.selectedIndex=-1)})},$.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},$.fn.enable=function(b){return void 0==b&&(b=!0),this.each(function(){this.disabled=!b})},$.fn.selected=function(select){return void 0==select&&(select=!0),this.each(function(){var t=this.type;if("checkbox"==t||"radio"==t)this.checked=select;else if("option"==this.tagName.toLowerCase()){var $sel=$(this).parent("select");select&&$sel[0]&&"select-one"==$sel[0].type&&$sel.find("option").selected(!1),this.selected=select}})}}(jQuery);