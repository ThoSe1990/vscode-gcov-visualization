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

export class ValidationExample extends Validation
{
	private file : string;

	constructor (_file : string)
	{
		super();
		this.file = _file;
	}

	public Rule ()
	{
		if (this.file)
			return true;

		return false;
	} 
}