import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './additional/fakes';
import * as FileHandler from '../../filehandler'
import * as Additional from './additional/testfiles';

var fs = require('fs');
var path = require('path');



suite('Filehandler Test Suite', () => {

	test('GetAllGcovFilesFromWorkspace - no path', () => {
		
		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(undefined);

		var GcovFiles = filehandler.GetGcovFiles();

		assert.equal(true, GcovFiles.length === 0);

	});

	test('GetAllGcovFilesFromWorkspace - in testfiles directory', () => {

		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(Additional.GetTestFilesDirectory());
		var GcovFiles = filehandler.GetGcovFiles();

		assert.equal(true, GcovFiles.toString().includes('main.cpp.gcov'));
		assert.equal(1, GcovFiles.length);
	});

	test('FindGcovFile - no text editor', () => {
		var filehandler = new FileHandler.FileHandler();
		var result = filehandler.FindGcovFile(undefined);
		assert.equal(result, undefined);
	});

	test('FindGcovFile - file with gcov file open', () => {

		var uri = Additional.GetMainCppUri();
		
		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(process.cwd());

		var result = filehandler.FindGcovFile(editor);
		
		assert.notEqual(result, undefined);
		assert.equal(true, result!.includes('main.cpp.gcov'));

	});

	test('FindGcovFile - file without gcov file open', () => {
	
		var uri = Additional.GetNoGcovFileCppUri();

		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(process.cwd());

		var result = filehandler.FindGcovFile(editor);
		
		assert.equal(result, undefined);
	});

});
