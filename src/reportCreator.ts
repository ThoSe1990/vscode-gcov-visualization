


import * as vscode from 'vscode';
import * as ConfigReader from './configReader';

var path = require('path')
var fs = require('fs');

export class ReportCreator extends ConfigReader.ConfigReader
{
    constructor(_w : vscode.WorkspaceFolder) { super(_w); }
    
    public RunGcov(command : string)
    {
        var result = "";
        try {
            this.ReadConfigFile();
            this.ChangeDirectory();
            
            var gcov = this.GetGcovPath();

            const cp = require('child_process')
            result = cp.exec(gcov + " " + command, (err: string, stdout: string, stderr: string) => {
                return stdout;
            });
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    private ChangeDirectory()
    {
        if (this.JsonContent.makefile_directory !== "" )
        {
            process.chdir(this.JsonContent.makefile_directory);    
            return;
        }

        if (this.JsonContent.gcov_output)
        {
            if (!fs.existsSync(this.JsonContent.gcov_output))
                fs.mkdirSync(this.JsonContent.gcov_output);
        process.chdir(this.JsonContent.gcov_output);
        }
    }
}