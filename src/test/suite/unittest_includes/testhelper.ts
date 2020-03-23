import * as vscode from 'vscode';

var fs = require('fs');
var path = require('path');

function ChangeDirectoryToTestFiles()
{
	process.chdir(__dirname);
	process.chdir("..");
	process.chdir("..");
	process.chdir("..");
	process.chdir("..");
	process.chdir("src");
	process.chdir("test");
	process.chdir("suite");
	process.chdir("testfiles");
}

export function GetTestFilesDirectory()
{
	ChangeDirectoryToTestFiles();
	return path.normalize(process.cwd());
}

export function GetMainCppFilepath () 
{
	ChangeDirectoryToTestFiles();
    var file = path.join(process.cwd() + '/src' + '/main.cpp');
	file = path.normalize(file);
	return file;
}
export function GetMainGcovFilePath () 
{
	ChangeDirectoryToTestFiles();
    var file = path.join(process.cwd() + '/reports' + '/main.cpp.gcov');
	file = path.normalize(file);
	return file;

}

export function GetNoGcovFileFilePath () 
{
	ChangeDirectoryToTestFiles();
    var file = path.join(process.cwd() + '/src' + '/noGcovFile.cpp');
	file = path.normalize(file);
	return file;

}