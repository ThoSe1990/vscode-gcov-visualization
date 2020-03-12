// import * as assert from 'assert';
// import * as Extension from  '../../extension';
// import * as Fakes from './unittest_includes/fakes';
// import * as Helper from './unittest_includes/testhelper';


// import * as vscode from 'vscode';

// function GetValidEditor()
// {
// 	var uriCpp = Helper.GetMainCppUri();

// 	var document = new Fakes.FakeTextDocument(uriCpp);
// 	var editor = new Fakes.FakeEditor(document);
// 	return editor;
// }

// function GetInvalidEditor()
// {
// 	var uriCpp = Helper.GetNoGcovFileCppUri();

// 	var document = new Fakes.FakeTextDocument(uriCpp);
// 	var editor = new Fakes.FakeEditor(document);
// 	return editor;
// }



// suite('Extension Test Suite', () => {
// 	vscode.window.showInformationMessage('Start all tests.');

// 	test('Update - valid file no exception', () => {
// 		var editor = GetValidEditor();
// 		Extension.Update(editor);
// 	});
// 	test('Update - invalid file no exception', () => {
// 		var editor = GetInvalidEditor();
// 		Extension.Update(editor);
// 	});
// 	test('Update - undefined no exception', () => {
// 		Extension.Update(undefined);
// 	});

// 	test('Reset - valid file no exception', () => {
// 		var editor = GetValidEditor();
// 		Extension.Reset(editor);
// 	});
// 	test('Reset - invalid file no exception', () => {
// 		var editor = GetInvalidEditor();
// 		Extension.Reset(editor);
// 	});
// 	test('Reset - undefined no exception', () => {
// 		Extension.Reset(undefined);
// 	});

// 	test('UpdateStatusbar - valid file no exception', () => {
// 		var editor = GetValidEditor();
// 		Extension.UpdateStatusbar(editor);
// 	});
// 	test('UpdateStatusbar - undefined editor no exception', () => {
// 		Extension.UpdateStatusbar(undefined);
// 	});

// });
