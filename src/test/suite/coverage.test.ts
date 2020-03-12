import * as assert from 'assert';
import * as Coverage from  '../../coverage';
import * as Fakes from './unittest_includes/fakes';
import * as Helper from './unittest_includes/testhelper';
import * as Decorator from './decorator.test'

import * as vscode from 'vscode';


suite('Coverage Test Suite', () => {

	test('Coverage - calculate coverage', () => {
		
		var decorators = Decorator.SetDecorationOnTestFile();
		var redContainer = decorators[0].GetDecoratorContainer();
		var greenContainer = decorators[1].GetDecoratorContainer();

		var coverage = new Coverage.Coverage ();

		coverage.SetLinesExecuted(greenContainer.length);
		coverage.SetLinesNotExecuted(redContainer.length);
		coverage.Calculate();

		var expectedCoverage = 8/11
		var expectedCoverageInPercent = expectedCoverage * 100;
		assert.equal(coverage.GetCoverage() , expectedCoverageInPercent );
	});


});
