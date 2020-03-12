


import * as vscode from 'vscode';

var path = require('path')
var fs = require('fs');


export class ConfigReader
{

    private JsonContent : any;
    private GcovExecutablePath : string = "";

    public GetGcovPath () { return this.GcovExecutablePath; }

    constructor() { }

    public ReadConfigFile()
    {
        var basepath = path.normalize( vscode.workspace.workspaceFolders![0].uri.fsPath)
        var p =  basepath +"\\.vscode\\gcov-visualization.json" ;
        this.JsonContent = JSON.parse( fs.readFileSync(p).toString() );   
    }

    public FindGcov()
    {
        try {
            this.GcovExecutablePath = this.JsonContent.gcov_path;
        } catch (error) {
            this.GcovExecutablePath = "";
        }
    }

    public CustomCommand(command : string)
    {
        const cp = require('child_process')
		var result = cp.exec(this.GcovExecutablePath + " " + command, (err: string, stdout: string, stderr: string) => {
            return stdout;
        });
        return result;
    }

}