
import * as vscode from 'vscode';
import * as _fileHandler from './filehandler';
import * as _decorator from './decorator';
import * as _validation from './validation';
import * as _coverage from './coverage';

export var DecorationsHandler = new _decorator.DecoratorHandler();
export var filehandler = new _fileHandler.FileHandler();

var ValidateTextEditor = new _validation.ValidationTextEditor(undefined);
var ValidateWorkspaceFolder = new _validation.ValidationWorkspaceFolder(undefined);
var ValidateState = new _validation.ValidationFeatureIsActive(false);
var Validations = new _validation.ValidationRules();
var Coverage = new _coverage.Coverage();

function InitValidations()
{
	Validations.AddValidation(ValidateTextEditor);
	Validations.AddValidation(ValidateWorkspaceFolder);
	Validations.AddValidation(ValidateState);
}

let statusbar: vscode.StatusBarItem;


export function activate(context: vscode.ExtensionContext) 
{
	InitValidations();

	let activeEditorDidChanged = vscode.window.onDidChangeActiveTextEditor((editor) => Update(editor));
	
	let ToggleGcovVisualization = vscode.commands.registerCommand('extension.toggleVisualization', () => {

		if (DecorationsHandler.GetState())
			DeactivateVisualization();
		else
			ActivateVisualization();
 	});
	
	
	statusbar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);

	context.subscriptions.push(ToggleGcovVisualization, activeEditorDidChanged, statusbar);

}
export function deactivate() 
{
	ResetDecorations();
}

function ActivateVisualization ()
{
   DecorationsHandler.SetState(true);
   ValidateState.SetState(true);
   SetAllDecorations();
}

function SetAllDecorations()
{
	vscode.window.visibleTextEditors.forEach(Update);
}



export function UpdateStatusbar(textEditor: vscode.TextEditor | undefined)
{
	if(textEditor && statusbar)
	{
		HideStatusbar();
		CalculateAndDisplayCoverage(textEditor)
	}
}
function HideStatusbar()
{
	Coverage.HideStatusbar(statusbar);
}
function CalculateAndDisplayCoverage(textEditor: vscode.TextEditor)
{

	var decorators = DecorationsHandler.GetDecoratorsOfTextEditor(textEditor);
	if (decorators)
	{
		Coverage.SetLinesExecuted( decorators[1].GetDecoratorContainer().length );
		Coverage.SetLinesNotExecuted( decorators[0].GetDecoratorContainer().length );
		Coverage.Calculate();
		Coverage.ShowStatusbar(statusbar);	
	}
	
}




export function Update(textEditor: vscode.TextEditor | undefined) 
{
	UpdateEditorAndWorkspace(textEditor);
	
	if (Validations.Validate())
	{
		UpdateGcovFilesInWorkspace();
		
		var gcovFile = filehandler.FindGcovFile(textEditor)
		UpdateDecoration(textEditor, gcovFile);
		UpdateStatusbar(vscode.window.activeTextEditor);
	}
}

function UpdateEditorAndWorkspace(textEditor: vscode.TextEditor | undefined)
{
	ValidateTextEditor.SetTextEditor(textEditor);
	ValidateWorkspaceFolder.SetWorkspaceFolder(vscode.workspace.workspaceFolders);
}

function UpdateGcovFilesInWorkspace()
{
	var workspaceFolder = ValidateWorkspaceFolder.GetWorkspaceFolder();
	if(workspaceFolder)
		filehandler.GetAllGcovFilesFromWorkspace(workspaceFolder.uri.fsPath);
}

function UpdateDecoration(textEditor: vscode.TextEditor | undefined, gcovFile : string | undefined)
{
	if (gcovFile)
	{
		DecorationsHandler.AddDecorator(textEditor!, gcovFile);
		var decorator = DecorationsHandler.GetDecoratorsOfTextEditor(textEditor!);
		if(decorator)
		{
			decorator.forEach( function( d ) {
				d.Reset();
				d.SetDecoration();
			});
		}
	}	
	else 
		console.log("Invalid file open: " + gcovFile);
}





function DeactivateVisualization ()
{
   DecorationsHandler.SetState(false);
   ValidateState.SetState(false);
   ResetDecorations();
}
function ResetDecorations()
{
	vscode.window.visibleTextEditors.forEach(Reset);
}

export function Reset(textEditor: vscode.TextEditor | undefined)
{
	if (textEditor)
		ResetDecoration(textEditor);
}

function ResetDecoration (textEditor: vscode.TextEditor)
{
	var decorator = DecorationsHandler.GetDecoratorsOfTextEditor(textEditor!);
	
	if(decorator)
	{
		decorator.forEach(function( d ) { 
			d.Reset();
		});
	}
}




