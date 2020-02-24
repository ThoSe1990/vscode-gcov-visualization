import * as vscode from 'vscode';



export class ValidationRules 
{
	private ValidationRules : Validation[] = []; 
	public AddValidation (validation : Validation )
	{
		this.ValidationRules.push(validation);
	}

	public Validate () 
	{
		var result;
		for (var i = 0 ; i < this.ValidationRules.length ; i++)
			result = this.ValidationRules[i].Validate();
		return result;
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

export class ValidationWorkspaceFolder extends Validation
{
	private WorkspaceFolder : vscode.WorkspaceFolder | undefined;

	constructor (workpsacefolder : vscode.WorkspaceFolder[] | undefined)
	{
		super();
		this.SetWorkspaceFolder(workpsacefolder);
	}

	public Rule ()
	{
		if (this.WorkspaceFolder !== undefined)
			return true;

		return false;
	} 

	public SetWorkspaceFolder(workpsacefolder : vscode.WorkspaceFolder[] | undefined) 
	{
		if (workpsacefolder)
			this.WorkspaceFolder = workpsacefolder[0];
		else 
			this.WorkspaceFolder = undefined;
	}

	public GetWorkspaceFolder() { return this.WorkspaceFolder; }
}


export class ValidationTextEditor extends Validation
{
	private TextEditor : vscode.TextEditor | undefined;

	constructor (editor : vscode.TextEditor | undefined)
	{
		super();
		this.SetTextEditor(editor);
	}

	public Rule ()
	{
		if (this.TextEditor !== undefined)
			return true;

		return false;
	} 

	public SetTextEditor(editor : vscode.TextEditor | undefined)
	{
		this.TextEditor = editor;
	}
}

export class ValidationFeatureIsActive extends Validation
{
	private Active : boolean = false;

	constructor (active : boolean)
	{
		super();
		this.SetState(active);
	}

	public Rule ()
	{
		if (this.Active)
			return true;

		return false;
	} 

	public SetState(active : boolean)
	{
		this.Active = active;
	}
}