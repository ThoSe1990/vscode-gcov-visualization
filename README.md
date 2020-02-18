# vscode-gcov-visualization

VSCode extension to visualize gcov reports. After running the executable and creating the *.gcov files you can either `Toggle Gcov` or `ctrl + F1`. Extension still under development.

![](img/sampleScreenshot.png)

## Example

There is a sample directory inside this project. This contains a sample coverage report with the corersponding source file. This directory is also used by the unittests. 

## Debugging

Install all packages, start debugging and open the sample folder within the running vscode application. 
```
npm install
```


## what's next?

* setting up unit tests 
* attaching overall coverage percentage to statusbar
* create a dark and light green decorator
* create coverage report automatically / by command 
* ux improvement like hints if no gcov files found, wrong fileformat ... 
