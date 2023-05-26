#!/bin/bash

# Delete contents of diffs folder
rm -rf diffs/*

# Generate diff files for each commit in repo history
for commit in $(git rev-list --all)
do
    git diff $commit^..$commit > diffs/$commit.diff
done
