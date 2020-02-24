import * as assert from 'assert';
import * as Fakes from './unittest_includes/fakes';
import * as FileHandler from '../../filehandler'
import * as Helper from './unittest_includes/testhelper';

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
		filehandler.GetAllGcovFilesFromWorkspace(Helper.GetTestFilesDirectory());
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

		var uri = Helper.GetMainCppUri();
		
		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var filehandler = new FileHandler.FileHandler();
		var _path = path.normalize(process.cwd());
		filehandler.GetAllGcovFilesFromWorkspace(_path);

		var result = filehandler.FindGcovFile(editor);
		
		assert.notEqual(result, undefined);
		assert.equal(true, result!.includes('main.cpp.gcov'));

	});

	test('FindGcovFile - file without gcov file open', () => {
	
		var uri = Helper.GetNoGcovFileCppUri();

		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var filehandler = new FileHandler.FileHandler();
		var _path = path.normalize(process.cwd());
		filehandler.GetAllGcovFilesFromWorkspace(_path);

		var result = filehandler.FindGcovFile(editor);
		
		assert.equal(result, undefined);
	});

});
