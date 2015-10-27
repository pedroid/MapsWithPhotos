var size_itrimap_height;
var size_itrimap_width;
var size_canvas_width ;//= size_itrimap_width;
var size_canvas_height ;//= size_itrimap_height;
var image_hold_flag = 0;
var month_set;
window.onload = function(){
	sys_inf = document.getElementById('info');
	img_itrimap = document.getElementById('ITRImap_img');
	size_itrimap_width = img_itrimap.clientWidth;
	size_itrimap_height = img_itrimap.clientHeight;  
	
	size_canvas_width = size_itrimap_width;
	size_canvas_height = size_itrimap_height;
	var x_initial = 208;
	var y_initial = 73;
	var x_target = x_initial;
	var y_target = y_initial;
	
	
	var canvas_layer_marker = document.getElementById('marker_canvas');
	var canvas = document.getElementById('canvas');
	canvas.width = size_canvas_width;
	canvas.height = size_canvas_height;
	if(canvas.width == 0){canvas.width = 500};
	if(canvas.height == 0){canvas.height = 295};
	canvas_layer_marker.width = canvas.width;
	canvas_layer_marker.height = canvas.height;
	var canvas_marker_layer = canvas_layer_marker.getContext('2d');
	var c = canvas.getContext('2d');
	c.clear = function() {this.clearRect(0,0,img_itrimap.clientWidth,img_itrimap.clientHeight);};
	
	marker_div_id = document.getElementById('marker_div');
	
	var dx = 0, dy = 0, mousex = 0, mousey=0, mouseclicks = 0;
	var image_index = 0;
	flag_show_ptr = 1;//default: do show
	var readmore_about = false;
	
	var jogging_trajectory_map1 = {0:[12,45],1:[9.6,62], 2:[12, 78], 3:[21,78], 4:[21,69], 5:[93, 69], 6:[93,57], 7:[84,57], 8:[84, 69], 9:[70,69], 10:[70,35], 11:[59,45], 12:[12,45]};
	var jogging_trajectory_map2 = {0:[24,15],1:[17,21], 2:[12, 28], 3:[17,35], 4:[21,30], 5:[80, 85], 6:[84,77], 7:[74,70], 8:[70, 74], 9:[60,65], 10:[70,49], 11:[58,46], 12:[24,15]};
	var jogging_trajectory = jogging_trajectory_map1;
	
	print_index_on_map(flag_show_ptr);
	
	document.onkeydown = function(e) {
		var key = e.keyCode;
		//key code
		//http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_key_keycode2
		/*
		if (key == 37 | key == 74) {//L
			if(track_en){
				track_en = false;
				dx=0;dy=0;
			}
			else {
				x_target = man_position_x -2;
				dx = -1;			
			}
		} //left
		else if (key == 38 | key == 73) {			
			if(track_en){
				track_en = false;
				dx = 0;dy=0;
			}			
			else {
				dy=-1;
				y_target = man_position_y -2;
			}
		}  //up
		else if (key == 39 | key == 76) {
			if(track_en){
				track_en = false;
				dx = 0;
				dy = 0;
			}
			else {
				dx=1;
				x_target = man_position_x + 2;
			}
		} //right 76:L
		else if (key == 40 | key == 75) {
			if(track_en){
				track_en = false;
				dx = 0;
				dy = 0;
			}
			else {
				dy=1;
				y_target = man_position_y + 2;
			}
		}  //down	
		*/
		if(key==84) {//t
			track_en=!track_en;
			//console.log(jogging_trajectory_map1[0][0]);
			x_target = man_position_x;
			y_target = man_position_y;
		}
		else if (key==65) {
			readmore_about = !readmore_about; //A for readmore_about
				if(readmore_about){
					$('#readmore_note').fadeOut(800);
				}else{
					$('#readmore_note').fadeIn(800);
					//do nothing
				}
		}
		
		else if ( key == 83) { //show ptr of picture or not
			console.log('S');
			
			if(flag_show_ptr){
				document.getElementById('marker_div').style.display='none';
				flag_show_ptr = 0;
				print_index_on_map(flag_show_ptr);
			}else {
				document.getElementById('marker_div').style.display='inline';
				flag_show_ptr = 1;
				print_index_on_map(flag_show_ptr);
			}
		}
		else if ( key == 9) {		//Tab- change map
			//console.log('Tab');
			image_index = image_index + 1; //s
			//if(image_index == number_imgs) image_index = 0;
			switch(image_index){
				case 0://default
					//console.log("case 0");
					x_set = get_img_x("map1");
					y_set = get_img_y("map1");
					jogging_trajectory = jogging_trajectory_map1;
					break;
				case 1: 
					//console.log("case 1");
					x_set = get_img_x("map2");
					y_set = get_img_y("map2");
					//img_itrimap.src = "map2.PNG";
					var file_path = "map/map2.PNG";				
					loadImage(img_itrimap, file_path);
					
					canvas.height = 339;//img_itrimap.clientHeight;
					jogging_trajectory = jogging_trajectory_map2;
					break;
				case 2:
					//console.log("case 2");
					image_index = 0;
					x_set = get_img_x("map1");
					y_set = get_img_y("map1");
					img_itrimap.src = "map/map1.PNG";
					canvas.height = 295;//img_itrimap.clientHeight;
					jogging_trajectory = jogging_trajectory_map1;
					break;
			}
			print_index_on_map(flag_show_ptr);
			//console.log(image_index);
			//console.log(x_set);
		}
		else return true; 
		return false;
	};
	
	document.getElementById("t_button_id").addEventListener('mousedown', function(e){
		console.log('test');
		track_en=!track_en;
		x_target = man_position_x;
		y_target = man_position_y;		
	})
	
	document.getElementById("t_button_id").addEventListener('mouseup', function(e){
		console.log('test2');
		dx = 0; dy = 0;
	})
	
	document.getElementById("i_button_id").addEventListener('mousedown', function(e){ //I
		if(track_en){
			track_en = false;
			dx = 0;dy=0;
		}			
		else dy=-1;
	})
	
	document.getElementById("i_button_id").addEventListener('mouseup', function(e){
		dy = 0;
	})
	
	document.getElementById("j_button_id").addEventListener('mousedown', function(e){ //J
		if(track_en){
			track_en = false;
			dx = 0;dy=0;
		}			
		else dx=-1;
	})
	
	document.getElementById("j_button_id").addEventListener('mouseup', function(e){
		dx = 0;
	})
	
	document.getElementById("k_button_id").addEventListener('mousedown', function(e){ //K
		if(track_en){
			track_en = false;
			dx = 0;dy=0;
		}			
		else dy=1;
	})
	
	document.getElementById("k_button_id").addEventListener('mouseup', function(e){
		dy = 0;
	})
	
	document.getElementById("l_button_id").addEventListener('mousedown', function(e){ //L
		if(track_en){
			track_en = false;
			dx = 0;dy=0;
		}			
		else dx=1;
	})
	
	document.getElementById("l_button_id").addEventListener('mouseup', function(e){
		dx = 0;
	})	
	
	document.getElementById("a_button_id").addEventListener('mousedown', function(e){ //A
		readmore_about = !readmore_about;
	})
	
	document.getElementById("s_button_id").addEventListener('mousedown', function(e){
		
        if(flag_show_ptr){
			document.getElementById('marker_div').style.display='none';
			flag_show_ptr = 0;
		}else {
			document.getElementById('marker_div').style.display='inline';
			flag_show_ptr = 1;
		}
	})
    
    document.getElementById("ITRImap").addEventListener('mousedown', function(e){    
		if(track_en){
			track_en = false;
			x_target = man_position_x;
			y_target = man_position_y;
		}else{
			x_target = e.clientX;
			y_target = e.clientY;            
		}
	})

	
	document.getElementById("tab_button_id").addEventListener('mousedown', function(e){          
			image_index = image_index + 1; //s
			//if(image_index == number_imgs) image_index = 0;
			switch(image_index){
				case 0://default
					//console.log("case 0");
					x_set = get_img_x("map1");
					y_set = get_img_y("map1");
					jogging_trajectory = jogging_trajectory_map1;
					break;
				case 1: 
					//console.log("case 1");
					x_set = get_img_x("map2");
					y_set = get_img_y("map2");
					//img_itrimap.src = "map2.PNG";
					var file_path = "map/map2.PNG";				
					loadImage(img_itrimap, file_path);
					
					canvas.height = 339;//img_itrimap.clientHeight;
					jogging_trajectory = jogging_trajectory_map2;
					break;
				case 2:
					//console.log("case 2");
					image_index = 0;
					x_set = get_img_x("map1");
					y_set = get_img_y("map1");
					img_itrimap.src = "map/map1.PNG";
					canvas.height = 295;//img_itrimap.clientHeight;
					jogging_trajectory = jogging_trajectory_map1;
					break;
			}
			print_index_on_map(flag_show_ptr);
	})
	

	
	Num_points_in_track = Object.keys(jogging_trajectory).length;
	
	var track_en=false;
	var track="jogging";

	document.onkeyup = function(e) {
		var key = e.keyCode; 
		//dx=0;
		//dy=0;
		
		
		if (key == 37 || key == 39 || key == 74 || key == 76 ) dx=0; //L, R
		else if (key == 38 || key == 40 || key == 73 || key == 75 ) dy=0; //U/D
		else if (key == 84) { dx = 0; dy = 0;}//t
		
		
		return false;
	};



	
	canvas.onmousemove = function(e) {
		var rect = canvas.getBoundingClientRect(); mousex = e.clientX - rect.left; mousey = e.clientY - rect.top;
	};
	canvas.onmousedown = function(e) {mouseclicks++;};
  
	var man_position_x = x_initial; 
	var man_position_y = y_initial;
	var radius = 5;

	c.beginPath();
	c.arc(man_position_x, man_position_y, radius, 0, 2 * Math.PI, false);
	c.fillstyle = 'black';
	c.fill();


    

	var ratio_man_position_x;
	var ratio_man_position_y;
	//image event
	var iTarget = 0;
	a = new Image();
	//var counter = 0;
	repeat(function(){		
		//console.log(dx);
		//console.log(counter);
		//counter = counter + 1;
		//console.log("1:" + man_position_y);
		c.clear();	
		//console.log("2:" + man_position_y);
		//console.log(x_target);
		man_position_x = man_position_x + dx;
		man_position_y = man_position_y + dy;	
		//console.log("3:" + man_position_y);
		//boundary condition		
			if(man_position_x<1) man_position_x = 1;
			if(man_position_y<1) man_position_y = 1;		
			if(man_position_x>img_itrimap.clientWidth) man_position_x = img_itrimap.clientWidth;
			if(man_position_y>img_itrimap.clientHeight) man_position_y = img_itrimap.clientHeight;				
		//end of boundary condition

		
		
		//畫圓代表當下的位置
		c.beginPath();
		c.arc(man_position_x, man_position_y, radius, 0, 2 * Math.PI, false);
		c.fillstyle = 'black';
		c.fill();		
		
		var thePositionIcon = document.getElementById('thePositionIcon');	
		//console.log(thePositionIcon);
					
		thePositionIcon.style.position = "absolute";		
		var bias_x = -10;
		var bias_y = -49;
		thePositionIcon.style.top = man_position_y + bias_y + 'px';		
		thePositionIcon.style.left = man_position_x + bias_x + 'px';
		if(navigator.userAgent.match("Chrome")){
			if(dx>0) thePositionIcon.style.WebkitTransform  = 'scaleX(1)';				
			else if (dx<0) thePositionIcon.style.WebkitTransform  = 'scaleX(-1)';
			else thePositionIcon.style.WebkitTransform  = 'scaleX(1)';				
		}else {//do nothing on other navigator
		}
		//output information
		var innerHTML_text = "";
		innerHTML_text += "size of map:(" + size_canvas_width + ", " + size_canvas_height + ")<br><br>";
		ratio_man_position_x = man_position_x/img_itrimap.clientWidth;
		ratio_man_position_y = man_position_y/img_itrimap.clientHeight;
		innerHTML_text += "x:" + man_position_x + "(" + 100*ratio_man_position_x.toPrecision(2) + "%);" + "<br>y:" + man_position_y+ "(" + 100*ratio_man_position_y.toPrecision(2) + "%);" ;
		//console.log('(x,y)=('+100*ratio_man_position_x.toPrecision(2)+','+100*ratio_man_position_y.toPrecision(2)+')%');
		sys_inf.innerHTML = innerHTML_text;	
		//end of output information
		
		

		itri_pic_canvas_id = document.getElementById('itri_pic');
		var vision_depth = 5;
		
		img_event_check(ratio_man_position_x,ratio_man_position_y, itri_pic_canvas_id, vision_depth);	
				
		
		var NumberParagraph = document.getElementsByClassName('readmore_paragraph').length;
		for(var i_parag =0; i_parag<NumberParagraph; i_parag= i_parag+1){
			if(readmore_about){		
				document.getElementsByClassName('readmore_paragraph')[i_parag].style.display="inline";
			}else {
				document.getElementsByClassName('readmore_paragraph')[i_parag].style.display="none";
			}
		}
		
		if(track_en & !flag_loading){			
			//console.log('iTarget:' + iTarget);
			//console.log('target:'+jogging_trajectory[iTarget]);
			//console.log('x:'+man_position_x);
			target_point = [jogging_trajectory[iTarget][0]/100*img_itrimap.clientWidth, jogging_trajectory[iTarget][1]/100*img_itrimap.clientHeight]
			var output_getMovingAction = getMovingAction(target_point, [man_position_x, man_position_y]);
			var dist2Target = output_getMovingAction[0];
			if(dist2Target<1) iTarget = iTarget + 1;
			if(iTarget==Num_points_in_track) iTarget = 0;
						
			dx = output_getMovingAction[1];
			dy = output_getMovingAction[2];

		}else if(track_en & flag_loading){
			dx = 0;
			dy = 0;
		}
		else{
		}
		
		if(!track_en){
			if(man_position_x < x_target & (x_target-man_position_x)>=1){
				dx = 1;
			}
			else if(man_position_x > x_target &(man_position_x-x_target)>=1){
				dx = -1;
			}else dx = 0;			
			if(man_position_y < y_target& (y_target-man_position_y)>1){
				dy = 1;
			}
			else if(man_position_y > y_target&(man_position_y-y_target)>1){
				dy = -1;
			}else dy = 0;
		}
	});
}




			


			


