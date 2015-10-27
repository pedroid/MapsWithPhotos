#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      yushengc
#
# Created:     24/02/2015
# Copyright:   (c) yushengc 2015
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import Image
import os
from Tkinter import Tk;
from tkFileDialog import askopenfilename
the_file = askopenfilename()
specific_width = int(raw_input("the width to resize: "))
tmp = the_file.split('.')[0].split('/')
file = tmp[len(tmp)-1]+'.'+the_file.split('.')[1]
if(os.path.isdir(file)):
	print "this is a directory. the program do NOTHING!"
elif(file.split('.')[1] == 'jpg' or file.split('.')[1] == 'JPG' or file.split('.')[1] == 'png' or file.split('.')[1] == 'PNG'):
	im = Image.open(file)
	width = specific_width
	ratio = float(width)/im.size[0]
	if ratio<1:
		height = int(im.size[1]*ratio)
		nim = im.resize((width, height), Image.BILINEAR)
		bakup_file_name = 'bak.' + file
		im.save(bakup_file_name)
		nim.save(file)
		print file + '\t is resized.\n'
	else:print "the image's width is smaller than specific width. the program do NOTHING!"
else:
    print "the file is NOT jpg or JPG."
print "EOF"
