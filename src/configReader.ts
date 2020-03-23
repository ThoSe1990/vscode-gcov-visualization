


import * as vscode from 'vscode';

var path = require('path')
var fs = require('fs');


export class ConfigReader
{

    protected JsonContent : any;
    protected GcovExecutablePath : string = "";

    public GetGcovPath () { return this.GcovExecutablePath; }

    constructor() { }

    public ReadConfigFile()
    {
        var basepath = path.normalize( vscode.workspace.workspaceFolders![0].uri.fsPath)
        var p =  basepath +"\\.vscode\\gcov-visualization.json" ;
        var content = fs.readFileSync(p).toString();
        this.JsonContent = JSON.parse( content );   
    }

}