function wait(fn) {window.setTimeout(fn, 250); }
function repeat(fn) {
	if (window.requestAnimationFrame) {
	  var advance = function() {fn(); requestAnimationFrame(advance);};
	  requestAnimationFrame(advance);
	} else window.setInterval(fn, 50);
}



function get_line_coef(pt1, pt2){
	//equation: ax + by +c = 0;
	//(y1-y0)x + (x0-x1)y + (x1-x0)y0+(y0-y1)x0 = 0;
	//a = y1-y0;
	//b = x0-x1;
	//c = (x1-x0)y0+(y0-y1)x0;
	var line_coef = [0,0,0];
	var x0 = pt1[0];
	var y0 = pt1[1];
	var x1 = pt2[0];
	var y1 = pt2[1];
	a = y1-y0;
	b = x0-x1;
	c = (x1-x0)*y0+(y0-y1)*x0;
	line_coef = [a,b,c];
	return line_coef;
}

function distance_pt2line(line_coef, point){
	//line_coef = (a, b, c) for ax+by+c = 0;
	//point = (x0,y0)
	//equation: |ax0+by0+c| / sqrt(a^2 + b^2)
	var a = line_coef[0];	
	var b = line_coef[1];	
	var c = line_coef[2];
	var x0 = point[0]; 
	var y0 = point[1];
	var distance = Math.abs(a*x0 + b*y0 + c)/Math.sqrt(a*a + b*b);
	return distance
}

