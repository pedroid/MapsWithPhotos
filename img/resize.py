import Image
import os
curr_dir = os.getcwd()
all_file_curr_dir = os.listdir(curr_dir)
for file in all_file_curr_dir:
	if(os.path.isdir(file)):
		continue
	elif(file.split('.')[1] == 'jpg' or file.split('.')[1] == 'JPG'):
		im = Image.open(file)
		width = 400
		ratio = float(width)/im.size[0]
		if ratio<1:
			height = int(im.size[1]*ratio)
			nim = im.resize((width, height), Image.BILINEAR)
			bakup_file_name = 'bak.' + file
			im.save(bakup_file_name)
			nim.save(file)
			print file + '\t is resized.\n'
		else:continue
	else:continue
print "EOF"
