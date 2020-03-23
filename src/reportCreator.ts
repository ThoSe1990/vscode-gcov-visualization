


import * as vscode from 'vscode';
import * as ConfigReader from './configReader';

var path = require('path')
var fs = require('fs');



export class ReportCreator extends ConfigReader.ConfigReader
{
    constructor()
    {
        super();
    }

    public FindGcov()
    {
        try {
            this.GcovExecutablePath = this.JsonContent.gcov_path;
        } catch (error) {
            this.GcovExecutablePath = "";
        }
    }

    public RunGcov(command : string)
    {
        this.ChangeDirectory();

        const cp = require('child_process')
		var result = cp.exec(this.GcovExecutablePath + " " + command, (err: string, stdout: string, stderr: string) => {
            console.log("executing: " + this.GcovExecutablePath + " " + command);
            return stdout;
        });

        return result;
    }

    private ChangeDirectory()
    {
        if (this.JsonContent.makefile_directory)
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