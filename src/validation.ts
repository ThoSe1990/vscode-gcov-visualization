import * as vscode from 'vscode';

export class AllValidation
{
	private Container : Validation[] = [];


	constructor()
	{
		var validWorkspaceFolder = new ValidWorkspaceFolder();
		this.Container.push(validWorkspaceFolder);
        var decorationStateValidation = new DecorationsDeactivated();
		this.Container.push(decorationStateValidation);
		var validEditor = new ValidEditor();
		this.Container.push(validEditor);

	}

	public ValidateAll()
	{


        var validationResult = true;
		this.Container.forEach(function(validation){
            if ( validation.Validate() === false)
            {
                validationResult = false;
                return;
            }            
        });
        return validationResult;
	}

}

class Validation
{

	
	public Validate()
	{
        return this.Rule();
    }

	//never called - always overwritten
	protected Rule(){return true;}

}

import { decorations } from './extension';

class DecorationsDeactivated extends Validation
{
	public Rule()
	{
        if (decorations.GetState() === true)
			return true;
		
		console.log("Validation failed: decoration inactive");
        return false;
	}
}


class ValidEditor extends Validation
{
	public Rule()
	{
		if (ActualEditor.GetTextEditor())
			return true;	

		console.log("Validation failed: invalid file open");
        return false;
	}
}
class internal_TextEditor 
{
	private TextEditor : vscode.TextEditor | undefined;

	public SetTextEditor (textEditor : vscode.TextEditor | undefined)
	{
		this.TextEditor = textEditor;
	}
	public GetTextEditor () { return this.TextEditor; }
}
export var ActualEditor = new internal_TextEditor();






class ValidWorkspaceFolder extends Validation
{
	public Rule()
	{
		if (ActualWorkspaceFolder.GetWorkspaceFolder())
			return true;	

		console.log("Validation failed: invalid workspace folder open");
        return false;
	}
}

class internal_WorkspaceFolder
{
	private WorkspaceFolder : vscode.WorkspaceFolder[] | undefined;

	public SetWorkspaceFolder (folder : vscode.WorkspaceFolder[] | undefined)
	{
		this.WorkspaceFolder = folder;
	}
	public GetWorkspaceFolder () { return this.WorkspaceFolder; }
}
export var ActualWorkspaceFolder = new internal_WorkspaceFolder();
