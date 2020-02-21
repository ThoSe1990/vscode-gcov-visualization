import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as fakeEditor from './fake/fakes';

import * as FileHandler from '../../filehandler'


suite('Filehandler Test Suite', () => {

	test('GetAllGcovFilesFromWorkspace - no path', () => {
		
		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(undefined);

		var GcovFiles = filehandler.GetGcovFiles();

		assert.equal(true, GcovFiles.length === 0);

	});

	test('GetAllGcovFilesFromWorkspace - in testfiles directory', () => {
		var filehandler = new FileHandler.FileHandler();
		var workscpaceFolder = vscode.workspace.workspaceFolders;
		
		if (workscpaceFolder)
			filehandler.GetAllGcovFilesFromWorkspace(workscpaceFolder[0].uri.fsPath);

		var GcovFiles = filehandler.GetGcovFiles();

		assert.equal(true, GcovFiles.toString().includes('main.cpp.gcov'));

	});

	test('FindGcovFile - no text editor', () => {
		var filehandler = new FileHandler.FileHandler();
		var result = filehandler.FindGcovFile(undefined);
		assert.equal(result, undefined);
	});



});
