/*
The purpose of this program is to detect odd looking lines in a code base
that may be the result of a malicious script (virus). Initially, this program will
flag suspicious lines, like icon files with php code inside of them, for a human to
later verfiy whether they're sus or not 

1. recursively read all files in a given directory
2. check each file for strange lines
  - examples of strange lines: 
      - really long lines (<100 characters)
      - lines that aren't human readable
3. If there are some sus lines, print the file name and line number
    to a file for the developer to review. 
*/

var fs = fs || require('fs');
var path = path || require('path');
const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
      filelist = fs.statSync(path.join(dir, file)).isDirectory()
        ? walkSync(path.join(dir, file), filelist)
        : filelist.concat(path.join(dir, file));
  
    });
  return filelist;
  }

const fileList = walkSync('.', []);
fileList.forEach((file) => {
    console.log("-------------------------------")
    console.log("in file: ", file)
    console.log("-------------------------------")
    const lines = ("" + fs.readFileSync(file)).split("\n")
    lines.filter((line) => line.length > 300 ? console.log("line: ", line): '')
})



