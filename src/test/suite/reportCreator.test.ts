import * as assert from 'assert';
import * as Filehandler from '../../filehandler';
import * as ReportCreator from '../../reportCreator';
import * as Helper from './unittest_includes/testhelper';


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

        var r = new ReportCreator.ReportCreator();
        r.ReadConfigFile();
        r.FindGcov();
        var filehandler = new Filehandler.FileHandler(".gcda");
        filehandler.GetAllFilesFromWorkspace(Helper.GetTestFilesDirectory());
        var files = filehandler.GetFiles();

        for (var i = 0 ; i < files.length ; i++)
            r.RunGcov(files[i]);
    });    

});