import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './unittest_includes/fakes';
import * as Helper from './unittest_includes/testhelper';
import * as Decorator from '../../decorator';


var fs = require('fs');
var path = require('path');

function SetDecorationOnTestFile()
{
	var uriCpp = Helper.GetMainCppUri();
	var uriGcov = Helper.GetMainGcovUri();

	var document = new Fakes.FakeTextDocument(uriCpp);
	var editor = new Fakes.FakeEditor(document);

	var decoratorHandler = new Decorator.DecoratorHandler();

	decoratorHandler.AddDecorator(editor, uriGcov.fsPath);

	var decorators = decoratorHandler.GetDecoratorsOfTextEditor(editor);
	if(decorators)
	{
		decorators.forEach( function( d ) {
			d.Reset();
			d.SetDecoration();
		});
	}	
	return decorators;
}

function PathToInvalidFile()
{
	var uriCpp = Helper.GetNoGcovFileCppUri();

	var document = new Fakes.FakeTextDocument(uriCpp);
	var editor = new Fakes.FakeEditor(document);

	var decoratorHandler = new Decorator.DecoratorHandler();

	decoratorHandler.AddDecorator(editor, undefined);

	var decorators = decoratorHandler.GetDecoratorsOfTextEditor(editor);

	return decorators;
}


suite('Validation Test Suite', () => {

	test('DecoratorHandler - editor and colors valid', () => {

		var uri = Helper.GetMainCppUri();

		var document = new Fakes.FakeTextDocument(uri);
		var editor = new Fakes.FakeEditor(document);

		var decoratorHandler = new Decorator.DecoratorHandler();

		decoratorHandler.AddDecorator(editor, uri.fsPath);

		var createdDecorators = decoratorHandler.GetDecoratorsOfTextEditor(editor);
		
		assert.equal(Decorator.COLORS.length, createdDecorators.length);
		assert.equal(editor , createdDecorators[0].GetTextEditor() );
		assert.equal(editor , createdDecorators[1].GetTextEditor() );
	});

	test('DecoratorHandler - decorate red color', () => {
		
		var decorators = SetDecorationOnTestFile();
		var redContainer = decorators[0].GetDecoratorContainer();

		assert.equal(redContainer.length, 3);
	});

	test('DecoratorHandler - decorate green color', () => {
		
		var decorators = SetDecorationOnTestFile();
		var greenContainer = decorators[1].GetDecoratorContainer();

		assert.equal(greenContainer.length, 9);
	});

	test('DecoratorHandler - file without gcov report open', () => {
		
		var decorators = PathToInvalidFile();
		assert.equal(decorators.length, 0);
		assert.equal(1, 1);
	});

});
