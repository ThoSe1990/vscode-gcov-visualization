import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './unittest_includes/fakes';
import * as Helper from './unittest_includes/testhelper';
import * as Validation from '../../validation';


var fs = require('fs');
var path = require('path');


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

	test('validation open editor passed', () => {

		var uri = Helper.GetMainCppUri();

		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var validation = new Validation.ValidationTextEditor(editor);

		var rules = new Validation.ValidationRules();
		rules.AddValidation(validation);
		
		var result = rules.Validate();

		assert.equal(result, true);
	
	});

	test('validation open editor failed', () => {
		var validation = new Validation.ValidationTextEditor(undefined);

		var rules = new Validation.ValidationRules();
		rules.AddValidation(validation);
		
		var result = rules.Validate();

		assert.equal(result, false);
	
	});


	test('validation feature toggle is activated', () => {

		var validation = new Validation.ValidationFeatureIsActive(true)

		var rules = new Validation.ValidationRules();
		rules.AddValidation(validation);

		var result = rules.Validate();

		assert.equal(result, true);
	
	});

	test('validation feature toggle is deactivated', () => {

		var validation = new Validation.ValidationFeatureIsActive(false)

		var rules = new Validation.ValidationRules();
		rules.AddValidation(validation);

		var result = rules.Validate();

		assert.equal(result, false);
	
	});

});
