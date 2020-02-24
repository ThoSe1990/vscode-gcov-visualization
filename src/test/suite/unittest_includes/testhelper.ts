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
	return process.cwd();
}

export function GetMainCppUri () 
{
	ChangeDirectoryToTestFiles();
    var file = path.join(process.cwd() + '\\src' + '\\main.cpp');
    file = path.normalize(file);
    var uri = vscode.Uri.parse(file);

    return uri;
}
export function GetMainGcovUri () 
{
	ChangeDirectoryToTestFiles();
    var file = path.join(process.cwd() + '\\build' + '\\main.cpp.gcov');
    file = path.normalize(file);
    var uri = vscode.Uri.parse(file);

    return uri;
}

export function GetNoGcovFileCppUri () 
{
	ChangeDirectoryToTestFiles();
    var file = path.join(process.cwd() + '\\src' + '\\noGcovFile.cpp');
    file = path.normalize(file);
    var uri = vscode.Uri.parse(file);

    return uri;
}