import * as vscode from 'vscode';
import * as assert from 'assert';
import * as Filehandler from '../../filehandler';
import * as ReportCreator from '../../reportCreator';
import * as Helper from './unittest_includes/testhelper';
import * as Fakes from './unittest_includes/fakes';



var fs = require('fs');
var path = require('path');


suite('Report Creator Test Suite', () => {

    test('Report Creator - find gcov', () => {
        
        var workspace = new Fakes.FakeWorkspaceFolder(vscode.Uri.parse(Helper.GetTestFilesDirectory()));
        var r = new ReportCreator.ReportCreator(workspace);
        r.ReadConfigFile();
        assert.equal(r.GetGcovPath().includes("gcov"), true );
    });

	test('Report Creator - get gcov version', () => {
		
        var workspace = new Fakes.FakeWorkspaceFolder(vscode.Uri.parse(Helper.GetTestFilesDirectory()));
        var r = new ReportCreator.ReportCreator(workspace);
        r.ReadConfigFile();

        var result = r.RunGcov("--version");
  
        assert.notEqual(result, "");
    });


	test('Report Creator - find gcda', () => {
		
        var filehandler = new Filehandler.FileHandler(".gcda");
        filehandler.GetAllFilesFromWorkspace(Helper.GetTestFilesDirectory());
        var files = filehandler.GetFiles();
        assert.equal(files.length, 1);
        assert.equal(files[0].includes("main.cpp.gcda"), true);
    });


	test('Report Creator - create gcov file', () => {

        var workspace = new Fakes.FakeWorkspaceFolder(vscode.Uri.parse(Helper.GetTestFilesDirectory()));
        var r = new ReportCreator.ReportCreator(workspace);
        r.ReadConfigFile();        
        var filehandler = new Filehandler.FileHandler(".gcda");
        filehandler.GetAllFilesFromWorkspace(Helper.GetTestFilesDirectory());
        var files = filehandler.GetFiles();

        for (var i = 0 ; i < files.length ; i++)
            r.RunGcov(files[i]);
    });    

});