import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as fakeEditor from './fake/fakes';

import * as FileHandler from '../../filehandler'

function ChangeDirectoryToTestFiles()
{
	// to avoid / and \ in paths considering windows and linux unittests
	process.chdir(__dirname);
	process.chdir("..");
	process.chdir("..");
	process.chdir("..");
	process.chdir("src");
	process.chdir("test");
	process.chdir("suite");
	process.chdir("testfiles");
}

suite('Filehandler Test Suite', () => {

	test('GetAllGcovFilesFromWorkspace - no path', () => {
		
		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(undefined);

		var GcovFiles = filehandler.GetGcovFiles();

		assert.equal(true, GcovFiles.length === 0);

	});

	test('GetAllGcovFilesFromWorkspace - in testfiles directory', () => {

		ChangeDirectoryToTestFiles();

		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(process.cwd());
		var GcovFiles = filehandler.GetGcovFiles();

		assert.equal(true, GcovFiles.toString().includes('main.cpp.gcov'));
		assert.equal(1, GcovFiles.length);

	});

	test('FindGcovFile - no text editor', () => {
		var filehandler = new FileHandler.FileHandler();
		var result = filehandler.FindGcovFile(undefined);
		assert.equal(result, undefined);
	});



});
