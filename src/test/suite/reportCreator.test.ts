import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './unittest_includes/fakes';
import * as Helper from './unittest_includes/testhelper';
import * as ReportCreator from '../../reportCreator';
import { downloadDirToExecutablePath } from 'vscode-test/out/util';


var fs = require('fs');
var path = require('path');


suite('Report Creator Test Suite', () => {

    test('Report Creator - dont find gcov', () => {
		
        var r = new ReportCreator.ReportCreator();
        assert.equal( r.GetGcovPath(), "");
    });
    
    test('Report Creator - find gcov', () => {
		
        var r = new ReportCreator.ReportCreator();
        r.ReadConfigFile();
        r.FindGcov();
        assert.equal(r.GetGcovPath().includes("gcov"), true );
    });

	test('Report Creator - get gcov version', () => {
		
        var r = new ReportCreator.ReportCreator();
        r.ReadConfigFile();
        r.FindGcov();
        var result = r.CustomCommand("--version");
    
        assert.notEqual(result, "");
    });

});