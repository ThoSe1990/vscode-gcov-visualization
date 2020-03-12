
import * as vscode from 'vscode';

var path = require('path')
var fs = require('fs');



export class FileHandler
{
    public static GCOV_FILE_EXTENSION : string = ".gcov";

    private GcovFilePaths : string[] = [];  
    public GetGcovFiles() { return this.GcovFilePaths; }

	constructor () {}

	public GetAllGcovFilesFromWorkspace(inPath: string | undefined, fileExtension : string) 
	{ 
        if (fs.existsSync(inPath))
        {
            var files=fs.readdirSync(inPath);
            this.FindFilesRecursively(files, inPath, fileExtension); 
        }
        else
        {
            console.log("no dir " + inPath);
            return ;
        }      
      
    }
    
    public FindGcovFile(textEditor : vscode.TextEditor | undefined)
    {
        if (textEditor)
        {            
            var openFile = textEditor.document.fileName;
            var foundFiles = this.FindAllFilesWithSameName(openFile);
            return this.GetGcovFile(foundFiles, openFile);
        }
    }

    private FindAllFilesWithSameName(openFile : string)
    {
        var file = this.GetFilename(openFile);
        var foundFiles = [];
        for (var i = 0 ; i < this.GcovFilePaths.length ; i++)
        {
            if (this.GcovFilePaths[i].indexOf(file!) !== -1)
            foundFiles.push(this.GcovFilePaths[i]);
        }
        return foundFiles;
    }
    private GetGcovFile (gcovFiles : string [], openFile : string)
    {
        var openFileLowerCase = path.normalize(openFile.toLowerCase());
        
        for (var i = 0 ; i < gcovFiles.length ; i++ )
        {
            var filename = this.ExtractSrcNameFromGcovContent(gcovFiles[i]);
            var desiredFile = this.RemoveLineBreaksAndRelativePath(filename);
            var tmp = desiredFile.split(":");
            var normalizedFile = (tmp.length > 1) ? path.normalize(tmp[1]) : path.normalize(tmp);
            if (openFileLowerCase.includes(normalizedFile))
                return gcovFiles[i] ;
        }
    } 

    private GetFilename (file : string)
    {
        var temp = file.replace(/\\/g, '\/');
        return temp.split('\/').pop();
    }

    private ExtractSrcNameFromGcovContent(gcovFile : string)
    {
        var content = fs.readFileSync(gcovFile).toString();
        var firstLine = content.substring(0, content.indexOf('\n')).toLowerCase();
        var extractedFilename = firstLine.split('source:').pop();

        return extractedFilename;
    }
    private RemoveLineBreaksAndRelativePath(path : string)
    {
        var removeLinebreak = path.replace(/(\r\n|\n|\r)/gm, "");
        var onlyBackslash = removeLinebreak.replace(/\\/g, '//');
        var replaceDotsAndSlash = onlyBackslash.replace(/\.\.\//g, '');

        return replaceDotsAndSlash;
    }


    private FindFilesRecursively(files: string | any[], inPath: any,  fileExtension : string)
    {
        for( var i = 0 ; i < files.length ; i++ )
        {
            var filename = path.join(inPath,files[i]);
            this.CheckFilename(filename, fileExtension);
        };
    }

    private CheckFilename(filename: any | string[],  fileExtension : string)
    {
            if ( fs.lstatSync(filename).isDirectory() )
            {
                this.GetAllGcovFilesFromWorkspace(filename, fileExtension);
            }
            else if (filename.indexOf(fileExtension) >=0 ) 
            {
                this.AddGcovFile(filename);
            };
    }

    private AddGcovFile(file : string)
    {
        if ( this.GcovFilePaths.includes(file) )
            return ;
        this.GcovFilePaths.push(file);
    } 

}



