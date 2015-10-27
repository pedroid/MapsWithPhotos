        
        
var request;
var progressBar;
var flag_loading;
function loadImage(img_id, imageURI)
{	
	try{
	//console.log('URI:'+imageURI);
	request = new XMLHttpRequest();
	request.onloadstart = showProgressBar;
	request.onprogress = updateProgressBar;
	request.onload = showImage_url(img_id, imageURI);	
	request.onloadend = hideProgressBar;
	request.open("GET", imageURI, true);
	request.overrideMimeType('text/plain; charset=x-user-defined'); 
	request.send(null);	
	}catch(err){
		//alert('no!');
		request.onload = showImage_url(img_id, imageURI);	
		console.log('the image could not be loaded via XMLHttpRequest.')
		console.log('the image will be loaded via local storage.')
		flag_loading = false;		
	}
	return true;
}

function showProgressBar()
{
	progressBar = document.createElement("progress");
	progressBar.value = 0;
	progressBar.max = 100;
	progressBar.removeAttribute("value");
	//document.body.appendChild(progressBar);
}

function updateProgressBar(e)
{	
	if (e.lengthComputable)
		progressBar.value = e.loaded / e.total * 100;
	else
		progressBar.removeAttribute("value");
	//console.log(progressBar.value);
	document.getElementById('loading_progress').innerHTML = 'image loading progress: ' + progressBar.value + ' (%).';
}

function showImage_url(img_id, imageURI) //URL
{	
	flag_loading = true;
	//console.log(imageURI);
	img_id.src = imageURI;	
	//document.body.appendChild(imageElement);
}
function showImage() //Data URI
{
	var imageElement = document.createElement("img");
	imageElement.src = "data:image/jpeg;base64," + base64Encode(request.responseText);
	//console.log(imageElement.src);
	document.body.appendChild(imageElement);
}

function hideProgressBar()
{
	flag_loading = false;
	//track_en = true;
		
	//document.body.removeChild(progressBar);
}

// This encoding function is from Philippe Tenenhaus's example at http://www.philten.com/us-xmlhttprequest-image/
function base64Encode(inputStr) 
{
   var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
   var outputStr = "";
   var i = 0;
   
   while (i < inputStr.length)
   {
	   //all three "& 0xff" added below are there to fix a known bug 
	   //with bytes returned by xhr.responseText
	   var byte1 = inputStr.charCodeAt(i++) & 0xff;
	   var byte2 = inputStr.charCodeAt(i++) & 0xff;
	   var byte3 = inputStr.charCodeAt(i++) & 0xff;

	   var enc1 = byte1 >> 2;
	   var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
	   
	   var enc3, enc4;
	   if (isNaN(byte2))
	   {
		   enc3 = enc4 = 64;
	   }
	   else
	   {
		   enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
		   if (isNaN(byte3))
		   {
			   enc4 = 64;
		   }
		   else
		   {
			   enc4 = byte3 & 63;
		   }
	   }

	   outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
	} 
   
	return outputStr;
}
            
        