#!/bin/bash
cd ..
if [ $# -eq 0 ] ; then
	echo "No Inputs! ~/CS1XA3/Project01/README.md contains information on how to use each command."
else
	if [ ! -d Project01/merge ] ; then
		mkdir Project01/merge
	fi
	for arg in "$@"; do
		if [ $arg = "TODO" ] ; then
			grep -rh '#TODO' --exclude=todo.log > Project01/todo.log
		elif [ $arg = "mergeMessage" ] ; then
			git log --oneline | grep -i merge | cut -d' ' -f 2- > Project01/merge/mergeMessage.log
		elif [ $arg = "mergeFull" ] ; then
			git log --oneline | grep -i merge > Project01/merge/mergeFull.log
		elif [ $arg = "merge" ] ; then
			git log --oneline | grep -i merge | cut -d' ' -f1 > Project01/merge/merge.log
		elif [ $arg = "delUntracked" ] ; then
			if [ $(git ls-files *.tmp --exclude-standard --others) ] ; then
				git ls-files *.tmp --exclude-standard --others
				echo "Are you sure you want to delete these untracked files? (yes/no)"
				read decision
				if [ $decision = "yes" ] ; then
					git ls-files *.tmp --exclude-standard --others | xargs rm
					echo "Files deleted."
				elif [ $decision = "no" ] ; then
					echo "Will not delete."
				else
					echo "Invalid input!"
				fi
			else
				echo "No untracked files!"
			fi
		else
			echo "Invalid Input!"
		fi
	done
fi
