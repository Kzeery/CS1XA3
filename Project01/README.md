# Project01

A simple script that can log todos, log merge commit messages, delete untracked files, find errors, and check file modification dates.

## How to use

To run the script, type ./project_analyze.sh followed by arguments while in the Project01 directory. You must provide at least one argument. There are no limits to how many arguments you can enter. All the arguments are listed below

```bash 
server: ~/CS1XA3/Project01$ ./project_analyze.sh
No Inputs! Project01/README.md contains information on how to use each command.
```

## Arguments

### TODO 

`TODO` argument will find all files in the repo CS1XA3 as well as any subdirectories within that repo that contain a line containing "#TODO". It will copy every line that contains that phrase into a file CS1XA3/Project01/logs/todo/todo.log. It will always create a new file with that name and add all todos to that file.
 
```bash
#file1 contains '#TODO feed dog', file2 contains '#TODO walk dog', dog/file3contains '#TODO buy new dog'

server: ~/CS1XA3/Project01$ ./project_analyze.sh TODO

#Project01/logs/todo/todo.log will contain three lines:
	# #TODO feed dog
	# #TODO walk dog
	# #TODO buy dog
```

### merge, mergeFull, mergeMessage

There are three merge commands that will track GitHub logs that contain the word "merge" (irrespective of capitalization). All three will write to their respective files in Project01/logs/merge/merge.log, Project01/logs/merge/mergeFull.log, Project01/logs/merge/mergeMessage.log. `merge` will copy only the hashes of any GitHub logs containing the word "merge" and copy it to the respective file. `mergeFull` will copy the hash and the commit message of any GitHub log containing the word "merge" and copy it to the respective file. `mergeMessage` will only copy the commit message of any GitHub log containing the word "merge" and copy it to the respective file.

```bash
#GitHub log: ff34b42 I want to merge with you.

server: ~/CS1XA3/Project01$ ./project_analyze.sh merge mergeFull mergeMessage

#Project01/logs/merge/merge.log will contain:
	# ff34b42
	
#Project01/logs/merge/mergeFull.log will contain:
	# ff34b42 I want to merge with you.

#Project01/logs/merge/mergeMessage.log will contain:
	# I want to merge with you.
```

### delUntracked

`delUntracked` will delete any untracked files ending with extension ".tmp". This argument will first list all the files that will potentially be deleted and ask the user if they are sure they want to delete the files. If the user inputs "yes", files will be deleted. If there are no files to be deleted, the program will return "No untracked files!"

```bash
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
### error

`error` will try to compile all python and haskell files in the repo using python3 and runhaskell respectively. If the any files give an error, the filename will be logged in Project01/logs/errors/compile_fail.log.

```bash
# Project01/test.py has a syntax error
# test.hs compiles fine

server: ~/CS1XA3/Project01$ ./project_analyze.sh error
no errors with ./test.hs

# Project01/logs/errors/compile_fail.log will contain:
	./Project01/test.py
```

### modified

`modified` is a custom feature that logs all the files in the repo that were modified between a user inputted date and now. This excludes any hidden files (files that begin with "."). The filenames and respective last modification dates are saved in Project01/logs/modified/modified_files.log. 

```bash
# example.txt has been modified yesterday and example2.txt has been modified 10 days ago

server: ~/CS1XA3/Project01$ ./project_analyze.sh modified
How many days ago would you like to be the lower bound of modified files?
2
Logging all files modified between 2019-02-23 and 2019-02-25...

#Project01/logs/modified/modified_files.log will contain:
	# ./example.txt was last modified on 2019-02-24

```