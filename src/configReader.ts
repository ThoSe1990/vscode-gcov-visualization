


import * as vscode from 'vscode';

var path = require('path')
var fs = require('fs');


export class ConfigReader
{

    private JsonContent : any;
    private GcovExecutablePath : string = "";


    constructor() { }

    public ReadConfigFile()
    {
        var basepath = path.normalize( vscode.workspace.workspaceFolders![0].uri.fsPath)
        var p =  basepath +"\\.vscode\\gcov-visualization.json" ;
        this.JsonContent = JSON.parse( fs.readFileSync(p).toString() );   
    }

    public SetGcovExecutablePath()
    {
        this.GcovExecutablePath = this.JsonContent.gcov_path;
        console.log("path: " + this.GcovExecutablePath);
    }
    public GetGcovExecutablePath(){return this.GcovExecutablePath;}

    public PrintVersion()
    {
        const cp = require('child_process')
		var result = cp.exec(this.GcovExecutablePath + " --version", (err: string, stdout: string, stderr: string) => {
                console.log('stdout: ' + stdout);
                return stdout;
        });
        return result;
    }

}