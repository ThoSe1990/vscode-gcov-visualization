import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './additional/fakes';
import * as Validation from '../../validation';



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

suite('Validation Test Suite', () => {

	test('validation workspace folder failed', () => {
		
		var validation = new Validation.ValidationWorkspaceFolder(undefined);
		
		var rules = new Validation.ValidationRules();
		rules.AddValidation(validation);
		
		var result = rules.Validate();

		assert.equal(result, false);
	
	});

	test('validation workspace folder passed', () => {
		var workspace: Fakes.FakeWorkspaceFolder[] = [];
		workspace.push(new Fakes.FakeWorkspaceFolder(vscode.Uri.parse(process.cwd())));
		var validation = new Validation.ValidationWorkspaceFolder(workspace);
		
		var rules = new Validation.ValidationRules();
		rules.AddValidation(validation);
		
		var result = rules.Validate();

		assert.equal(result, true);
	
	});

	test('validation workspace folder passed', () => {
		ChangeDirectoryToTestFiles();
		var file = path.join(process.cwd() + '\\src' + '\\main.cpp');
		file = path.normalize(file);
		var uri = vscode.Uri.parse(file);

		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var validation = new Validation.ValidationTextEditor(editor);

		var rules = new Validation.ValidationRules();
		rules.AddValidation(validation);
		
		var result = rules.Validate();

		assert.equal(result, true);
	
	});



});