function set_dx_dy_w_track(LineSet, NumLine, trajectory_points){ //LineSet: line set of the track	
	//console.log('current x:' + x);
	//console.log('current y:' + y);

	//console.log('ontrack:'+ontrack);
	//console.log('line:'+theLine_w_minDistance);
	//console.log('dist:'+minDistance);
	//ontrack = check_on_track(trajectory, x, y);		
	
	
	var dx = 0;
	var dy = 0;
	//console.log(dx);
	//console.log(dy);
	return [dx, dy];
}

//non-use function
function check_on_track(LineSet, NumLine,  x, y, trajectory_points){
	var Num_points_in_track = Object.keys(trajectory_points).length;
	//ax+by+c = 0;	
	var theDistance;
	var theLine_w_minDistance;
	var minDistance = 100;
	for(var iLine=0; iLine< NumLine; iLine = iLine +1){
		//console.log('x:'+x+';y:'+y);
		theDistance = distance_pt2line(LineSet[iLine], [x,y]);
		console.log('iLine:'+iLine+';Distance:'+theDistance);
		var boundary_x_pt1 = trajectory_points[iLine][0];
		var boundary_x_pt2 = trajectory_points[iLine+1][0];
		var boundary_y_pt1 = trajectory_points[iLine][1];
		var boundary_y_pt2 = trajectory_points[iLine+1][1];
		var x_between_boundary; var y_between_boundary;
		/*
		if(Math.abs(boundary_x_pt2-boundary_x_pt1)<1){
			if(Math.abs(x-boundary_x_pt1)<1) x_between_boundary = true;		
			else x_between_boundary = false;
		}
		else{
			x_between_boundary = (x-boundary_x_pt1)<(boundary_x_pt2 - boundary_x_pt1);			
		} 
		if(Math.abs(boundary_y_pt2-boundary_y_pt1)<1){
			if(Math.abs(y-boundary_y_pt1)<1) y_between_boundary = true;		
			else y_between_boundary = false;
		}
		else{
			y_between_boundary = (y-boundary_y_pt1)<(boundary_y_pt2 - boundary_y_pt1);			
		}
		*/
		if(theDistance<minDistance /*& x_between_boundary & y_between_boundary*/) {
			minDistance = theDistance;				
			theLine_w_minDistance = iLine;
		}		
	}
	console.log('iLine:'+theLine_w_minDistance);
	console.log('minDistance:'+minDistance);
	
	if(minDistance < 3) {
		ontrack = true;
		return [ontrack, theLine_w_minDistance, minDistance];
		}
	else {
		ontrack = false;
		return [ontrack, theLine_w_minDistance, minDistance];
	}
	
}








