import * as assert from 'assert';
import * as vscode from 'vscode';
import * as Fakes from './unittest_includes/fakes';
import * as Helper from './unittest_includes/testhelper';
import * as ReportCreator from '../../reportCreator';
import { downloadDirToExecutablePath } from 'vscode-test/out/util';


var fs = require('fs');
var path = require('path');


suite('Report Creator Test Suite', () => {

	test('Report Creator - get gcov version', () => {
		
        var r = new ReportCreator.ReportCreator();
        r.ReadConfigFile();
        r.SetGcovExecutablePath();
        var result = r.PrintVersion();
    
        assert.notEqual(result, "");
    });

});