import * as assert from 'assert';
import * as Fakes from './unittest_includes/fakes';
import * as FileHandler from '../../filehandler'
import * as Helper from './unittest_includes/testhelper';

var fs = require('fs');
var path = require('path');



suite('Filehandler Test Suite', () => {

	test('GetAllGcovFilesFromWorkspace - no path', () => {
		
		var filehandler = new FileHandler.GcovFileHandler();
		filehandler.GetAllFilesFromWorkspace(undefined);

		var GcovFiles = filehandler.GetFiles();

		assert.equal( GcovFiles.length , 0);

	});


	test('GetAllGcovFilesFromWorkspace - in testfiles directory', () => {

		var filehandler = new FileHandler.GcovFileHandler();
		filehandler.GetAllFilesFromWorkspace(Helper.GetTestFilesDirectory());
		var GcovFiles = filehandler.GetFiles();

		assert.equal(GcovFiles.toString().includes('main.cpp.gcov'), true);
		assert.equal(GcovFiles.length, 1);
	});

	test('FindGcovFile - no text editor', () => {
		var filehandler = new FileHandler.GcovFileHandler();
		var result = filehandler.FindGcovFile(undefined);
		assert.equal(result, undefined);
	});

	test('FindGcovFile - file with gcov file open', () => {

		var filepath = Helper.GetMainCppFilepath();
		
		var document = new Fakes.FakeTextDocument(filepath);
		var editor = new Fakes.FakeEditor(document);

		var filehandler = new FileHandler.GcovFileHandler();
		var _path = path.normalize(process.cwd());
		filehandler.GetAllFilesFromWorkspace(_path);

		var result = filehandler.FindGcovFile(editor);
		
		assert.notEqual(result, undefined);
		assert.equal(result!.includes('main.cpp.gcov'), true);

	});

	test('FindGcovFile - file without gcov file open', () => {
	
		var uri = Helper.GetNoGcovFileFilePath();

		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var filehandler = new FileHandler.GcovFileHandler();
		var _path = path.normalize(process.cwd());
		filehandler.GetAllFilesFromWorkspace(_path);

		var result = filehandler.FindGcovFile(editor);
		
		assert.equal(result, undefined);
	});

});
