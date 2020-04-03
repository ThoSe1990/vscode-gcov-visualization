


import * as vscode from 'vscode';

var path = require('path')
var fs = require('fs');


export class ConfigReader
{

    protected WorkspaceFolder : vscode.WorkspaceFolder;

    constructor(_w : vscode.WorkspaceFolder) { this.WorkspaceFolder = _w;}

    protected JsonContent : any;
    
    public GetGcovPath () 
    { 
        if (this.JsonContent.gcov_path) 
            return this.JsonContent.gcov_path; 
        else throw "No Gcov Path found";
    }

    public ReadConfigFile()
    {
        var workspacePath =  this.WorkspaceFolder.uri.fsPath;
        if(!workspacePath)
            throw "Invalid WorkspaceFolder";
            
        var basepath = path.normalize(workspacePath)
        var p =  basepath +"\\.vscode\\gcov-visualization.json" ;
        var content = fs.readFileSync(p).toString();
        this.JsonContent = JSON.parse( content ); 
    
    }


}