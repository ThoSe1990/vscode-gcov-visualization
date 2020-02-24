import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './additional/fakes';
import * as FileHandler from '../../filehandler'

var fs = require('fs');
var path = require('path');

function ChangeDirectoryToTestFiles()
{
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

	test('FindGcovFile - file with gcov file open', () => {
	
		ChangeDirectoryToTestFiles();
		var file = path.join(process.cwd() + '\\src' + '\\main.cpp');
		file = path.normalize(file);
		var uri = vscode.Uri.parse(file);

		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(process.cwd());

		var result = filehandler.FindGcovFile(editor);
		
		assert.notEqual(result, undefined);
		assert.equal(true, result!.includes('main.cpp.gcov'));

	});

	test('FindGcovFile - file without gcov file open', () => {
	
		ChangeDirectoryToTestFiles();
		var file = path.join(process.cwd() + '/src' + '/noGcovFile.cpp');
		var uri = vscode.Uri.parse(file);

		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var filehandler = new FileHandler.FileHandler();
		filehandler.GetAllGcovFilesFromWorkspace(process.cwd());

		var result = filehandler.FindGcovFile(editor);
		
		assert.equal(result, undefined);
	});

});