function print_index_on_map(flag_show_ptr){
		marker_div_id.innerHTML="";
		if(flag_show_ptr){			
			for(var i=0; i<number_imgs; i++){			
				marker_div_id.innerHTML += '<img class = "ptr" id="ptr' + i + '" src="'+ "icon/pointer.png" + '" />'; 	
				var id_element_to_get = 'ptr'+i;
				var thePtr = document.getElementById(id_element_to_get);				
				thePtr.style.position = "absolute";			
				//console.log(canvas.height);
				thePtr.style.top = canvas.height * y_set[i]/100 + 'px';
				//console.log(thePtr.style.top);
				
				thePtr.style.left = canvas.width * x_set[i]/100 + 'px';
                thePtr.style.opacity = 0.7;                
			}
		}else{
			//do nothing
		}
		
	
}
var currImg_filename;
function img_event_check(x,y,pic_div_id, vision_depth){
		var minimum_distance = 100;//percentage
		var distance;
		var minimum_distance_i;
		var dx;
		var dy;
		image_to_show_index = [];
		for(var i=0; i<number_imgs; i++){
			//console.log("img_event_check:" + number_imgs);
			dx = 100*x - x_set[i];
			dy = 100*y - y_set[i];
			distance = Math.sqrt(dx*dx + dy*dy);
			//distance=0;
			if(distance < vision_depth){
				image_to_show_index.push(i);
				if(distance < minimum_distance){
					minimum_distance = distance;
					minimum_distance_i = i;
				}			
			}
		}
		
		//console.log(image_to_show_index);
		var text_description;
		//console.log(flag_loading);
		if(!flag_loading){
			if(minimum_distance < vision_depth) {
				var random_index = Math.floor(Math.random() * image_to_show_index.length);
				//console.log('random'+random_index);
				var the_image_to_show_id = image_to_show_index[random_index];
				var filename_to_show= img_grp.getElementsByTagName("filename")[the_image_to_show_id].firstChild.nodeValue;
				var file_path = "img/"+ filename_to_show;
				if(!image_hold_flag){
					if(currImg_filename != filename_to_show) {
						currImg_filename = filename_to_show;
						//pic_div_id.src = file_path;
						//pic_div_id.removeAttribute('src');
						//console.log(pic_div_id);					
						loadImage(pic_div_id, file_path);	
						var title_img = img_grp.getElementsByTagName("title")[the_image_to_show_id].firstChild.nodeValue;
						var description_object = img_grp.getElementsByTagName("description")[the_image_to_show_id].firstChild;
						if (description_object == null){
							text_description = "";																
						}else {
							text_description = img_grp.getElementsByTagName("description")[the_image_to_show_id].firstChild.nodeValue;					
						}	
						document.getElementById('img_description').innerHTML = "<h1>" + title_img + "</h1>"
																		+ "<p>" + text_description + "</p><br><br><br><br>";	
						/* background color can be changed
						switch(month_set[the_image_to_show_id]){
						
                        case 1:
                            $('#img-div').css('backgroundColor','#D8CEF6')
                            break;
                        case 2:
                            $('#img-div').css('backgroundColor','#CECEF6')
                            break;
                        case 3:
                            $('#img-div').css('backgroundColor','#CEF6F5')
                            break;                                
                        case 4:
                            $('#img-div').css('backgroundColor','#CEF6CE')
                            break;
                        case 5:
                            $('#img-div').css('backgroundColor','#CEF6E3')
                            break;
                        case 6:
                            $('#img-div').css('backgroundColor','#ECF6CE')
                            break;                                
                        case 7:
								$('#img-div').css('backgroundColor','#F6D8CE')
								break;
                        case 8:
                            $('#img-div').css('backgroundColor','#F6CECE')
                            break;
                        case 9:
                            $('#img-div').css('backgroundColor','#F5F6CE')
                            break;                                
                        case 10:
                            $('#img-div').css('backgroundColor','#CEECF5')
                            break;
                        case 11:
                            $('#img-div').css('backgroundColor','#ECCEF5')
                            break;
                        case 12:
                            $('#img-div').css('backgroundColor','#00AAAA')
                            break;                                
                        
						default:
                            $('#img-div').css('backgroundColor','#CECEF6')								
						}	
						*/						
						image_hold_flag = 1;
						setTimeout(function(){image_hold_flag = 0;}, 3000);
					} //do nothong
				}
				
				
				
				
				
				
			};
		}else{

		}		

	}
	
function getMovingAction(TargetPoint, CurrentPosition){ 
	var dx;
	var dy;
	var X_t = TargetPoint[0];
	var Y_t = TargetPoint[1];
	var X_c = CurrentPosition[0];
	var Y_c = CurrentPosition[1];	
	var d_T2C = Math.sqrt((X_t - X_c)*(X_t - X_c) + (Y_t - Y_c)*(Y_t - Y_c) );	
	if(d_T2C<1){
		dx = (X_t - X_c );
		dy = (Y_t - Y_c );
	}else{
		dx = (X_t - X_c )/d_T2C;
		dy = (Y_t - Y_c )/d_T2C;
	}
	
	return [d_T2C, dx, dy];
}
