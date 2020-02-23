import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './fake/fakes';
import * as Validation from '../../validation';
import { FakeWorkspaceFolder } from './fake/fakes';

var fs = require('fs');
var path = require('path');

function ChangeDirectoryToTestFiles()
{
	process.chdir(__dirname);
	process.chdir("..");
	process.chdir("..");
	process.chdir("..");
}

suite('Validation Test Suite', () => {

	test('validation failed', () => {

		ChangeDirectoryToTestFiles();

		var rules = new Validation.ValidationRules();
		var validation = new Validation.ValidationExample(process.cwd());

		rules.AddValidation(validation)
		
		assert.equal(rules.Validate(), true);
	
	});
});
