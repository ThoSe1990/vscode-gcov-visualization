import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './unittest_includes/fakes';
import * as Helper from './unittest_includes/testhelper';
import * as Decorator from '../../decorator';


export function SetDecorationOnTestFile()
{
	var cppFile = Helper.GetMainCppFilepath();
	var gcovFile = Helper.GetMainGcovFilePath();

	var document = new Fakes.FakeTextDocument(cppFile);
	var editor = new Fakes.FakeEditor(document);

	var decoratorHandler = new Decorator.DecoratorHandler();
	decoratorHandler.AddDecorator(editor, gcovFile);

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
	var cppFile = Helper.GetNoGcovFileFilePath();
	var document = new Fakes.FakeTextDocument(cppFile);
	var editor = new Fakes.FakeEditor(document);

	var decoratorHandler = new Decorator.DecoratorHandler();
	decoratorHandler.AddDecorator(editor, undefined);
	var decorators = decoratorHandler.GetDecoratorsOfTextEditor(editor);

	return decorators;
}


suite('DecoratorHandler Test Suite', () => {

	test('DecoratorHandler - editor and colors valid', () => {

		var filepath = Helper.GetMainCppFilepath();
		var document = new Fakes.FakeTextDocument(filepath);
		var editor = new Fakes.FakeEditor(document);

		var decoratorHandler = new Decorator.DecoratorHandler();
		decoratorHandler.AddDecorator(editor, filepath);
		var createdDecorators = decoratorHandler.GetDecoratorsOfTextEditor(editor);
		
		assert.equal(Decorator.COLORS.length, createdDecorators.length);
		assert.equal(editor , createdDecorators[0].GetTextEditor() );
		assert.equal(editor , createdDecorators[1].GetTextEditor() );
	});

	test('DecoratorHandler - decorate red color', () => {
		
		var decorators = SetDecorationOnTestFile();
		var redContainer = decorators[0].GetDecoratorContainer();
		var expectedDecorators = 3;

		assert.equal(redContainer.length, expectedDecorators);
	});

	test('DecoratorHandler - decorate green color', () => {
		
		var decorators = SetDecorationOnTestFile();
		var greenContainer = decorators[1].GetDecoratorContainer();
		var expectedDecorators = 8;

		assert.equal(greenContainer.length, expectedDecorators);
	});

	test('DecoratorHandler - file without gcov report open', () => {
		
		var decorators = PathToInvalidFile();
		var expectedDecorators = 0;

		assert.equal(decorators.length, expectedDecorators);
	});

});
