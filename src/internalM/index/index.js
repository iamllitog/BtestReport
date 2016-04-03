/**
 * Created by litong on 16-1-4.
 */
/**
 * @require /externalM/boot/browser-polyfill.js
 * @require /externalM/boot/external-helpers.js
 * @require /externalM/avalon/avalon.shim.js
 * @require /internalM/index/index.scss
 * @require /externalM/bootstrap/css/bootstrap.css
 */
avalon.ready(function(){
	var reportCanvas = document.getElementById('reportCanvas');
	var fileChooser = document.getElementById('fileDialog');
	var bCanvas = document.getElementById("bCanvas");
	var bPic = document.getElementById('Bpic');

	var modal = avalon.define({
       $id : 'mean',

       username : '',
       gender : '男',
       age : 0,
       tel : '',
       addr : '',
       hepatobiliary : '',//肝胆
       gallbladder : '',//胆囊
       pancreas : '',//胰腺
       spleen : '',//脾脏
       kidney : '',//肾脏
       Btest : '',//B超诊断
       doctor : '',//诊断医生
       date : '',//诊断日期

       isCanvasShow : false,

       //显示canvas
       showCanvas : () =>{
	       	if(modal.username.trim() === ''){
	       		alert('姓名不能为空');
	       		return;
	       	}
	       	modal._initCanvas(() => {
	       		modal.isCanvasShow = true;
	       	});
			
       },
       //清空数据
       clearField : () => {
			modal.username = '';
	       	modal.gender = '';
	       	modal.tel = '';
	       	modal.age = 0;
	       	modal.addr = '';
	       	modal.hepatobiliary = '';
	        modal.gallbladder = '';
	        modal.pancreas = '';
	        modal.spleen = '';
	       	modal.kidney = '';
	       	modal.Btest = '';
	       	modal.doctor = '';
	       	modal.date = '';
	       	bPic.value = '';
       },
       //关闭canvas
       closeCanvas : () => {
       		modal.isCanvasShow = false;
       },
       //下载jpg
       downLoadJpg : () => {
	       	fileChooser.click();
       },
       //保存文件
       saveFile : (that) => {
       		if(that.value === ''){
       			return;
       		}
			var base64Data = reportCanvas.toDataURL("image/png").replace(/^data:image\/png;base64,/,"");
	       	var binaryData = new Buffer(base64Data, 'base64').toString('binary');
	       	require("fs").writeFile(that.value + '/' +modal.username + ".png", binaryData, "binary", function(err) {
			 if(err){
			 	alert(err);
			 }else{
			 	that.value = '';
			 	alert('导出图片成功');
			 	modal.isCanvasShow = false;
			 }
			});
       },
       $skipArray: ["_initCanvas"],
       //初始化画布
       _initCanvas : (callback) => {
       		return new Promise(function(resolve,reject){
       			if(bPic.value === ''){
       				var canvasH = 35 + 25*9 + modal.addr.length/34*23 + modal.hepatobiliary.length/34*23 + modal.gallbladder.length/34*23 + modal.pancreas.length/34*23 + modal.spleen.length/34*23 + modal.kidney.length/34*23 + modal.Btest.length/34*23;
       				resolve(['',canvasH]);
       				return;
       			}
	       		var bimg = new Image();
	       		bimg.onload = function(){
	       			bCanvas.width = bimg.width;
	       			bCanvas.height = bimg.height;
	       			var bCtx = bCanvas.getContext("2d");
	       			bCtx.drawImage(bimg, 0, 0);
	       			//设置画布高度
	       			var canvasH = 35 + bimg.height + 25*9 + modal.addr.length/34*23 + modal.hepatobiliary.length/34*23 + modal.gallbladder.length/34*23 + modal.pancreas.length/34*23 + modal.spleen.length/34*23 + modal.kidney.length/34*23 + modal.Btest.length/34*23;
	       			resolve([`<img style="margin:5px auto;" src="${bCanvas.toDataURL()}" />`,canvasH]);
	       		};
				bimg.src = bPic.value;
       		}).then(function([imgELe,canvasH]){
       			console.log(canvasH);
       			if(reportCanvas.height < canvasH)
       				reportCanvas.height = canvasH;

       			var ctx = reportCanvas.getContext("2d");
				var data = `
					<svg xmlns="http://www.w3.org/2000/svg" width="${reportCanvas.width}" height="${reportCanvas.height}">
					
		           		<foreignObject width="100%" height="100%">
			           		<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:15px;padding:0;background:#FFF;width:100%;height:100%;text-align:center;">
			           			<h2 style='padding-top:8px;margin:0;font-size:20px;'>
			           				桃源街卫生服务中心
			           			</h2>
			           			${imgELe}
			           			<p style='padding-left:15px;padding-top:8px;margin:0;text-align:left;'>
			           				<span style='padding:0;margin:0;display:inline-block;width:24%;'>姓名 : ${modal.username}</span>
			           				<span style='padding:0;margin:0;display:inline-block;width:20%;'>性别 : ${modal.gender}</span>
			           				<span style='padding:0;margin:0;display:inline-block;width:24.5%;'>年龄 : ${modal.age <= 0?'未填':modal.age}</span>
			           				<span style='padding:0;margin:0;display:inline-block;width:24.5%;'>电话 : ${modal.tel.trim() === ''?'未填':modal.tel.trim()}</span>
			           			</p>
			           			<p style='padding-left:15px;padding-top:8px;margin:0;text-align:left;'>
			           				住址 : ${modal.addr.trim() === ''?'未填':modal.addr.trim()}
			           			</p>
			           			<p style='padding-left:15px;padding-top:8px;margin:0;line-height:20px;width:100%;text-align:left;'>
			           				<span style='padding:0;margin:0;display:inline-block;vertical-align: top;'>肝胆 : </span>
			           				<span style='padding:0;margin:0;display:inline-block;width:85%;'>${modal.hepatobiliary.trim() === ''?'未填':modal.hepatobiliary.trim()}</span>
			           			</p>
			           			<p style='padding-left:15px;padding-top:8px;margin:0;line-height:20px;width:100%;text-align:left;'>
			           				<span style='padding:0;margin:0;display:inline-block;vertical-align: top;'>胆囊 : </span>
			           				<span style='padding:0;margin:0;display:inline-block;width:85%;'>${modal.gallbladder.trim() === ''?'未填':modal.gallbladder.trim()}</span>
			           			</p>
			           			<p style='padding-left:15px;padding-top:8px;margin:0;line-height:20px;width:100%;text-align:left;'>
			           				<span style='padding:0;margin:0;display:inline-block;vertical-align: top;'>胰腺 : </span>
			           				<span style='padding:0;margin:0;display:inline-block;width:85%;'>${modal.pancreas.trim() === ''?'未填':modal.pancreas.trim()}</span>
			           			</p>
			           			<p style='padding-left:15px;padding-top:8px;margin:0;line-height:20px;width:100%;text-align:left;'>
			           				<span style='padding:0;margin:0;display:inline-block;vertical-align: top;'>脾脏 : </span>
			           				<span style='padding:0;margin:0;display:inline-block;width:85%;'>${modal.spleen.trim() === ''?'未填':modal.spleen.trim()}</span>
			           			</p>
			           			<p style='padding-left:15px;padding-top:8px;margin:0;line-height:20px;width:100%;text-align:left;'>
			           				<span style='padding:0;margin:0;display:inline-block;vertical-align: top;'>肾脏 : </span>
			           				<span style='padding:0;margin:0;display:inline-block;width:85%;'>${modal.kidney.trim() === ''?'未填':modal.kidney.trim()}</span>
			           			</p>
			           			<p style='padding-left:15px;padding-top:8px;margin:0;line-height:20px;width:100%;text-align:left;'>
			           				<span style='padding:0;margin:0;display:inline-block;vertical-align: top;'>B超诊断 : </span>
			           				<span style='padding:0;margin:0;display:inline-block;width:80%;'>${modal.Btest.trim() === ''?'未填':modal.Btest.trim()}</span>
			           			</p>
			           			<p style='padding-left:15px;padding-top:8px;margin:0;padding-left:35%;;text-align:left;'>
			           				<span style='padding:0;margin:0;display:inline-block;width:40%;'>诊断医生 : ${modal.doctor.trim() === ''?'未填':modal.doctor.trim()}</span>
			           				<span style='padding:0;margin:0;display:inline-block;width:40%;'>日期 : ${modal.date.trim() === ''?'未填':modal.date.trim()}</span>
			           			</p>
			             	</div>
		           		</foreignObject>
	           		</svg>
	           	`;
	           	var DOMURL = window.URL || window.webkitURL || window;

				var img = new Image();
				var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
				var url = DOMURL.createObjectURL(svg);

				img.onload = function () {
				  ctx.drawImage(img, 0, 0);
				  DOMURL.revokeObjectURL(url);
				  callback();
				};
				img.src = url;
       		});
       }

   	});

    avalon.scan();
});