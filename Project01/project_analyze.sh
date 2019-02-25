#!/bin/bash
cd ..
dir_init () {
	mkdir Project01/logs
	mkdir Project01/logs/errors
	mkdir Project01/logs/merge
	mkdir Project01/logs/todo
	mkdir Project01/logs/modified
}

list_tmp () {
	git ls-files *.tmp --exclude-standard --others
}
# Must have at least one argument supplied
if [ $# -eq 0 ] ; then  
	echo "No Inputs! ~/CS1XA3/Project01/README.md contains information on how to use each command."
else
	# delete and remake all directories in case to initialize
	if [ ! -d Project01/logs ] ; then
		dir_init
	else
		rm -r Project01/logs
		dir_init
	fi
	# the script has can take any number of arguments and executes an operation for each argument
	for arg in "$@"; do
		if [ $arg = "TODO" ] ; then
			# Checks for '#TODO' in files and copies all messages containing that line to todo.log
			grep -rh '#TODO' --exclude=todo.log > Project01/logs/todo/todo.log 
			
		# The next 3 set of arguments check git logs for the word merge and copies the message to the corresponding .log file
		elif [ $arg = "mergeMessage" ] ; then
			# copies only the commit message to the mergeMessage.log file
			git log --oneline | grep -i merge | cut -d' ' -f 2- > Project01/logs/merge/mergeMessage.log 
		elif [ $arg = "mergeFull" ] ; then
			# copies both the message and the commit hash to the mergeFull.log file
			git log --oneline | grep -i merge > Project01/logs/merge/mergeFull.log 
		elif [ $arg = "merge" ] ; then
			# copies only the commit hash to the merge.log file
			git log --oneline | grep -i merge | cut -d' ' -f1 > Project01/logs/merge/merge.log 

		elif [ $arg = "delUntracked" ] ; then
			# checks for any untracked .tmp files. If none are found, will echo "No untracked files!"
			if [ $(list_tmp) ] ; then 
				# list the files then confirm that the user would like to delete all the listed files
				list_tmp
				echo "Are you sure you want to delete these untracked files? (yes/no)"
				read decision 
				# will only continue to delete the files if user input is "yes"
				if [ $decision = "yes" ] ; then
					list_tmp | xargs rm
					echo "Files deleted."
				# if input is not "yes", returns the user
				elif [ $decision = "no" ] ; then
					echo "Will not delete."
				else
					echo "Invalid input!"
				fi
			else
				echo "No untracked files!"
			fi
		elif [ $arg = "error" ] ; then
			# recreates an empty compile_fail.log
			> Project01/logs/errors/compile_fail.log
			# finds all files that end with .hs or .py
			find ./ -type f \( -name \*.hs -o -name \*.py \) -print0 | while IFS= read -d $'\0' file
			do
				# if it is a python file, it will try to run the file with python3. If there is an error, the filename will be outputted to compile_fail.log
				if [[ $file == *.py ]] ; then
					if python3 $file &> /dev/null ; then
						echo "no errors with $file"
					else
						echo $file >> Project01/logs/errors/compile_fail.log
					fi
				# if it is a haskell file, it will try to run the file using runhaskell. If there is an error, the filename will be outputted to compile_fail.log
				elif [[ $file == *.hs ]] ; then
					if runhaskell $file &> /dev/null ; then
						echo "no errors with $file"
					else
						echo $file >> Project01/logs/errors/compile_fail.log
					fi
				fi
			done
		# CUSTOM FEATURE. finds all non-hidden files that have been modified between a user-inputted date and now and stores the input in Project01/modified/modified_files.log
		elif [ $arg = "modified" ] ; then
			> Project01/logs/modified/modified_files.log
			today=$(date +'%Y-%m-%d')
			# the current date is converted into the amount of seconds since 1970-01-01
			now=$(date +%s)
			# the user is then asked how many days ago the lower bound of time for the modification could have taken place
			echo "How many days ago would you like to be the lower bound of modified files?"
			read days
			# given input must be a number
			re='^[0-9]+$'
			if ! [[ $days =~ $re ]] ; then
   				echo "error: Not a number"
			else
				lower_date=$(date -d "$days days ago" +'%Y-%m-%d')
				echo "Logging all files modified between $lower_date and $today..."
				# converts the lower bound into an amount of seconds since 1970-01-01
				lower_bound=$(date -d "$days days ago" +%s)
				# for each non-hidden file found, converts their last modified time into an amount of seconds since 1970-01-01
				find . -not -path '*/\.*' -type f -print0 | while IFS= read -d $'\0' file ; do
					modified_date=$(stat -c %y $file | cut -d' ' -f1)
					modified_toDate=$(date -d $modified_date +%s)
					# check if the modification time is in between the lower bound and now
					if [ $modified_toDate -ge $lower_bound ] && [ $modified_toDate -le $now ] ; then
						# if so, add the file name to the log file with the date last modified in a readable format
						echo "$file was last modified on $modified_date" >> Project01/logs/modified/modified_files.log
					fi
				done
			fi
		else
			echo "Invalid Input!"
		fi
	done
fi
