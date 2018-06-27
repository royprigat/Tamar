#!/bin/bash

echo -e "\033[0;32mCommiting updates to GitHub...\033[0m"

# Add all changes.
git add -A

# Commit changes.
msg="committing changes `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master