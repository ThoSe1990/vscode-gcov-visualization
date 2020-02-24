
import * as vscode from 'vscode';
import * as FileHandler from './filehandler';
import * as Decorator from './decorator';
import * as Validation from './validation';


export var Decorations = new Decorator.DecoratorHandler();
export var filehandler = new FileHandler.FileHandler();

var ValidateTextEditor = new Validation.ValidationTextEditor(undefined);
var ValidateWorkspaceFolder = new Validation.ValidationWorkspaceFolder(undefined);
var ValidateState = new Validation.ValidationFeatureIsActive(false);
var Validations = new Validation.ValidationRules();

function InitValidations()
{
	Validations.AddValidation(ValidateTextEditor);
	Validations.AddValidation(ValidateWorkspaceFolder);
	Validations.AddValidation(ValidateState);
}



export function activate(context: vscode.ExtensionContext) 
{
	InitValidations();

	let activeEditorDidChanged = vscode.window.onDidChangeActiveTextEditor((editor) => Update(editor));
	
	let ToggleGcovVisualization = vscode.commands.registerCommand('extension.toggleVisualization', () => {

		if (Decorations.GetState())
			DeactivateVisualization();
		else
			ActivateVisualization();
 	});
	
	context.subscriptions.push(ToggleGcovVisualization, activeEditorDidChanged);

}
export function deactivate() 
{
	ResetDecorations();
}

function ActivateVisualization ()
{
   Decorations.SetState(true);
   ValidateState.SetState(true);
   SetAllDecorations();
}

function SetAllDecorations()
{
	vscode.window.visibleTextEditors.forEach(Update);
}





function Update(textEditor: vscode.TextEditor | undefined) 
{
	UpdateEditorAndWorkspace(textEditor);
	
	if (Validations.Validate())
	{
		UpdateGcovFilesInWorkspace();
		
		var gcovFile = filehandler.FindGcovFile(textEditor)
		UpdateDecoration(textEditor!, gcovFile);
	}
}

function UpdateEditorAndWorkspace(textEditor: vscode.TextEditor | undefined)
{
	ValidateTextEditor.SetWorkspaceFolder(textEditor);
	ValidateWorkspaceFolder.SetWorkspaceFolder(vscode.workspace.workspaceFolders);
}

function UpdateGcovFilesInWorkspace()
{
	var workspaceFolder = ValidateWorkspaceFolder.GetWorkspaceFolder();
	if(workspaceFolder)
		filehandler.GetAllGcovFilesFromWorkspace(workspaceFolder.uri.fsPath);
}

function UpdateDecoration(textEditor: vscode.TextEditor, gcovFile : string | undefined)
{
	if (gcovFile)
	{
		Decorations.AddDecorator(textEditor!, gcovFile);
		var decorator = Decorations.GetDecorator(textEditor!);
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
   Decorations.SetState(false);
   ValidateState.SetState(false);
   ResetDecorations();
}
function ResetDecorations()
{
	vscode.window.visibleTextEditors.forEach(Reset);
}

function Reset(textEditor: vscode.TextEditor | undefined)
{
	if (textEditor)
		ResetDecoration(textEditor);
}

function ResetDecoration (textEditor: vscode.TextEditor)
{
	var decorator = Decorations.GetDecorator(textEditor!);
	
	if(decorator)
	{
		decorator.forEach(function( d ) { 
			d.Reset();
		});
	}
}