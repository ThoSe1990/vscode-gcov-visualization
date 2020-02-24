import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './unittest_includes/fakes';
import * as Helper from './unittest_includes/testhelper';
import * as Decorator from '../../decorator';


var fs = require('fs');
var path = require('path');


suite('Validation Test Suite', () => {

	test('DecoratorHandler - AddDecorator / GetDecorator passed', () => {

		var uri = Helper.GetMainGcovUri();

		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var decorator = new Decorator.DecoratorHandler();

		decorator.AddDecorator(editor, uri.fsPath);

		var result = decorator.GetDecorator(editor);

		assert.equal(Decorator.COLORS.length, result.length);
		assert.equal(editor , result[0].GetTextEditor() );
		assert.equal(editor , result[1].GetTextEditor() );
	});

});
