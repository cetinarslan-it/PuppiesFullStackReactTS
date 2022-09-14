#!/usr/bin/env zsh

# cd to the location of the script
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd $SCRIPTPATH

installresult=$(npm i --silent)
if [[ "$installresult" == *"high"* ]]
then
  echo "Installation verified - NOT OK"
  echo $installresult
  exit 1
fi

compileResult=$(npx --yes tsc *.ts --outDir js)
if [[ "$compileResult" != *"app.ts(1,8): error TS1259"* ]]
then
  echo "Compilation verified - NOT OK"
  echo $compileResult
  exit 1
fi

testresult=$(CI=true npm t --silent -- --watchAll=false --json)
if [[ "$testresult" != *"\"numPassedTests\":1"* ]]
then
  echo "Tests verified - NOT OK"
  echo $testresult
  exit 1
fi

# cd back to where we came from
cd - > /dev/null

echo "Installation, linting and testing verified - OK"
exit 0