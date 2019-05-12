var http = require("http"),fs = require("fs"),querystring = ("querystring"),url = require("url"),path = require("path");
//创建服务
var server = http.createServer();

// 监听服务
server.on("request",function(req,res){
if(req.url !== "/favicon.ico"){
	var urlObj = url.parse(req.url,true);
	var  pathname = urlObj.pathname;
	// console.log(query);
	if( pathname=="/" && req.method== "GET") {
			setHeader(".html")//封装一个请求头
			res.end("请进入wwk文件目录")
			return;
			
	}
	if( pathname=="/wwk" && req.method== "GET") {
		//判断是否为文件目录
		if (isFolder("./wwk")) {
			//封装一个如果是文件夹展示内容
			 showFolder("./wwk")
		} else {
			
		}			
	}
	else if( pathname == "/ha" && req.method == "GET"){
		var query = urlObj.query;
		var hash = query.hash;
		// console.log(hash)
		if (hash == "html") {
			res.end("html")
		} else if(hash == "css") {
			res.end("css")
		}else if(hash == "js") {
			res.end("js")
		}
		
	}


	//请求图片
	else if(pathname == "/wwk/img/files.jpg" && req.method == "GET"){
			fs.readFile("./wwk/img/files.jpg",function(err,data){
				resHead(".jpg");
				res.end(data);
			})		
		}else if(pathname == "/wwk/img/css.jpg" && req.method == "GET"){
			fs.readFile("./wwk/img/css.jpg",function(err,data){
				resHead(".jpg");
				res.end(data);
			})		
		}else if(pathname == "/wwk/img/html.jpg" && req.method == "GET"){
			fs.readFile("./wwk/img/html.jpg",function(err,data){
				resHead(".jpg");
				res.end(data);
			})		
		}else if(pathname == "/wwk/img/js.jpg" && req.method == "GET"){
			fs.readFile("./wwk/img/js.jpg",function(err,data){
				resHead(".jpg");
				res.end(data);
			})		
		}else if(pathname == "/wwk/img/json.jpg" && req.method == "GET"){
			fs.readFile("./wwk/img/json.jpg",function(err,data){
				resHead(".jpg");
				res.end(data);
			})		
		}else if(pathname == "/wwk/img/txt.jpg" && req.method == "GET"){
			fs.readFile("./wwk/img/txt.jpg",function(err,data){
				resHead(".jpg");
				res.end(data);
			})		
		}else if(pathname == "/wwk/img/jpg.jpg" && req.method == "GET"){
			fs.readFile("./wwk/img/jpj.jpg",function(err,data){
				resHead(".jpg");
				res.end(data);
			})		
		}else if(pathname == "/wwk/img/png.jpg" && req.method == "GET"){
			fs.readFile("./wwk/img/png.jpg",function(err,data){
				resHead(".jpg");
				res.end(data);
			})		
		}
		fs.readFile("." + pathname,function(err,data){
			fs.stat("." + pathname,function(err,stats){
				if(err){
					console.log(err);
					setHeader(".html");
					res.end("没有文件");
					return;
				}
				if(stats.isDirectory()){
					showFolder("." + pathname)
				}else{
					var mine = fileType(pathname);
					setHeader(mine);
					res.end(data)
				}
			})
		});	
	//判断是否为文件夹
	function isFolder(isfd){
		//获取文件信息
		var stats = fs.statSync(isfd);
		//返回判断是否为文件夹
		var falg = stats.isDirectory();
		return falg;
	}
	//如果是文件夹,获取文件目录
	function showFolder(sf){
		var str = "";
		fs.readdir(sf,function(err,files){
			if(files.length){	//有文件
				//读取html
				var htmldata = fs.readFileSync("./data/shouye2.html","utf8")
				// console.log(files)
				// console.log(htmldata);
				//搭建目录索引页面的样式,把内容用字符串拼接放到到html文件中
				str += htmldata; 
				for(var i = 0; i<files.length; i++){
					var extname = fileType(files[i]);
					//封装一个页面渲染的函数
					str += setHtml(extname,files[i],req.url)
				}
				str += `
						</div>
						<script>
							function fun(a,b){
								window.location.href = a + "/" + b;
							}
						</script>
						</body></html>`;
				setHeader(".html");
				res.end(str);
			}else {
				setHeader(".html");
				str +="没有更多内容";
				res.end(str);
			}
		})
	}
	//获取文件后缀名
	function fileType(ft){
		var extn = path.extname(ft)
		return extn;
	}
	//页面渲染
	function setHtml(ename, fname,uname){
		// console.log(ename);
		var ename = ename.slice(1)//.后面的字符串
		// console.log("ename="+ename);
		// console.log("fname="+fname);
		// console.log("uname="+uname);
		if (ename == ""){
			return`
				<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/files.jpg" alt="">
					<span>${fname}</span>
				</div>`
		}else if(ename == "html") {
			return`
				<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/${ename}.jpg" alt="">
					<span>${fname}</span>
				</div>`
		}else if(ename == "css") {
			return`
				<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/${ename}.jpg" alt="">
					<span>${fname}</span>
				</div>`
		}else if(ename == "js") {
			return`
				<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/${ename}.jpg" alt="">
					<span>${fname}</span>
				</div>`
		}else if(ename == "less") {
			return`
				<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/${ename}.jpg" alt="">
					<span>${fname}</span>
				</div>`
		}else if(ename == "json") {
			return`
				<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/${ename}.jpg" alt="">
					<span>${fname}</span>
				</div>`
		}else if(ename == "jpg") {
			return`
				<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/${ename}.jpg" alt="">
					<span>${fname}</span>
				</div>`
		}else if(ename == "png") {
			return`
				<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/${ename}.jpg" alt="">
					<span>${fname}</span>
				</div>`
		}else if(ename == "txt") {
			return`
				<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/${ename}.jpg" alt="">
					<span>${fname}</span>
				</div>`
		}else {
			return `<div class="box" onclick=fun('${uname}','${fname}')>
					<img src="/data/img/nofound.jpg" alt="">
					<span>不支持这种格式</span>
				</div>`
		}
	}
	// 如果不是文件夹
	//展示内容
	function showfile(showf){
		fs.readFile(showf,"utf8",function(err,data){
			//封装一个获取文件后缀名
			var fliextname = fileType(showf)
			setHeader(fliextname);
			res.end(data);
		})
	}
	
	

	//设置请求头
	function setHeader(set){
		if ( set == ""){
			return res.writeHead(200,{"Content-Type":"image/jpg"});
		}else if (set == ".html") {
			return res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		}else if (set == ".css") {
			return res.writeHead(200,{"Content-Type":"text/css; charset=utf-8"})
		}else if (set == ".js") {
			return res.writeHead(200,{"Content-Type":"text/javascript; charset=utf-8"})
		}else if (set == ".json") {
			return res.writeHead(200,{"Content-Type":"text/json; charset=utf-8"})
		}else if (set == ".less") {
			return res.writeHead(200,{"Content-Type":"text/less; charset=utf-8"})
		}else if(set == ".txt"){
			return res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
		}else if(set == ".png"){
			return res.writeHead(200, {"Content-Type": "image/png"});
		}else if(set == ".jpg"){
			return res.writeHead(200, {"Content-Type": "image/jpg"});
		}else if(set == ".jpeg"){
			return res.writeHead(200, {"Content-Type": "image/jpg"});
		}else if(set == ".gif"){
			return res.writeHead(200, {"Content-Type": "image/gif"});
		}
	}
}
});


server.listen(8585);
console.log(`\n  您的super至尊皇家无敌炫酷专用服务器已在 8585 端口启动
			\n						    --1234Wu`)
