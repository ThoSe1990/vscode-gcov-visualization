import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

import * as FileHandler from '../../filehandler'


suite('Filehandler Test Suite', () => {

	test('No Gcov Files Found', () => {
		
		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(undefined);

		var GcovFiles = filehandler.GetGcovFiles();

		assert.equal(true, GcovFiles.length === 0);

	});

	test('Find Gcov Files', () => {
		var filehandler = new FileHandler.FileHandler();
		var workscpaceFolder = vscode.workspace.workspaceFolders;
		if (workscpaceFolder)
			filehandler.GetAllGcovFilesFromWorkspace(workscpaceFolder[0].uri.fsPath);

		var GcovFiles = filehandler.GetGcovFiles();

		assert.equal(true, GcovFiles.toString().includes('main.cpp.gcov'));

	});
});
