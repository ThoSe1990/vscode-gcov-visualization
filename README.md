# vscode-gcov-visualization

VSCode extension to visualize gcov reports. After running the executable you can create the corresponding gcov reports with `Create Coverage Report` and visualize them with `Toggle Gcov`.  The executed lines are decorated with green color, non executed lines by red color. A hovermessage shows the number of executions for each line. Please note: Extension still under development. Read following chapter to setup this extension on your system  
  
Install all packages, start debugging and open the sample folder within the running vscode application. 
```
npm install
```
  
## Example
There is a sample directory inside this project. This contains a sample coverage report with the corersponding source file. This directory is also used by the unittests. 
  

## Run Extension and Unittests

There is an sample cpp project inside the source directory:  `./src/test/suite/testfiles`  
To Run the unittests (and the extension on this sample project) do the following steps
1. Add `./src/test/suite/testfiles/.vscode/gcov-visualization.json`  with the following content and replace the paths in the angle brackets:
```
{
	"makefile_directory" : "",
	"gcov_path": "< DRIVE:\\PATH_MSYS64 >\\mingw64\\bin\\gcov",
	"gcov_output": "< DRIVE:\\PATH_TO_WORKSPACE > \\vscode-gcov-visualization\\src\\test\\suite\\testfiles\\reports"
}
```  
  
2. Build and run the sample (I'm working with GCC 8.2.0)
```
mkdir build
cd build
cmake .. -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Debug
make
.\bin\testing.exe
```
   
3. Run unittests or extension itsself. By running the extension:  `File->Open Folder... --> ./src/test/suite/testfiles`     
  
4. Create gcov report `ctrl + shift + p --> Create Coverage Report`  
  
5. Visualize report `ctrl + shift + p --> Toggle Gcov` (same command to disable visualization)   
  

![](img/sampleScreenshot.png)

## open points:
* refactor, refactor, refactor ... 
* catching errors: invalid folder open (paths conflict with json file while creating reports)
* exception when toggle gcov and invalid file is open 
* adjust unittests to make them run on pipeline
