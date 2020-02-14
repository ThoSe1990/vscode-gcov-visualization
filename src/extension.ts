
import * as vscode from 'vscode';
import * as FileHandler from './filehandler'
import * as Decorator from './decorator'
import * as Validation from './validation'
import { ActualWorkspaceFolder } from './validation'
import { ActualEditor } from './validation'

export var decorations = new Decorator.DecoratorHandler();
export var filehandler = new FileHandler.FileHandler();

var validation = new Validation.AllValidation();


export function activate(context: vscode.ExtensionContext) {

	let activeEditorDidChanged = vscode.window.onDidChangeActiveTextEditor((editor) => Update(editor));
	
	let ToggleGcovVisualization = vscode.commands.registerCommand('extension.toggleVisualization', () => {

		if (decorations.GetState())
			DeactivateVisualization();
		else
			ActivateVisualization();
 	});
	
	context.subscriptions.push(ToggleGcovVisualization, activeEditorDidChanged);

	 function ActivateVisualization ()
	 {
		decorations.SetState(true);
		SetAllDecorations();
	 }

	 function DeactivateVisualization ()
	 {
		decorations.SetState(false);
		ResetDecorations();
	 }

}

function SetAllDecorations()
{
	vscode.window.visibleTextEditors.forEach(Update);
}



export function deactivate() 
{
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
	var decorator = decorations.GetDecorator(textEditor!);
	
	if(decorator)
	{
		decorator.forEach(function( d ) { 
			d.Reset();
		});
	}
}

function Update(textEditor: vscode.TextEditor | undefined) 
{

	UpdateEditorAndWorkspace(textEditor);
	
	if (validation.ValidateAll())
	{
		UpdateGcovFilesInWorkspace();
		
		var gcovFile = filehandler.FindGcovFile(textEditor)
		UpdateDecoration(textEditor!, gcovFile);
	}
}



function UpdateEditorAndWorkspace(textEditor: vscode.TextEditor | undefined)
{
	ActualEditor.SetTextEditor(textEditor);
	ActualWorkspaceFolder.SetWorkspaceFolder(vscode.workspace.workspaceFolders);
}

function UpdateGcovFilesInWorkspace()
{
	var workscpaceFolder = ActualWorkspaceFolder.GetWorkspaceFolder();
	filehandler.GetAllGcovFilesFromWorkspace(workscpaceFolder![0].uri.fsPath);
}

function UpdateDecoration(textEditor: vscode.TextEditor, gcovFile : string | undefined)
{
	if (gcovFile)
	{
		decorations.AddDecorator(textEditor!, gcovFile);
		var decorator = decorations.GetDecorator(textEditor!);
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