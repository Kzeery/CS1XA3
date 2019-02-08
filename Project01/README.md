# Project01

A simple script that can list todos, list merge commit messages, and delete untracked files.

## How to use

To run the script, type ./project_analyze.sh followed by arguments while in the Project01 directory. You must provide at least one argument. There are no limits to how many arguments you can enter.

```
server: ~/CS1XA3/Project01$ ./project_analyze.sh
No Inputs! ~/CS1XA3/Project01/README.md contains information on how to use each command.
```

## Arguments

### TODO 

"TODO" argument will find all files in the repo CS1XA3 as well as any subdirectories within that repo that contain a line containing "#TODO". It will copy every line that contains that phrase into a file CS1XA3/Project01/todo.log. It will always create a new file with that name and add all todos to that file.
 
```
#file1 contains '#TODO feed dog', file2 contains '#TODO walk dog', dog/file3contains '#TODO buy new dog'

server: ~/CS1XA3/Project01$ ./project_analyze.sh todos

#Project01/todo.log will contain three lines:
	# #TODO feed dog
	# #TODO walk dog
	# #TODO buy dog
```

### merge, mergeFull, mergeMessage

There are three merge commands that will track GitHub logs that contain the word "merge" (irrespective of capitalization). All three will write to their respective files in Project01/merge/merge, Project01/merge/mergeFull, Project01/merge/merge/Message. "merge" will copy only the hashes of any GitHub logs containing the word "merge" and copy it to the respective file. "mergeFull" will copy the hash and the commit message of any GitHub log containing the word "merge" and copy it to the respective file. "mergeMessage" will only copy the commit message of any GitHub log containing the word "merge" and copy it to the respective file.

```
#GitHub log: ff34b42 I want to merge with you.

server: ~/CS1XA3/Project01$ ./project_analyze.sh merge mergeFull mergeMessage

#Project01/merge/merge will contain:
	# ff34b42
	
#Project01/merge/mergeFull will contain:
	# ff34b42 I want to merge with you.

#Project01/merge/mergeMessage will contain:
	# I want to merge with you.
```

### delUntracked

"delUntacked" will delete any untracked files ending with extension ".tmp". This argument will first list all the files that will potentially be deleted and ask the user if they are sure they want to delete the files. If the user inputs "yes", files will be deleted. If there are no files to be deleted, the program will return "No untracked files!"

```
#file1.tmp, file2.tmp, Project01/file3.tmp, temp/file4.tmp

server: ~/CS1XA3/Project01$ ./project_analyze.sh delUntracked
file1.tmp
file2.tmp
Project01/file3.tmp
temp/file4.tmp
Are you sure you want to delete these untracked files? (yes/no)

yes

Files deleted.

server: ~/CS1XA3/Project01$ ./project_analyze.sh delUntracked
No untracked files!
```
